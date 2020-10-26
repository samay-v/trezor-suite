import { MODAL } from '@suite-actions/constants';
import { COINMARKET_BUY, COINMARKET_EXCHANGE } from '@wallet-actions/constants';
import { Account } from '@wallet-types';
import coinmarketReducer from '@wallet-reducers/coinmarketReducer';

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
    balance: '0',
    availableBalance: '0',
    formattedBalance: '0',
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
    availableBalance: '0',
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
        mocks: {},
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
        mocks: {},
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
        mocks: {},
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
        mocks: {},
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
        mocks: {},
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
        mocks: {},
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
