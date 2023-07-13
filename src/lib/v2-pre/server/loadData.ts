import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import {
  BattlesuitCatalogItem,
  ErBattlesuit,
  ErBattlesuitCatalogItem,
  ErSignet,
  RootStigma,
  StigmataCatalogItem,
  StigmataSet,
  StigmataSetCatalogItem,
  WeaponCatalogItem
} from '../data/types'

export const dataDir = path.join(process.cwd(), 'data/v2-pre')

export const battlesuitsDir = path.join(dataDir, 'battlesuits')
export const battlesuitCatalogPath = path.join(dataDir, 'battlesuit-catalog.yaml')

export const weaponsDir = path.join(dataDir, 'weapons')
export const weaopnCatalogPath = path.join(dataDir, 'weapon-catalog.yaml')

export const stigmataDir = path.join(dataDir, 'stigmata')
export const stigmataCatalogPath = path.join(dataDir, 'stigmata-catalog.yaml')

export const stigmataSetsDir = path.join(dataDir, 'stigmata-sets')
export const stigmataSetCatalogPath = path.join(dataDir, 'stigmata-set-catalog.yaml')

export const erBattlesuitCatalogPath = path.join(dataDir, 'er-battlesuits-catalog.yaml')
export const erBattlesuitsDir = path.join(dataDir, 'er-battlesuits')
export const erSignetsDir = path.join(dataDir, 'er-signets')
export const erSignetGroupsPath = path.join(dataDir, 'er-signet-groups.yaml')

export function loadBattlesuitCatalog(): BattlesuitCatalogItem[] {
  return readYamlFile(battlesuitCatalogPath)
}

export function loadBattlesuitData(id: string) {
  const battlesuitDataPath = path.join(battlesuitsDir, `${id}.yaml`)
  return readYamlFile(battlesuitDataPath)
}

export function loadWeaponCatalog(): WeaponCatalogItem[] {
  return readYamlFile(weaopnCatalogPath)
}

export function loadWeaponData(id: string) {
  const weaponDataPath = path.join(weaponsDir, `${id}.yaml`)
  return readYamlFile(weaponDataPath)
}

export function loadStigmataCatalog(): StigmataCatalogItem[] {
  return readYamlFile(stigmataCatalogPath)
}

export function loadStigmaData(id: string): RootStigma {
  const stigmaDataPath = path.join(stigmataDir, `${id}.yaml`)
  return readYamlFile(stigmaDataPath)
}

export function loadStigmataSetCatalog(): StigmataSetCatalogItem[] {
  return readYamlFile(stigmataSetCatalogPath)
}

export function loadStigmataSetData(id: string): StigmataSet {
  const stigmataSetPath = path.join(stigmataSetsDir, `${id}.yaml`)
  return readYamlFile(stigmataSetPath)
}

export function loadErBattlesuitCatalog(): ErBattlesuitCatalogItem[] {
  return readYamlFile(erBattlesuitCatalogPath)
}

export function loadErBattlesuit(id: string): ErBattlesuit {
  const erBattlesuitPath = path.join(erBattlesuitsDir, `${id}.yaml`)
  return readYamlFile(erBattlesuitPath)
}

export function loadErSignets(id: string): ErSignet[] {
  const erSignetsPath = path.join(erSignetsDir, `${id}.yaml`)
  return readYamlFile(erSignetsPath)
}

function readYamlFile(pathname: string) {
  return YAML.parse(fs.readFileSync(pathname).toString())
}
