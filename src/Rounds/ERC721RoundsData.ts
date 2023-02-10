import type { Provider } from '@ethersproject/providers';

import { ERC721Round, ERC721RoundSignData } from '../types';
import {
  ERC721RoundsUpgradeable,
  ERC721RoundsUpgradeable__factory,
} from '../types/ethers-contracts';
import AbstractRoundsData from './AbstractRoundsData';

export class ERC721RoundsData extends AbstractRoundsData<
  ERC721RoundsUpgradeable,
  ERC721Round,
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
    round: ERC721Round,
    account: string,
    signData: ERC721RoundSignData,
  ) {
    super.checkSignature(round, account, signData);
  }

  public async getAllData() {
    const rounds = await this.getRounds();
    const totalSupply = await this.contract.totalSupply();

    return { rounds, totalSupply };
  }
}
