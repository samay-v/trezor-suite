import { MODAL } from '@suite-actions/constants';
import { COINMARKET_BUY, COINMARKET_EXCHANGE } from '@wallet-actions/constants';
import { Account } from '@wallet-types';
import coinmarketReducer from '@wallet-reducers/coinmarketReducer';
import { NETWORKS } from '@suite/config/wallet';
import { ComposeTransactionData } from '@suite/types/wallet/transaction';

const { getSuiteDevice } = global.JestMocks;

const UNAVAILABLE_DEVICE = getSuiteDevice({ available: false });
const AVAILABLE_DEVICE = getSuiteDevice({ available: true, connected: true });

export const DEFAULT_STORE = {
    wallet: {
        coinmarket: coinmarketReducer(undefined, { type: 'foo' } as any),
    },
    suite: {
        device: undefined,
    },
};

export const BTC_ACCOUNT: Account = {
    networkType: 'bitcoin',
    symbol: 'btc',
    descriptor: 'btc-descriptor',
    deviceState: 'C5B245DD2B69C7291:1',
    index: 0,
    path: "m/84'/0'/0'",
    key: 'descriptor-btc-C5B245DD2B69C7291:1',
    accountType: 'normal',
    empty: true,
    visible: true,
    balance: '12340000',
    availableBalance: '12340000',
    formattedBalance: '0.12340000',
    tokens: [],
    addresses: {
        change: [],
        used: [],
        unused: [
            {
                address: 'bc1q5y487p64hfsjc5gdfeezv29zwcddz5kahve0kp',
                path: "m/84'/0'/0'/0/0",
                transfers: 0,
            },
        ],
    },
    utxo: [],
    history: {
        total: 0,
    },
    metadata: {
        key: 'C5B245DD2B69C7291',
        fileName: '',
        aesKey: '',
        outputLabels: {},
        addressLabels: {},
    },
    page: undefined,
    misc: undefined,
    marker: undefined,
};

export const ETH_ACCOUNT: Account = {
    symbol: 'eth',
    networkType: 'ethereum',
    descriptor: '0xdB09b793984B862C430b64B9ed53AcF867cC041F',
    deviceState: 'deviceState',
    key: '0xdB09b793984B862C430b64B9ed53AcF867cC041F-eth-deviceState',
    accountType: 'normal',
    index: 0,
    path: "m/44'/60'/0'/0/0",
    empty: true,
    visible: true,
    balance: '408873828678601000',
    availableBalance: '408873828678601000',
    formattedBalance: '0.408873828678601',
    tokens: [],
    addresses: {
        change: [],
        used: [],
        unused: [],
    },
    utxo: [],
    history: {
        total: 0,
    },
    metadata: {
        key: 'C5B245DD2B69C7291',
        fileName: '',
        aesKey: '',
        outputLabels: {},
        addressLabels: {},
    },
    page: undefined,
    misc: { nonce: '1' },
    marker: undefined,
};

export const XRP_ACCOUNT: Account = {
    symbol: 'xrp',
    networkType: 'ripple',
    descriptor: 'rAPERVgXZavGgiGv6xBgtiZurirW2yAmY',
    deviceState: 'deviceState',
    key: 'rAPERVgXZavGgiGv6xBgtiZurirW2yAmY-xrp-deviceState',
    availableBalance: '100000000000',
    accountType: 'normal',
    index: 0,
    path: "m/44'/60'/0'/0/0",
    empty: true,
    visible: true,
    balance: '0',
    formattedBalance: '0',
    tokens: [],
    addresses: {
        change: [],
        used: [],
        unused: [],
    },
    utxo: [],
    history: {
        total: 0,
    },
    metadata: {
        key: 'C5B245DD2B69C7291',
        fileName: '',
        aesKey: '',
        outputLabels: {},
        addressLabels: {},
    },
    page: undefined,
    misc: {
        sequence: 3,
        reserve: '20000000',
    },
    marker: undefined,
};

export const VERIFY_ADDRESS_FIXTURES = [
    {
        description: 'verifyAddress, bitcoin account',
        initialState: {
            suite: {
                device: AVAILABLE_DEVICE,
            },
        },
        params: {
            account: BTC_ACCOUNT,
            inExchange: false,
        },
        result: {
            value: BTC_ACCOUNT.addresses?.unused[0].address,
            actions: [
                {
                    type: MODAL.OPEN_USER_CONTEXT,
                    payload: {
                        type: 'address',
                        device: AVAILABLE_DEVICE,
                        address: BTC_ACCOUNT.addresses?.unused[0].address,
                        networkType: BTC_ACCOUNT.networkType,
                        symbol: BTC_ACCOUNT.symbol,
                        addressPath: BTC_ACCOUNT.addresses?.unused[0].path,
                    },
                },
                {
                    type: COINMARKET_BUY.VERIFY_ADDRESS,
                    addressVerified: BTC_ACCOUNT.addresses?.unused[0].address,
                },
            ],
        },
    },
    {
        description: 'verifyAddress, bitcoin account',
        initialState: {
            suite: {
                device: AVAILABLE_DEVICE,
            },
        },
        params: {
            account: BTC_ACCOUNT,
            inExchange: false,
        },
        result: {
            value: BTC_ACCOUNT.addresses?.unused[0].address,
            actions: [
                {
                    type: MODAL.OPEN_USER_CONTEXT,
                    payload: {
                        type: 'address',
                        device: AVAILABLE_DEVICE,
                        address: BTC_ACCOUNT.addresses?.unused[0].address,
                        networkType: BTC_ACCOUNT.networkType,
                        symbol: BTC_ACCOUNT.symbol,
                        addressPath: BTC_ACCOUNT.addresses?.unused[0].path,
                    },
                },
                {
                    type: COINMARKET_BUY.VERIFY_ADDRESS,
                    addressVerified: BTC_ACCOUNT.addresses?.unused[0].address,
                },
            ],
        },
    },
    {
        description: 'verifyAddress, bitcoin account, in exchange',
        initialState: {
            suite: {
                device: AVAILABLE_DEVICE,
            },
        },
        params: {
            account: BTC_ACCOUNT,
            inExchange: true,
        },
        result: {
            value: BTC_ACCOUNT.addresses?.unused[0].address,
            actions: [
                {
                    type: MODAL.OPEN_USER_CONTEXT,
                    payload: {
                        type: 'address',
                        device: AVAILABLE_DEVICE,
                        address: BTC_ACCOUNT.addresses?.unused[0].address,
                        networkType: BTC_ACCOUNT.networkType,
                        symbol: BTC_ACCOUNT.symbol,
                        addressPath: BTC_ACCOUNT.addresses?.unused[0].path,
                    },
                },
                {
                    type: COINMARKET_EXCHANGE.VERIFY_ADDRESS,
                    addressVerified: BTC_ACCOUNT.addresses?.unused[0].address,
                },
            ],
        },
    },
    {
        description: 'verifyAddress, ethereum account',
        initialState: {
            suite: {
                device: AVAILABLE_DEVICE,
            },
        },
        params: {
            account: ETH_ACCOUNT,
            inExchange: false,
        },
        result: {
            value: ETH_ACCOUNT.descriptor,
            actions: [
                {
                    type: MODAL.OPEN_USER_CONTEXT,
                    payload: {
                        type: 'address',
                        device: AVAILABLE_DEVICE,
                        address: ETH_ACCOUNT.descriptor,
                        networkType: ETH_ACCOUNT.networkType,
                        symbol: ETH_ACCOUNT.symbol,
                        addressPath: ETH_ACCOUNT.path,
                    },
                },
                {
                    type: COINMARKET_BUY.VERIFY_ADDRESS,
                    addressVerified: ETH_ACCOUNT.descriptor,
                },
            ],
        },
    },
    {
        description: 'verifyAddress, ripple account',
        initialState: {
            suite: {
                device: AVAILABLE_DEVICE,
            },
        },
        params: {
            account: XRP_ACCOUNT,
            inExchange: false,
        },
        result: {
            value: XRP_ACCOUNT.descriptor,
            actions: [
                {
                    type: MODAL.OPEN_USER_CONTEXT,
                    payload: {
                        type: 'address',
                        device: AVAILABLE_DEVICE,
                        address: XRP_ACCOUNT.descriptor,
                        networkType: XRP_ACCOUNT.networkType,
                        symbol: XRP_ACCOUNT.symbol,
                        addressPath: XRP_ACCOUNT.path,
                    },
                },
                {
                    type: COINMARKET_BUY.VERIFY_ADDRESS,
                    addressVerified: XRP_ACCOUNT.descriptor,
                },
            ],
        },
    },
    {
        description: 'verifyAddress, ripple account, unavailable device',
        initialState: {
            suite: {
                device: UNAVAILABLE_DEVICE,
            },
        },
        params: {
            account: XRP_ACCOUNT,
            inExchange: false,
        },
        result: {
            value: undefined,
            actions: [
                {
                    type: MODAL.OPEN_USER_CONTEXT,
                    payload: {
                        type: 'unverified-address',
                        device: UNAVAILABLE_DEVICE,
                        address: XRP_ACCOUNT.descriptor,
                        networkType: XRP_ACCOUNT.networkType,
                        symbol: XRP_ACCOUNT.symbol,
                        addressPath: XRP_ACCOUNT.path,
                    },
                },
            ],
        },
    },
];

export const COMPOSE_TRANSACTION_FIXTURES = [
    {
        description: 'composeTransaction, bitcoin account, normal',
        initialState: {
            suite: {
                device: AVAILABLE_DEVICE,
            },
        },
        params: {
            data: <ComposeTransactionData>{
                account: BTC_ACCOUNT,
                amount: '0.1234',
                feeInfo: {
                    blockHeight: 50000,
                    blockTime: 3,
                    minFee: 1,
                    maxFee: 40000,
                    levels: [{ label: 'normal', feePerUnit: '1', blocks: 0 }],
                },
                feePerUnit: '1',
                feeLimit: '0',
                network: NETWORKS.find(n => n.symbol === 'btc' && n.accountType === 'normal'),
                selectedFee: 'normal',
                isMaxActive: false,
                isInvity: true,
            },
        },
        connect: [
            {
                response: {
                    success: true,
                    payload: [{ type: 'nonfinal', totalSpent: '10000000', feePerByte: '1' }],
                },
            },
        ],
        result: {
            value: { normal: { type: 'nonfinal', totalSpent: '10000000', feePerByte: '1' } },
            actions: [],
        },
    },
    {
        description: 'composeTransaction, bitcoin account, lastKnownFee',
        initialState: {
            suite: {
                device: AVAILABLE_DEVICE,
            },
        },
        params: {
            data: <ComposeTransactionData>{
                account: BTC_ACCOUNT,
                amount: '0.1234',
                feeInfo: {
                    blockHeight: 50000,
                    blockTime: 3,
                    minFee: 1,
                    maxFee: 40000,
                    levels: [{ label: 'normal', feePerUnit: '2', blocks: 0 }],
                },
                feePerUnit: '1',
                feeLimit: '0',
                network: NETWORKS.find(n => n.symbol === 'btc' && n.accountType === 'normal'),
                minFee: '1',
                selectedFee: 'normal',
                isMaxActive: false,
                isInvity: true,
            },
        },
        connect: [
            {
                response: {
                    success: true,
                    payload: [],
                },
            },
            {
                response: {
                    success: true,
                    payload: [{ type: 'nonfinal', totalSpent: '10000000', feePerByte: '2' }],
                },
            },
        ],
        result: {
            value: { custom: { type: 'nonfinal', totalSpent: '10000000', feePerByte: '2' } },
            actions: [],
        },
    },
    {
        description: 'composeTransaction, bitcoin account, failure',
        initialState: {
            suite: {
                device: AVAILABLE_DEVICE,
            },
        },
        params: {
            data: <ComposeTransactionData>{
                account: BTC_ACCOUNT,
                amount: '0.1234',
                feeInfo: {
                    blockHeight: 50000,
                    blockTime: 3,
                    minFee: 1,
                    maxFee: 40000,
                    levels: [
                        { label: 'normal', feePerUnit: '1', blocks: 0 },
                        { label: 'custom', feePerUnit: '1', blocks: 0 },
                    ],
                },
                feePerUnit: '2',
                feeLimit: '0',
                network: NETWORKS.find(n => n.symbol === 'btc' && n.accountType === 'normal'),
                selectedFee: 'custom',
                isMaxActive: false,
                isInvity: true,
            },
        },
        connect: [
            {
                response: {
                    success: false,
                    payload: { error: 'error' },
                },
            },
        ],
        result: {
            value: undefined,
            actions: [
                {
                    payload: {
                        context: 'toast',
                        device: AVAILABLE_DEVICE,
                        error: 'error',
                        seen: true,
                        type: 'sign-tx-error',
                    },
                    type: '@notification/toast',
                },
            ],
        },
    },
    {
        description: 'composeTransaction, ethereum account, normal',
        initialState: {
            suite: {
                device: AVAILABLE_DEVICE,
            },
        },
        params: {
            data: <ComposeTransactionData>{
                account: ETH_ACCOUNT,
                amount: '0.1234',
                feeInfo: {
                    blockHeight: 50000,
                    blockTime: 3,
                    minFee: 1,
                    maxFee: 40000,
                    levels: [
                        {
                            label: 'normal',
                            feePerUnit: '2',
                            blocks: 0,
                        },
                    ],
                },
                feePerUnit: '1',
                feeLimit: '0',
                network: NETWORKS.find(n => n.symbol === 'eth'),
                minFee: '1',
                selectedFee: 'normal',
                ethereumDataHex: '0x1212',
                isMaxActive: false,
                isInvity: true,
            },
        },
        connect: [
            {
                response: {
                    success: true,
                    payload: { levels: [{ feeLimit: '1234' }] },
                },
            },
            {
                response: {
                    success: true,
                    payload: [{ type: 'nonfinal', totalSpent: '10000000', feePerByte: '2' }],
                },
            },
        ],
        result: {
            value: {
                normal: {
                    type: 'nonfinal',
                    totalSpent: '123402468000000000',
                    feePerByte: '2',
                    bytes: 0,
                    fee: '2468000000000',
                    feeLimit: '1234',
                },
            },
            actions: [],
        },
    },
];
