
import Onboard from '@sovryn/onboard-core';
import injectedModule from '@sovryn/onboard-injected';

const injected = injectedModule();

const chains = [
  {
    id: '0x1f',
    rpcUrl: 'https://public-node.testnet.rsk.co',
    label: 'RSK Testnet',
    token: 'tRBTC',
    blockExplorerUrl: 'https://explorer.testnet.rsk.co',
  },
];

export const onboard = Onboard({
  wallets: [injected],
  chains,
});