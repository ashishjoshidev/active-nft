import '@/styles/globals.css';
import { darkTheme } from '@rainbow-me/rainbowkit';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {  bscTestnet } from 'wagmi/chains';
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import merge from 'lodash.merge';
import { FormProvider } from '@/context/formContext';
import { DataProvider } from '@/context/DataContext';

  const opBNBTestnet = {
    id: 5611,
    name: 'opBNBTestnet',
    network: 'opBNBTestnet',
    nativeCurrency: {
      decimals: 18,
      name: 'opBNBTestnet',
      symbol: 'tBNB',
    },
    rpcUrls: {
      public: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
      default: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
    },
    blockExplorers: {
      default: { name: 'BSCScan', url: 'http://opbnbscan.com/' },
      etherscan: { name: 'BSCScan', url: 'http://opbnbscan.com/' },
    },
    testnet: true,
  };
  const GreenfieldTestnet = {
    id: 5600,
    name: 'Greenfield Mekong Testnet',
    network: 'Greenfield Mekong Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Greenfield Mekong Testnet',
      symbol: 'tBNB',
    },
    rpcUrls: {
      public: { http: ['https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org'] },
      default: { http: ['https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org'] },
    },
    blockExplorers: {
      default: { name: 'Greenfieldscan', url: 'https://greenfieldscan.com' },
      etherscan: { name: 'Greenfieldscan', url: 'https://greenfieldscan.com' },
    },
    testnet: true,
  };

const { provider, chains } = configureChains(
  [bscTestnet,opBNBTestnet,GreenfieldTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;

const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: 'xPromptNFT' }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider,
});

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#A020F0',
  },
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme} coolMode>
        <FormProvider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </FormProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
