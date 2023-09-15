
import { BigNumber, utils } from 'ethers';

export const formatERC20TokenBalance = (balance: BigNumber, decimals: number) => { 
    // format balance with decimals
    return utils.formatUnits(balance, decimals)
};