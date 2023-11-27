// https://github.com/subsquid/squid-sdk/blob/master/substrate/substrate-runtime/src/metadata/interfaces.ts

interface ModuleMetadataV9 {
  name: string
  storage: (StorageMetadataV9 | undefined)
  calls: (FunctionMetadataV9[] | undefined)
  events: (EventMetadataV9[] | undefined)
  constants: ModuleConstantMetadataV9[]
  errors: ErrorMetadataV9[]
}

interface ModuleMetadataV10 {
  name: string
  storage: (StorageMetadataV10 | undefined)
  calls: (FunctionMetadataV9[] | undefined)
  events: (EventMetadataV9[] | undefined)
  constants: ModuleConstantMetadataV9[]
  errors: ErrorMetadataV9[]
}

interface ModuleMetadataV11 {
  name: string
  storage: (StorageMetadataV11 | undefined)
  calls: (FunctionMetadataV9[] | undefined)
  events: (EventMetadataV9[] | undefined)
  constants: ModuleConstantMetadataV9[]
  errors: ErrorMetadataV9[]
}

interface ExtrinsicMetadataV11 {
  version: number
  signedExtensions: string[]
}

interface ModuleMetadataV12 {
  name: string
  storage: (StorageMetadataV11 | undefined)
  calls: (FunctionMetadataV9[] | undefined)
  events: (EventMetadataV9[] | undefined)
  constants: ModuleConstantMetadataV9[]
  errors: ErrorMetadataV9[]
  index: number
}

interface ModuleMetadataV13 {
  name: string
  storage: (StorageMetadataV13 | undefined)
  calls: (FunctionMetadataV9[] | undefined)
  events: (EventMetadataV9[] | undefined)
  constants: ModuleConstantMetadataV9[]
  errors: ErrorMetadataV9[]
  index: number
}

interface StorageMetadataV9 {
  prefix: string
  items: StorageEntryMetadataV9[]
}

interface FunctionMetadataV9 {
  name: string
  args: FunctionArgumentMetadataV9[]
  docs: string[]
}

interface EventMetadataV9 {
  name: string
  args: string[]
  docs: string[]
}

interface ModuleConstantMetadataV9 {
  name: string
  type: string
  value: Uint8Array
  docs: string[]
}

interface ErrorMetadataV9 {
  name: string
  docs: string[]
}

interface StorageMetadataV10 {
  prefix: string
  items: StorageEntryMetadataV10[]
}

interface StorageMetadataV11 {
  prefix: string
  items: StorageEntryMetadataV11[]
}

interface StorageMetadataV13 {
  prefix: string
  items: StorageEntryMetadataV13[]
}

interface StorageEntryMetadataV9 {
  name: string
  modifier: StorageEntryModifierV9
  type: StorageEntryTypeV9
  fallback: Uint8Array
  docs: string[]
}

interface FunctionArgumentMetadataV9 {
  name: string
  type: string
}

interface StorageEntryMetadataV10 {
  name: string
  modifier: StorageEntryModifierV9
  type: StorageEntryTypeV10
  fallback: Uint8Array
  docs: string[]
}

interface StorageEntryMetadataV11 {
  name: string
  modifier: StorageEntryModifierV9
  type: StorageEntryTypeV11
  fallback: Uint8Array
  docs: string[]
}

interface StorageEntryMetadataV13 {
  name: string
  modifier: StorageEntryModifierV9
  type: StorageEntryTypeV13
  fallback: Uint8Array
  docs: string[]
}

type StorageEntryModifierV9 = StorageEntryModifierV9_Optional | StorageEntryModifierV9_Default | StorageEntryModifierV9_Required

interface StorageEntryModifierV9_Optional {
  __kind: 'Optional'
}

interface StorageEntryModifierV9_Default {
  __kind: 'Default'
}

interface StorageEntryModifierV9_Required {
  __kind: 'Required'
}

type StorageEntryTypeV9 = StorageEntryTypeV9_Plain | StorageEntryTypeV9_Map | StorageEntryTypeV9_DoubleMap

interface StorageEntryTypeV9_Plain {
  __kind: 'Plain'
  value: string
}

interface StorageEntryTypeV9_Map {
  __kind: 'Map'
  hasher: StorageHasherV9
  key: string
  value: string
  linked: boolean
}

interface StorageEntryTypeV9_DoubleMap {
  __kind: 'DoubleMap'
  hasher: StorageHasherV9
  key1: string
  key2: string
  value: string
  key2Hasher: StorageHasherV9
}

type StorageEntryTypeV10 = StorageEntryTypeV10_Plain | StorageEntryTypeV10_Map | StorageEntryTypeV10_DoubleMap

interface StorageEntryTypeV10_Plain {
  __kind: 'Plain'
  value: string
}

interface StorageEntryTypeV10_Map {
  __kind: 'Map'
  hasher: StorageHasherV10
  key: string
  value: string
  linked: boolean
}

interface StorageEntryTypeV10_DoubleMap {
  __kind: 'DoubleMap'
  hasher: StorageHasherV10
  key1: string
  key2: string
  value: string
  key2Hasher: StorageHasherV10
}

type StorageEntryTypeV11 = StorageEntryTypeV11_Plain | StorageEntryTypeV11_Map | StorageEntryTypeV11_DoubleMap

interface StorageEntryTypeV11_Plain {
  __kind: 'Plain'
  value: string
}

interface StorageEntryTypeV11_Map {
  __kind: 'Map'
  hasher: StorageHasherV11
  key: string
  value: string
  linked: boolean
}

interface StorageEntryTypeV11_DoubleMap {
  __kind: 'DoubleMap'
  hasher: StorageHasherV11
  key1: string
  key2: string
  value: string
  key2Hasher: StorageHasherV11
}

type StorageEntryTypeV13 = StorageEntryTypeV13_Plain | StorageEntryTypeV13_Map | StorageEntryTypeV13_DoubleMap | StorageEntryTypeV13_NMap

interface StorageEntryTypeV13_Plain {
  __kind: 'Plain'
  value: string
}

interface StorageEntryTypeV13_Map {
  __kind: 'Map'
  hasher: StorageHasherV11
  key: string
  value: string
  linked: boolean
}

interface StorageEntryTypeV13_DoubleMap {
  __kind: 'DoubleMap'
  hasher: StorageHasherV11
  key1: string
  key2: string
  value: string
  key2Hasher: StorageHasherV11
}

interface StorageEntryTypeV13_NMap {
  __kind: 'NMap'
  keyVec: string[]
  hashers: StorageHasherV11[]
  value: string
}

type StorageHasherV9 = StorageHasherV9_Blake2_128 | StorageHasherV9_Blake2_256 | StorageHasherV9_Twox128 | StorageHasherV9_Twox256 | StorageHasherV9_Twox64Concat

interface StorageHasherV9_Blake2_128 {
  __kind: 'Blake2_128'
}

interface StorageHasherV9_Blake2_256 {
  __kind: 'Blake2_256'
}

interface StorageHasherV9_Twox128 {
  __kind: 'Twox128'
}

interface StorageHasherV9_Twox256 {
  __kind: 'Twox256'
}

interface StorageHasherV9_Twox64Concat {
  __kind: 'Twox64Concat'
}

type StorageHasherV10 = StorageHasherV10_Blake2_128 | StorageHasherV10_Blake2_256 | StorageHasherV10_Blake2_128Concat | StorageHasherV10_Twox128 | StorageHasherV10_Twox256 | StorageHasherV10_Twox64Concat

interface StorageHasherV10_Blake2_128 {
  __kind: 'Blake2_128'
}

interface StorageHasherV10_Blake2_256 {
  __kind: 'Blake2_256'
}

interface StorageHasherV10_Blake2_128Concat {
  __kind: 'Blake2_128Concat'
}

interface StorageHasherV10_Twox128 {
  __kind: 'Twox128'
}

interface StorageHasherV10_Twox256 {
  __kind: 'Twox256'
}

interface StorageHasherV10_Twox64Concat {
  __kind: 'Twox64Concat'
}

type StorageHasherV11 = StorageHasherV11_Blake2_128 | StorageHasherV11_Blake2_256 | StorageHasherV11_Blake2_128Concat | StorageHasherV11_Twox128 | StorageHasherV11_Twox256 | StorageHasherV11_Twox64Concat | StorageHasherV11_Identity

interface StorageHasherV11_Blake2_128 {
  __kind: 'Blake2_128'
}

interface StorageHasherV11_Blake2_256 {
  __kind: 'Blake2_256'
}

interface StorageHasherV11_Blake2_128Concat {
  __kind: 'Blake2_128Concat'
}

interface StorageHasherV11_Twox128 {
  __kind: 'Twox128'
}

interface StorageHasherV11_Twox256 {
  __kind: 'Twox256'
}

interface StorageHasherV11_Twox64Concat {
  __kind: 'Twox64Concat'
}

interface StorageHasherV11_Identity {
  __kind: 'Identity'
}

export type MetadataModule = ModuleMetadataV9 | ModuleMetadataV10 | ModuleMetadataV11 | ModuleMetadataV12 | ModuleMetadataV13;