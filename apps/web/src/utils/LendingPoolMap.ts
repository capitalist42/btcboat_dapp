import { SupportedTokens, TokenDetailsData, getTokenDetails } from "@sovryn/contracts";

export class LendingPool {
    private _assetDetails;
    constructor(
      private _name: string,
      private _asset: SupportedTokens,
      private _borrowCollateral: SupportedTokens[] = [],
      public readonly useLM: boolean,
      public readonly deprecated: boolean = false
    ) {
      this._assetDetails = getTokenDetails(this._asset);
    }
    public getName(): string {
      return this._name;
    }
    public getAsset(): SupportedTokens {
      return this._asset;
    }
    public getAssetDetails(): Promise<TokenDetailsData> {
      return this._assetDetails;
    }
    public getBorrowCollateral(): SupportedTokens[] {
      return this._borrowCollateral;
    }
  }
  export const lendingPoolMap: Map<SupportedTokens, LendingPool> = new Map([
    [
      SupportedTokens.dllr,
      new LendingPool(
        "DLLR",
        SupportedTokens.dllr,
        [SupportedTokens.rbtc, SupportedTokens.bpro, SupportedTokens.sov],
        false,
        false
      ),
    ],
    [
      SupportedTokens.rbtc,
      new LendingPool(
        "RBTC",
        SupportedTokens.rbtc,
        [
          SupportedTokens.dllr,
          SupportedTokens.xusd,
          SupportedTokens.sov,
          SupportedTokens.bpro,
          SupportedTokens.doc,
        ],
        false,
        false
      ),
    ],
  ]);
  
  export const getLendingPool = (asset: SupportedTokens) => {
    lendingPoolMap.get(asset) as LendingPool
}
  export const lendingPoolList = () => Array.from(lendingPoolMap.values());
  export const lendingPoolAssetList = () => Array.from(lendingPoolMap.keys());
  export const findLendingPool = (assets: Array<SupportedTokens>) => assets.map(asset => getLendingPool(asset))