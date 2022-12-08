import { EvmNftContractType } from '@moralisweb3/evm-utils';
import { MoralisDataObjectValue } from '@moralisweb3/core';
import { BigNumber } from 'ethers';

export type TNFTMarketplace = {
  tokenAddress: string;
  chain: string | number;
  ownerOf: string | undefined;
  blockNumberMinted: string | undefined;
  blockNumber: string | undefined;
  tokenId: string | number;
  contractType: EvmNftContractType;
  tokenUri?: string | undefined;
  tokenHash?: string | undefined;
  metadata: MoralisDataObjectValue;
  name?: string | undefined;
  symbol?: string | undefined;
  lastMetadataSync?: Date | undefined;
  lastTokenUriSync?: Date | undefined;
  amount?: number | undefined;
};

export type TNFTData = {
  0: BigNumber | undefined,
  1: string | undefined,
  2: BigNumber | undefined,
  3: string | undefined,
  4: string | undefined,
  5: BigNumber | undefined,
  6: boolean
}


export interface INFTMarketplace {
  items?: TNFTMarketplace[];
  data?: TNFTData[];
}
