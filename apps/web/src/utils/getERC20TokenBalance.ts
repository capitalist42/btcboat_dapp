import type { ERC20 } from '@rsksmart/rif-relay-contracts';

export const getERC20TokenBalance = async (
    token: ERC20,
    address: string
) => {
    token.balanceOf(address)
}