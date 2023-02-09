import type { Provider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';

import {
  ERC1155RoundsUpgradeable,
  ERC1155RoundsUpgradeable__factory,
} from '../types/ethers-contracts';
import { AbstractRoundsData } from './AbstractRoundsData';

export type ERC1155Round = {
  // Contract struct
  id: BigNumber;
  tokenId: BigNumber;
  supply: number;
  startTime: BigNumber;
  duration: BigNumber;
  price: BigNumber;
  totalMinted: BigNumber;
  validator: string;

  // Other data
  needValidator: boolean;
};

export type ERC1155RoundSignData = {
  address: string;
  roundId: number;
  tokenId: number;
  maxMint: number;
  smartContractAddress: string;
  smartContractChainId: string;
  expires_at: number;
  signature: string;
};

export class ERC1155RoundsData extends AbstractRoundsData<
  ERC1155RoundsUpgradeable,
  ERC1155Round,
  ERC1155RoundSignData
> {
  constructor(options: {
    address?: string;
    provider?: Provider;
    contract?: ERC1155RoundsUpgradeable;
  }) {
    super({
      ...options,
      factory: (address: string, provider: Provider) =>
        ERC1155RoundsUpgradeable__factory.connect(address, provider),
    });
  }

  /**
   * Check if provided signature data is correct for the current configuration.
   * Throw an error if not
   */
  async checkSignature(
    round: ERC1155Round,
    account: string,
    signData: ERC1155RoundSignData,
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
        a: signData.tokenId,
        b: round.tokenId,
        name: 'round',
      },
      {
        a: signData.address.toLowerCase(),
        b: account.toLowerCase(),
        name: 'wallet',
      },
    ]);
  }

  /**
   * Get the total supply of a token Id
   */
  async getTotalSupply(tokenId: number) {
    const totalSupply = await this.contract.totalSupply(tokenId);
    return totalSupply.toNumber();
  }

  /**
   * Get the total supply foreach tokenId in list
   */
  async getTotalSupplyForTokenList(tokenIdsList: number[]) {
    const allTotalSupply = await Promise.all(
      tokenIdsList.map(
        tokenId =>
          new Promise((resolve: (v: number) => any, reject) =>
            this.getTotalSupply(tokenId).then(resolve).catch(reject),
          ),
      ),
    );
    return allTotalSupply.reduce(
      (acc, value, idx) => ({
        ...acc,
        [tokenIdsList[idx]]: value,
      }),
      {},
    ) as { [tokenId: number]: number };
  }

  /**
   * Get all data
   */
  async getAllData() {
    const rounds = await this.getRounds();

    /** All tokenId used in round */
    const tokenIdsInRounds: number[] = [];
    rounds.forEach(round => {
      const tokenId = round.tokenId.toNumber();
      if (!tokenIdsInRounds.includes(tokenId)) {
        tokenIdsInRounds.push(tokenId);
      }
    });

    /** The supply foreach tokenId used in rounds */
    const totalSupply = await this.getTotalSupplyForTokenList(tokenIdsInRounds);

    return { rounds, totalSupply };
  }
}
