import { providers } from "ethers";

export const isAddressContainCode = async (
  provider: providers.Web3Provider,
  address: string
): Promise<boolean> => {
  const code = await provider.getCode(address);
  switch (code) {
    case "0x00":
      return false;
    case "0x":
      return false;
    default:
      return true;
  }
};
