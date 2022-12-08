import { TNFTBalance } from 'components/templates/balances/NFT/types';

export interface IITEMCard
  extends Pick<TNFTBalance, 'amount' | 'contractType' | 'name' | 'symbol' | 'tokenAddress' | 'tokenId' | 'metadata'| 'chain' | 'price' | 'tokenUri'> {} 
