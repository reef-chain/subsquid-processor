// import { encodeExtrinsic, ExtrinsicSignature } from '@subsquid/substrate-metadata'
import { Event, toHex } from '@subsquid/substrate-processor'
import { Extrinsic } from "@subsquid/substrate-runtime";
import { ctx, Fields } from '../processor'

/**
 * Encode "archived" extrinsic back to hex from SubstrateBatchProcessor mapping handler
 */
// const encodeSubstrateExtrinsic = (ex: SubstrateExtrinsic): string => {
const encodeSubstrateExtrinsic = (event: Event<Fields>): string => {
    // let {scaleCodec, jsonCodec} = (ctx._chain as any)

    // let signature: ExtrinsicSignature | undefined
    // if (ex.signature) {
    //     signature = jsonCodec.decode(ctx._chain.description.signature, ex.signature)
    // }

    // let [pallet, callName] = ex.call.name.split('.')

    // let call = jsonCodec.decode(ctx._chain.description.call, {
    //     __kind: pallet,
    //     value: {
    //         ...ex.call.args,
    //         __kind: callName
    //     }
    // })

    // let bytes = encodeExtrinsic(
    //     {
    //         version: ex.version,
    //         signature,
    //         call
    //     },
    //     ctx._chain.description,
    //     scaleCodec
    // )

    const extrinsic: Extrinsic = {
        version: event.extrinsic!.version,
        signature: event.extrinsic!.signature,
        call: event.extrinsic!.call!.args
    }
    // TODO check this

    const bytes = event.block._runtime.encodeExtrinsic(extrinsic);

    return toHex(bytes)
}


/**
 * Check out https://github.com/paritytech/substrate-api-sidecar/blob/a0f7d7800fe639eef95906bbd5c0315b277a48f1/src/services/blocks/BlocksService.ts#L265
 * for how to use functions below to correctly calculate actual extrinsic fee.
 *
 * Note, that when TransactionPayment.TransactionFeePaid event is available,
 * fee info will be already filled on SubstrateExtrinsic.
 */
export const getFeeDetails = async (event: Event<Fields>, parentBlockHash: string): Promise<any> => {
    return ctx._chain.rpc.call('payment_queryFeeDetails', [
        encodeSubstrateExtrinsic(event),
        parentBlockHash
    ])
}


export const getPaymentInfo = async (event: Event<Fields>, parentBlockHash: string): Promise<any> => {
    return ctx._chain.rpc.call('payment_queryInfo', [
        encodeSubstrateExtrinsic(event),
        parentBlockHash
    ])
}