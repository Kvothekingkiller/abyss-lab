import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading, Image } from 'theme-ui'
import AvatarFigureImage from '../../../../components/v2-pre/AvatarFigureImage'
import { loadBattlesuitData, loadErBattlesuit, loadErBattlesuitCatalog } from '../../../../lib/v2-pre/server/loadData'
import { Battlesuit, ErBattlesuit, ErSignet } from '../../../../lib/v2-pre/data/types'
import { Fragment, useMemo } from 'react'
import { assetsBucketBaseUrl } from '../../../../lib/consts'

interface BattlesuitShowPageProps {
  battlesuit: Battlesuit
  erBattlesuit: ErBattlesuit
}

const BattlesuitShowPage = ({ battlesuit, erBattlesuit }: BattlesuitShowPageProps) => {
  const signetSets = useMemo(() => {
    const signetSetMap = erBattlesuit.signets
      .slice()
      .sort((a, b) => {
        return a.id.localeCompare(b.id)
      })
      .reduce<Map<string, ErSignet[]>>((map, signet) => {
        const result = signet.id.match(/([12])([0-9]+)([1-5])-[0-9]/)
        if (result != null) {
          const [, _lv, _battlesuit, signetOrder] = result
          let set = map.get(signetOrder)
          if (set == null) {
            set = []
            map.set(signetOrder, set)
          }
          set.push(signet)
        }
        return map
      }, new Map())

    return [...signetSetMap.values()]
  }, [erBattlesuit.signets])

  return (
    <Box>
      <Heading as="h1">{battlesuit.fullName}</Heading>

      <AvatarFigureImage battlesuitId={battlesuit.id} sx={{ height: 400 }} />

      <Heading as="h2">ER Adjustments</Heading>

      <Card mb={3}>
        {erBattlesuit.abilities.map(ability => {
          return (
            <Fragment key={ability.id}>
              <Box sx={{ p: 1, borderBottom: 'default' }}>
                <Heading as="h3" m={0}>
                  {ability.name}
                </Heading>
              </Box>
              <Box sx={{ p: 1, borderBottom: 'default', '&:last-child': { borderBottom: 'none' } }}>{ability.desc}</Box>
            </Fragment>
          )
        })}
      </Card>

      <Heading as="h2">Exclusive Signets</Heading>

      {signetSets.map((set, index) => {
        return (
          <Card key={index} mb={2}>
            {set.map(signet => {
              return (
                <Fragment key={signet.id}>
                  <Flex sx={{ p: 1, borderBottom: 'default', alignItems: 'center' }}>
                    <Image
                      src={`${assetsBucketBaseUrl}/raw/supportbufficon/Elysia.png`}
                      width={30}
                      sx={{ flexShrink: 0 }}
                      alt={'Elysia'}
                    />
                    <Heading as="h3" m={0}>
                      {signet.name}
                    </Heading>
                  </Flex>
                  <Box sx={{ p: 1, borderBottom: 'default', '&:last-child': { borderBottom: 'none' } }}>
                    {signet.desc}
                  </Box>
                </Fragment>
              )
            })}
          </Card>
        )
      })}
    </Box>
  )
}

export default BattlesuitShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { battlesuitId: string } }) {
  const battlesuit = loadBattlesuitData(params.battlesuitId)
  const erBattlesuit = loadErBattlesuit(params.battlesuitId)

  return {
    props: { battlesuit, erBattlesuit }
  }
}

export async function getStaticPaths() {
  const battlesuitCatalog = loadErBattlesuitCatalog()

  return {
    paths: battlesuitCatalog.map(catalogItem => {
      return {
        params: { battlesuitId: catalogItem.battlesuit }
      }
    }),
    fallback: false
  }
}
