export const getChainAddressKey = (chainId: number, address: string): string =>
  `${chainId}.${address}`;
