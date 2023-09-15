import type { ERC20 } from "@rsksmart/rif-relay-contracts";

export const fetchERC20TokenBalance = async (
  erc20TokenContract: ERC20,
  address: string
) => {
  const balance = await erc20TokenContract.balanceOf(address);
  return balance;
};
