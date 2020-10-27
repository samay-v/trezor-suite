import { createContext, useContext } from 'react';
import { Props, ContextValues } from '@wallet-types/coinmarketBuyDetail';
import { useWatchBuyTrade } from '@wallet-hooks/useCoinmarket';
import { useSelector } from '@suite-hooks';
import { TradeBuy } from '@wallet-reducers/coinmarketReducer';
import invityAPI from '@suite-services/invityAPI';

export const useCoinmarketBuyDetail = (props: Props) => {
    const { selectedAccount, trades, transactionId } = props;
    const buyTrade = trades.find(
        trade =>
            trade.tradeType === 'buy' &&
            (trade.key === transactionId || trade.data?.originalPaymentId === transactionId),
    );
    const { account } = selectedAccount;
    const invityAPIUrl = useSelector(state => state.suite.settings.debug.invityAPIUrl);
    if (invityAPIUrl) {
        invityAPI.setInvityAPIServer(invityAPIUrl);
    }
    const buyInfo = useSelector(state => state.wallet.coinmarket.buy.buyInfo);
    useWatchBuyTrade(account, buyTrade as TradeBuy);

    return {
        account,
        trade: buyTrade as TradeBuy,
        transactionId,
        buyInfo,
    };
};

export const CoinmarketBuyDetailContext = createContext<ContextValues | null>(null);
CoinmarketBuyDetailContext.displayName = 'CoinmarketBuyDetailContext';

export const useCoinmarketBuyDetailContext = () => {
    const context = useContext(CoinmarketBuyDetailContext);
    if (context === null) throw Error('CoinmarketBuyDetailContext used without Context');
    return context;
};
