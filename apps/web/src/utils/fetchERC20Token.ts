import { ERC20__factory } from "@rsksmart/rif-relay-contracts";

export const fetchERC20Token = async (provider: any, address: string) => {
  const contract = ERC20__factory.connect(address, provider);
  const [symbol, name, decimals] = await Promise.all([
    contract.symbol(),
    contract.name(),
    contract.decimals(),
  ]);
  return {
    contract,
    symbol,
    name,
    decimals,
  };
};
