import type { Provider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';

import {
  ERC721RoundsUpgradeable,
  ERC721RoundsUpgradeable__factory,
} from '../types/ethers-contracts';
import { AbstractRoundsData } from './AbstractRoundsData';

export type ERC721Rounds = {
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

export type ERC721RoundSignData = {
  address: string;
  roundId: number;
  maxMint: number;
  smartContractAddress: string;
  smartContractChainId: string;
  expires_at: number;
  signature: string;
};

export class ERC721RoundsData extends AbstractRoundsData<
  ERC721RoundsUpgradeable,
  ERC721Rounds,
  ERC721RoundSignData
> {
  constructor(options: {
    address?: string;
    provider?: Provider;
    contract?: ERC721RoundsUpgradeable;
  }) {
    super({
      ...options,
      factory: (address: string, provider: Provider) =>
        ERC721RoundsUpgradeable__factory.connect(address, provider),
    });
  }

  public async checkSignature(
    round: ERC721Rounds,
    account: string,
    signData: ERC721RoundSignData,
  ) {
    const { chainId } = await this.provider.getNetwork();

    this.checkSignaturePartial(signData.expires_at, [
      {
        a: signData.smartContractAddress.toLowerCase(),
        b: this.address.toLowerCase(),
        name: 'contract',
      },
      {
        a: signData.smartContractChainId,
        b: chainId,
        name: 'network',
      },
      {
        a: signData.roundId,
        b: round.id,
        name: 'round',
      },
      {
        a: signData.address.toLowerCase(),
        b: account.toLowerCase(),
        name: 'wallet',
      },
    ]);
  }

  public async getAllData() {
    const rounds = await this.getRounds();
    const totalSupply = await this.contract.totalSupply();

    return { rounds, totalSupply };
  }
}
