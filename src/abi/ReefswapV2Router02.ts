import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './ReefswapV2Router02.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const functions = {
    WETH: new Func<[], {}, string>(
        abi, '0xad5c4648'
    ),
    addLiquidity: new Func<[tokenA: string, tokenB: string, amountADesired: ethers.BigNumber, amountBDesired: ethers.BigNumber, amountAMin: ethers.BigNumber, amountBMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber], {tokenA: string, tokenB: string, amountADesired: ethers.BigNumber, amountBDesired: ethers.BigNumber, amountAMin: ethers.BigNumber, amountBMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber}, ([amountA: ethers.BigNumber, amountB: ethers.BigNumber, liquidity: ethers.BigNumber] & {amountA: ethers.BigNumber, amountB: ethers.BigNumber, liquidity: ethers.BigNumber})>(
        abi, '0xe8e33700'
    ),
    addLiquidityETH: new Func<[token: string, amountTokenDesired: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber], {token: string, amountTokenDesired: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber}, ([amountToken: ethers.BigNumber, amountETH: ethers.BigNumber, liquidity: ethers.BigNumber] & {amountToken: ethers.BigNumber, amountETH: ethers.BigNumber, liquidity: ethers.BigNumber})>(
        abi, '0xf305d719'
    ),
    factory: new Func<[], {}, string>(
        abi, '0xc45a0155'
    ),
    getAmountIn: new Func<[amountOut: ethers.BigNumber, reserveIn: ethers.BigNumber, reserveOut: ethers.BigNumber], {amountOut: ethers.BigNumber, reserveIn: ethers.BigNumber, reserveOut: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x85f8c259'
    ),
    getAmountOut: new Func<[amountIn: ethers.BigNumber, reserveIn: ethers.BigNumber, reserveOut: ethers.BigNumber], {amountIn: ethers.BigNumber, reserveIn: ethers.BigNumber, reserveOut: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x054d50d4'
    ),
    getAmountsIn: new Func<[amountOut: ethers.BigNumber, path: Array<string>], {amountOut: ethers.BigNumber, path: Array<string>}, Array<ethers.BigNumber>>(
        abi, '0x1f00ca74'
    ),
    getAmountsOut: new Func<[amountIn: ethers.BigNumber, path: Array<string>], {amountIn: ethers.BigNumber, path: Array<string>}, Array<ethers.BigNumber>>(
        abi, '0xd06ca61f'
    ),
    quote: new Func<[amountA: ethers.BigNumber, reserveA: ethers.BigNumber, reserveB: ethers.BigNumber], {amountA: ethers.BigNumber, reserveA: ethers.BigNumber, reserveB: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0xad615dec'
    ),
    removeLiquidity: new Func<[tokenA: string, tokenB: string, liquidity: ethers.BigNumber, amountAMin: ethers.BigNumber, amountBMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber], {tokenA: string, tokenB: string, liquidity: ethers.BigNumber, amountAMin: ethers.BigNumber, amountBMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber}, ([amountA: ethers.BigNumber, amountB: ethers.BigNumber] & {amountA: ethers.BigNumber, amountB: ethers.BigNumber})>(
        abi, '0xbaa2abde'
    ),
    removeLiquidityETH: new Func<[token: string, liquidity: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber], {token: string, liquidity: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber}, ([amountToken: ethers.BigNumber, amountETH: ethers.BigNumber] & {amountToken: ethers.BigNumber, amountETH: ethers.BigNumber})>(
        abi, '0x02751cec'
    ),
    removeLiquidityETHSupportingFeeOnTransferTokens: new Func<[token: string, liquidity: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber], {token: string, liquidity: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0xaf2979eb'
    ),
    removeLiquidityETHWithPermit: new Func<[token: string, liquidity: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber, approveMax: boolean, v: number, r: string, s: string], {token: string, liquidity: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber, approveMax: boolean, v: number, r: string, s: string}, ([amountToken: ethers.BigNumber, amountETH: ethers.BigNumber] & {amountToken: ethers.BigNumber, amountETH: ethers.BigNumber})>(
        abi, '0xded9382a'
    ),
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens: new Func<[token: string, liquidity: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber, approveMax: boolean, v: number, r: string, s: string], {token: string, liquidity: ethers.BigNumber, amountTokenMin: ethers.BigNumber, amountETHMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber, approveMax: boolean, v: number, r: string, s: string}, ethers.BigNumber>(
        abi, '0x5b0d5984'
    ),
    removeLiquidityWithPermit: new Func<[tokenA: string, tokenB: string, liquidity: ethers.BigNumber, amountAMin: ethers.BigNumber, amountBMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber, approveMax: boolean, v: number, r: string, s: string], {tokenA: string, tokenB: string, liquidity: ethers.BigNumber, amountAMin: ethers.BigNumber, amountBMin: ethers.BigNumber, to: string, deadline: ethers.BigNumber, approveMax: boolean, v: number, r: string, s: string}, ([amountA: ethers.BigNumber, amountB: ethers.BigNumber] & {amountA: ethers.BigNumber, amountB: ethers.BigNumber})>(
        abi, '0x2195995c'
    ),
    swapETHForExactTokens: new Func<[amountOut: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber], {amountOut: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber}, Array<ethers.BigNumber>>(
        abi, '0xfb3bdb41'
    ),
    swapExactETHForTokens: new Func<[amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber], {amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber}, Array<ethers.BigNumber>>(
        abi, '0x7ff36ab5'
    ),
    swapExactETHForTokensSupportingFeeOnTransferTokens: new Func<[amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber], {amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber}, []>(
        abi, '0xb6f9de95'
    ),
    swapExactTokensForETH: new Func<[amountIn: ethers.BigNumber, amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber], {amountIn: ethers.BigNumber, amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber}, Array<ethers.BigNumber>>(
        abi, '0x18cbafe5'
    ),
    swapExactTokensForETHSupportingFeeOnTransferTokens: new Func<[amountIn: ethers.BigNumber, amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber], {amountIn: ethers.BigNumber, amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber}, []>(
        abi, '0x791ac947'
    ),
    swapExactTokensForTokens: new Func<[amountIn: ethers.BigNumber, amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber], {amountIn: ethers.BigNumber, amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber}, Array<ethers.BigNumber>>(
        abi, '0x38ed1739'
    ),
    swapExactTokensForTokensSupportingFeeOnTransferTokens: new Func<[amountIn: ethers.BigNumber, amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber], {amountIn: ethers.BigNumber, amountOutMin: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber}, []>(
        abi, '0x5c11d795'
    ),
    swapTokensForExactETH: new Func<[amountOut: ethers.BigNumber, amountInMax: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber], {amountOut: ethers.BigNumber, amountInMax: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber}, Array<ethers.BigNumber>>(
        abi, '0x4a25d94a'
    ),
    swapTokensForExactTokens: new Func<[amountOut: ethers.BigNumber, amountInMax: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber], {amountOut: ethers.BigNumber, amountInMax: ethers.BigNumber, path: Array<string>, to: string, deadline: ethers.BigNumber}, Array<ethers.BigNumber>>(
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

    getAmountIn(amountOut: ethers.BigNumber, reserveIn: ethers.BigNumber, reserveOut: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getAmountIn, [amountOut, reserveIn, reserveOut])
    }

    getAmountOut(amountIn: ethers.BigNumber, reserveIn: ethers.BigNumber, reserveOut: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getAmountOut, [amountIn, reserveIn, reserveOut])
    }

    getAmountsIn(amountOut: ethers.BigNumber, path: Array<string>): Promise<Array<ethers.BigNumber>> {
        return this.eth_call(functions.getAmountsIn, [amountOut, path])
    }

    getAmountsOut(amountIn: ethers.BigNumber, path: Array<string>): Promise<Array<ethers.BigNumber>> {
        return this.eth_call(functions.getAmountsOut, [amountIn, path])
    }

    quote(amountA: ethers.BigNumber, reserveA: ethers.BigNumber, reserveB: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.quote, [amountA, reserveA, reserveB])
    }
}
