// https://github.com/subsquid/squid-sdk/blob/master/substrate/substrate-runtime/src/metadata/interfaces.ts

export interface FunctionMetadataV9 {
  name: string
  args: FunctionArgumentMetadataV9[]
  docs: string[]
}

interface ErrorMetadataV9 {
  name: string
  docs: string[]
}

interface FunctionArgumentMetadataV9 {
  name: string
  type: string
}

export interface DataString {
  __kind: string,
  value: string
}

export interface MetadataModule {
  name: string,
  calls: (FunctionMetadataV9[] | undefined),
  errors: ErrorMetadataV9[]
}

export interface Metadata {
  modules: MetadataModule[]
}