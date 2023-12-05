export const ABI_JSON = [
    {
        "type": "constructor",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_factory"
            },
            {
                "type": "address",
                "name": "_WETH"
            }
        ]
    },
    {
        "type": "function",
        "name": "WETH",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "addLiquidity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "uint256",
                "name": "amountADesired"
            },
            {
                "type": "uint256",
                "name": "amountBDesired"
            },
            {
                "type": "uint256",
                "name": "amountAMin"
            },
            {
                "type": "uint256",
                "name": "amountBMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA"
            },
            {
                "type": "uint256",
                "name": "amountB"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            }
        ]
    },
    {
        "type": "function",
        "name": "addLiquidityETH",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "amountTokenDesired"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken"
            },
            {
                "type": "uint256",
                "name": "amountETH"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            }
        ]
    },
    {
        "type": "function",
        "name": "factory",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "getAmountIn",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut"
            },
            {
                "type": "uint256",
                "name": "reserveIn"
            },
            {
                "type": "uint256",
                "name": "reserveOut"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            }
        ]
    },
    {
        "type": "function",
        "name": "getAmountOut",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "reserveIn"
            },
            {
                "type": "uint256",
                "name": "reserveOut"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountOut"
            }
        ]
    },
    {
        "type": "function",
        "name": "getAmountsIn",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut"
            },
            {
                "type": "address[]",
                "name": "path"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "getAmountsOut",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "address[]",
                "name": "path"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "quote",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountA"
            },
            {
                "type": "uint256",
                "name": "reserveA"
            },
            {
                "type": "uint256",
                "name": "reserveB"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountB"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountAMin"
            },
            {
                "type": "uint256",
                "name": "amountBMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA"
            },
            {
                "type": "uint256",
                "name": "amountB"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityETH",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken"
            },
            {
                "type": "uint256",
                "name": "amountETH"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountETH"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityETHWithPermit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "bool",
                "name": "approveMax"
            },
            {
                "type": "uint8",
                "name": "v"
            },
            {
                "type": "bytes32",
                "name": "r"
            },
            {
                "type": "bytes32",
                "name": "s"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken"
            },
            {
                "type": "uint256",
                "name": "amountETH"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "bool",
                "name": "approveMax"
            },
            {
                "type": "uint8",
                "name": "v"
            },
            {
                "type": "bytes32",
                "name": "r"
            },
            {
                "type": "bytes32",
                "name": "s"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountETH"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityWithPermit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountAMin"
            },
            {
                "type": "uint256",
                "name": "amountBMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "bool",
                "name": "approveMax"
            },
            {
                "type": "uint8",
                "name": "v"
            },
            {
                "type": "bytes32",
                "name": "r"
            },
            {
                "type": "bytes32",
                "name": "s"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA"
            },
            {
                "type": "uint256",
                "name": "amountB"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapETHForExactTokens",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut"
            },
            {
                "type": "address[]",
                "name": "path"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapExactETHForTokens",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "address[]",
                "name": "path"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "address[]",
                "name": "path"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "swapExactTokensForETH",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "address[]",
                "name": "path"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "address[]",
                "name": "path"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "swapExactTokensForTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "address[]",
                "name": "path"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "address[]",
                "name": "path"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "swapTokensForExactETH",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut"
            },
            {
                "type": "uint256",
                "name": "amountInMax"
            },
            {
                "type": "address[]",
                "name": "path"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapTokensForExactTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut"
            },
            {
                "type": "uint256",
                "name": "amountInMax"
            },
            {
                "type": "address[]",
                "name": "path"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    }
]
