import { Event, toHex } from '@subsquid/substrate-processor'
import { Extrinsic } from "@subsquid/substrate-runtime";
import { ctx, Fields } from '../processor'

/**
 * Encode "archived" extrinsic back to hex from SubstrateBatchProcessor mapping handler
 */
const encodeSubstrateExtrinsic = (event: Event<Fields>): string => {
    const { jsonCodec, description } = event.block._runtime;

    let signature: any;
    if (event.extrinsic!.signature) {
        signature = jsonCodec.decode(description.signature, event.extrinsic!.signature!)
    }

    const extrinsicCall = event.extrinsic!.call!;
    const [pallet, callName] = extrinsicCall.name.split('.')
    const call = jsonCodec.decode(description.call, {
        __kind: pallet,
        value: {
            ...extrinsicCall.args,
            __kind: callName
        }
    })
    
    const extrinsic: Extrinsic = {
        version: event.extrinsic!.version,
        signature: signature,
        call: call
    }
    
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