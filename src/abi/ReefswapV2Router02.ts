import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './ReefswapV2Router02.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const functions = {
    WETH: new Func<[], {}, string>(
        abi, '0xad5c4648'
    ),
    addLiquidity: new Func<[tokenA: string, tokenB: string, amountADesired: bigint, amountBDesired: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint], {tokenA: string, tokenB: string, amountADesired: bigint, amountBDesired: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint}, ([amountA: bigint, amountB: bigint, liquidity: bigint] & {amountA: bigint, amountB: bigint, liquidity: bigint})>(
        abi, '0xe8e33700'
    ),
    addLiquidityETH: new Func<[token: string, amountTokenDesired: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint], {token: string, amountTokenDesired: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint}, ([amountToken: bigint, amountETH: bigint, liquidity: bigint] & {amountToken: bigint, amountETH: bigint, liquidity: bigint})>(
        abi, '0xf305d719'
    ),
    factory: new Func<[], {}, string>(
        abi, '0xc45a0155'
    ),
    getAmountIn: new Func<[amountOut: bigint, reserveIn: bigint, reserveOut: bigint], {amountOut: bigint, reserveIn: bigint, reserveOut: bigint}, bigint>(
        abi, '0x85f8c259'
    ),
    getAmountOut: new Func<[amountIn: bigint, reserveIn: bigint, reserveOut: bigint], {amountIn: bigint, reserveIn: bigint, reserveOut: bigint}, bigint>(
        abi, '0x054d50d4'
    ),
    getAmountsIn: new Func<[amountOut: bigint, path: Array<string>], {amountOut: bigint, path: Array<string>}, Array<bigint>>(
        abi, '0x1f00ca74'
    ),
    getAmountsOut: new Func<[amountIn: bigint, path: Array<string>], {amountIn: bigint, path: Array<string>}, Array<bigint>>(
        abi, '0xd06ca61f'
    ),
    quote: new Func<[amountA: bigint, reserveA: bigint, reserveB: bigint], {amountA: bigint, reserveA: bigint, reserveB: bigint}, bigint>(
        abi, '0xad615dec'
    ),
    removeLiquidity: new Func<[tokenA: string, tokenB: string, liquidity: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint], {tokenA: string, tokenB: string, liquidity: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint}, ([amountA: bigint, amountB: bigint] & {amountA: bigint, amountB: bigint})>(
        abi, '0xbaa2abde'
    ),
    removeLiquidityETH: new Func<[token: string, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint], {token: string, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint}, ([amountToken: bigint, amountETH: bigint] & {amountToken: bigint, amountETH: bigint})>(
        abi, '0x02751cec'
    ),
    removeLiquidityETHSupportingFeeOnTransferTokens: new Func<[token: string, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint], {token: string, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint}, bigint>(
        abi, '0xaf2979eb'
    ),
    removeLiquidityETHWithPermit: new Func<[token: string, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string], {token: string, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string}, ([amountToken: bigint, amountETH: bigint] & {amountToken: bigint, amountETH: bigint})>(
        abi, '0xded9382a'
    ),
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens: new Func<[token: string, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string], {token: string, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string}, bigint>(
        abi, '0x5b0d5984'
    ),
    removeLiquidityWithPermit: new Func<[tokenA: string, tokenB: string, liquidity: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string], {tokenA: string, tokenB: string, liquidity: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string}, ([amountA: bigint, amountB: bigint] & {amountA: bigint, amountB: bigint})>(
        abi, '0x2195995c'
    ),
    swapETHForExactTokens: new Func<[amountOut: bigint, path: Array<string>, to: string, deadline: bigint], {amountOut: bigint, path: Array<string>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0xfb3bdb41'
    ),
    swapExactETHForTokens: new Func<[amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint], {amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0x7ff36ab5'
    ),
    swapExactETHForTokensSupportingFeeOnTransferTokens: new Func<[amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint], {amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint}, []>(
        abi, '0xb6f9de95'
    ),
    swapExactTokensForETH: new Func<[amountIn: bigint, amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint], {amountIn: bigint, amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0x18cbafe5'
    ),
    swapExactTokensForETHSupportingFeeOnTransferTokens: new Func<[amountIn: bigint, amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint], {amountIn: bigint, amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint}, []>(
        abi, '0x791ac947'
    ),
    swapExactTokensForTokens: new Func<[amountIn: bigint, amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint], {amountIn: bigint, amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0x38ed1739'
    ),
    swapExactTokensForTokensSupportingFeeOnTransferTokens: new Func<[amountIn: bigint, amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint], {amountIn: bigint, amountOutMin: bigint, path: Array<string>, to: string, deadline: bigint}, []>(
        abi, '0x5c11d795'
    ),
    swapTokensForExactETH: new Func<[amountOut: bigint, amountInMax: bigint, path: Array<string>, to: string, deadline: bigint], {amountOut: bigint, amountInMax: bigint, path: Array<string>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0x4a25d94a'
    ),
    swapTokensForExactTokens: new Func<[amountOut: bigint, amountInMax: bigint, path: Array<string>, to: string, deadline: bigint], {amountOut: bigint, amountInMax: bigint, path: Array<string>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0x8803dbee'
    ),
}

export class Contract extends ContractBase {

    WETH(): Promise<string> {
        return this.eth_call(functions.WETH, [])
    }

    factory(): Promise<string> {
        return this.eth_call(functions.factory, [])
    }

    getAmountIn(amountOut: bigint, reserveIn: bigint, reserveOut: bigint): Promise<bigint> {
        return this.eth_call(functions.getAmountIn, [amountOut, reserveIn, reserveOut])
    }

    getAmountOut(amountIn: bigint, reserveIn: bigint, reserveOut: bigint): Promise<bigint> {
        return this.eth_call(functions.getAmountOut, [amountIn, reserveIn, reserveOut])
    }

    getAmountsIn(amountOut: bigint, path: Array<string>): Promise<Array<bigint>> {
        return this.eth_call(functions.getAmountsIn, [amountOut, path])
    }

    getAmountsOut(amountIn: bigint, path: Array<string>): Promise<Array<bigint>> {
        return this.eth_call(functions.getAmountsOut, [amountIn, path])
    }

    quote(amountA: bigint, reserveA: bigint, reserveB: bigint): Promise<bigint> {
        return this.eth_call(functions.quote, [amountA, reserveA, reserveB])
    }
}
