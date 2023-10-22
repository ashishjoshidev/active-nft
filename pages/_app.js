import '@/styles/globals.css';
import { darkTheme } from '@rainbow-me/rainbowkit';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { goerli, bscTestnet } from 'wagmi/chains';
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
  const ScrollSepoliaTestnet = {
    id: 534351,
    name: 'Scroll Sepolia Testnet',
    network: 'Scroll Sepolia Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Scroll Sepolia Testnet',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://scroll-sepolia.blockpi.network/v1/rpc/public'] },
      default: { http: ['https://scroll-sepolia.blockpi.network/v1/rpc/public'] },
    },
    blockExplorers: {
      default: { name: 'Greenfieldscan', url: 'https://sepolia.scrollscan.dev' },
      etherscan: { name: 'Greenfieldscan', url: 'https://sepolia.scrollscan.dev' },
    },
    testnet: true,
};


const { provider, chains } = configureChains(
  [goerli,ScrollSepoliaTestnet],
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
      coinbaseWallet({ chains, appName: 'Active Nft' }),
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
