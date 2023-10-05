import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import "./styles/fonts/spacepower/SpacePowerDemoRegular.ttf";
import "./styles/fonts/FontsFree-Net-Poppins-Regular.ttf";
import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { configureChains } from "wagmi";
import { goerli, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const modeConfig = {
  id: 1029,
  name: "BTT",
  network: "BitTorrent Chain Donau",
  nativeCurrency: {
    decimals: 18,
    name: "BitTorrent Chain Donau",
    symbol: "BTT",
  },
  rpcUrls: {
    public: { http: ["https://pre-rpc.bt.io/"] },
    default: { http: ["https://pre-rpc.bt.io/"] },
  },
};

const { chains, alchemyApiKey } = configureChains(
  [modeConfig],
  [
    alchemyProvider({ apiKey: "Rwja692xoss6YsaqbUDRNVwpjZrO4ltM" }),
    publicProvider(),
  ]
);

const config = createConfig(
  getDefaultConfig({
    appName: "Your App Name",
    alchemyId: alchemyApiKey, // Use the correct variable for the Alchemy API key
    walletConnectProjectId: "0c1af47867ddda44a884a72a581f8fc1",
    chains,
  })
);

const root = document.getElementById("root");
render(
  <WagmiConfig config={config}>
    <ConnectKitProvider theme="midnight">
      <App />
    </ConnectKitProvider>
  </WagmiConfig>,
  root
);
