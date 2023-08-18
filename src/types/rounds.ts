import { BigNumber } from 'ethers';

export type ERCRound = {
  // Contract struct
  id: BigNumber;
  supply: number;
  startTime: BigNumber;
  duration: BigNumber;
  price: BigNumber;
  totalMinted: BigNumber;
  validator: string;

  // Other data
  needValidator: boolean;
};

export type ERCRoundSignData = {
  address: string;
  roundId: number;
  maxMint: number;
  smartContractAddress: string;
  smartContractChainId: string;
  expires_at: number;
  signature: string;
};

export type ERC721Round = ERCRound;

export type ERC721RoundSignData = ERCRoundSignData;

export type ERC1155Round = ERCRound & {
  tokenId: BigNumber;
};

export type ERC1155RoundSignData = ERCRoundSignData & {
  tokenId: number;
};
