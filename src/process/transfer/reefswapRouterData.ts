import { Event } from "@subsquid/substrate-processor";
import { ReefswapAction } from "../../model";
import { REEF_CONTRACT_ADDRESS } from "../../util/util";
import { Fields, REEFSWAP_ROUTER_ADDRESS } from "../../processor";
import { functions as funcsReefswapV2Router, abi as ifaceReefswapV2Router } from "../../abi/ReefswapV2Router02";

export const extractReefswapRouterData = (event: Event<Fields>, tokenAddress: string): ReefswapAction | null => {
    if (event.extrinsic!.call!.args.target.toLowerCase() !== REEFSWAP_ROUTER_ADDRESS?.toLowerCase()) return null;

    const sighash = event.extrinsic!.call!.args.input.substr(0, 10);
    let decoded;

    switch (sighash) {
        case funcsReefswapV2Router.addLiquidity.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.addLiquidity.sighash, event.extrinsic!.call!.args.input);
            return decoded.tokenA === tokenAddress || decoded.tokenB === tokenAddress ? ReefswapAction.AddLiquidity : null;
        case funcsReefswapV2Router.addLiquidityETH.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.addLiquidityETH.sighash, event.extrinsic!.call!.args.input);
            return decoded.token === tokenAddress || REEF_CONTRACT_ADDRESS === tokenAddress ? ReefswapAction.AddLiquidity : null;

        case funcsReefswapV2Router.removeLiquidity.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.removeLiquidity.sighash, event.extrinsic!.call!.args.input);
            return decoded.tokenA === tokenAddress || decoded.tokenB === tokenAddress ? ReefswapAction.RemoveLiquidity : null;
        case funcsReefswapV2Router.removeLiquidityETH.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.removeLiquidityETH.sighash, event.extrinsic!.call!.args.input);
            return decoded.token === tokenAddress || REEF_CONTRACT_ADDRESS === tokenAddress ? ReefswapAction.RemoveLiquidity : null;
        case funcsReefswapV2Router.removeLiquidityETHSupportingFeeOnTransferTokens.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.removeLiquidityETHSupportingFeeOnTransferTokens.sighash, event.extrinsic!.call!.args.input);
            return decoded.token === tokenAddress || REEF_CONTRACT_ADDRESS === tokenAddress ? ReefswapAction.RemoveLiquidity : null;
        case funcsReefswapV2Router.removeLiquidityETHWithPermit.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.removeLiquidityETHWithPermit.sighash, event.extrinsic!.call!.args.input);
            return decoded.token === tokenAddress || REEF_CONTRACT_ADDRESS === tokenAddress ? ReefswapAction.RemoveLiquidity : null;
        case funcsReefswapV2Router.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens.sighash, event.extrinsic!.call!.args.input);
            return decoded.token === tokenAddress || REEF_CONTRACT_ADDRESS === tokenAddress ? ReefswapAction.RemoveLiquidity : null;
        case funcsReefswapV2Router.removeLiquidityWithPermit.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.removeLiquidityWithPermit.sighash, event.extrinsic!.call!.args.input);
            return decoded.tokenA === tokenAddress || decoded.tokenB === tokenAddress ? ReefswapAction.RemoveLiquidity : null;

        case funcsReefswapV2Router.swapETHForExactTokens.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.swapETHForExactTokens.sighash, event.extrinsic!.call!.args.input);
            return decoded.path[0] === tokenAddress || decoded.path[decoded.path.length - 1] === tokenAddress ? ReefswapAction.Swap : null;
        case funcsReefswapV2Router.swapExactETHForTokens.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.swapExactETHForTokens.sighash, event.extrinsic!.call!.args.input);
            return decoded.path[0] === tokenAddress || decoded.path[decoded.path.length - 1] === tokenAddress ? ReefswapAction.Swap : null;
        case funcsReefswapV2Router.swapExactETHForTokensSupportingFeeOnTransferTokens.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.swapExactETHForTokensSupportingFeeOnTransferTokens.sighash, event.extrinsic!.call!.args.input);
            return decoded.path[0] === tokenAddress || decoded.path[decoded.path.length - 1] === tokenAddress ? ReefswapAction.Swap : null;
        case funcsReefswapV2Router.swapExactTokensForETH.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.swapExactTokensForETH.sighash, event.extrinsic!.call!.args.input);
            return decoded.path[0] === tokenAddress || decoded.path[decoded.path.length - 1] === tokenAddress ? ReefswapAction.Swap : null;
        case funcsReefswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens.sighash, event.extrinsic!.call!.args.input);
            return decoded.path[0] === tokenAddress || decoded.path[decoded.path.length - 1] === tokenAddress ? ReefswapAction.Swap : null;
        case funcsReefswapV2Router.swapExactTokensForTokens.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.swapExactTokensForTokens.sighash, event.extrinsic!.call!.args.input);
            return decoded.path[0] === tokenAddress || decoded.path[decoded.path.length - 1] === tokenAddress ? ReefswapAction.Swap : null;
        case funcsReefswapV2Router.swapExactTokensForTokensSupportingFeeOnTransferTokens.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.swapExactTokensForTokensSupportingFeeOnTransferTokens.sighash, event.extrinsic!.call!.args.input);
            return decoded.path[0] === tokenAddress || decoded.path[decoded.path.length - 1] === tokenAddress ? ReefswapAction.Swap : null;
        case funcsReefswapV2Router.swapTokensForExactETH.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.swapTokensForExactETH.sighash, event.extrinsic!.call!.args.input);
            return decoded.path[0] === tokenAddress || decoded.path[decoded.path.length - 1] === tokenAddress ? ReefswapAction.Swap : null;
        case funcsReefswapV2Router.swapTokensForExactTokens.sighash:
            decoded = ifaceReefswapV2Router.decodeFunctionData(funcsReefswapV2Router.swapTokensForExactTokens.sighash, event.extrinsic!.call!.args.input);
            return decoded.path[0] === tokenAddress || decoded.path[decoded.path.length - 1] === tokenAddress ? ReefswapAction.Swap : null;

        default:
            return null;
    }
}