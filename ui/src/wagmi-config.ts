import { http, createConfig } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

import {
    type Chain
} from 'viem'

export const ubitTestnet
    = {
        id: 44433,
        name: 'Ubit Testnet',
        nativeCurrency: {
            name: 'USC',
            symbol: 'USC',
            decimals: 18
        },
        rpcUrls: {
            default: {
                http: ['https://testnet-rpc.ubitscan.io']
            },
        },
        blockExplorers: {
            default: {
                name: 'UbitScan',
                url: 'https://testnet.ubitscan.io'
            },
        },
    } as const satisfies Chain

export const ubitMainnet
    = {
        id: 90002,
        name: 'Ubit Mainnet',
        nativeCurrency: {
            name: 'USC',
            symbol: 'USC',
            decimals: 18
        },
        rpcUrls: {
            default: {
                http: ['https://rpc.ubitscan.io']
            },
        },
        blockExplorers: {
            default: {
                name: 'UbitScan',
                url: 'https://ubitscan.io'
            },
        },
    } as const satisfies Chain
export const config = createConfig({
    chains: [ubitMainnet],
    connectors: [
        metaMask()]
    ,
    transports: {
        [ubitMainnet.id]: http(),
    },
});