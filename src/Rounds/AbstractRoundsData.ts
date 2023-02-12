import type { Provider } from '@ethersproject/providers';
import { BaseContract, CallOverrides, ethers } from 'ethers';

import { ERCRound, ERCRoundSignData } from '../types';
import { checkSignaturePartial } from '../utils';

type FactoryConnect<C> = (address: string, provider: Provider) => C;

type RoundsDataContract = {
  allRounds: (overrides?: CallOverrides) => Promise<any[]>;
} & BaseContract;

export default abstract class AbstractRoundsData<
  ContractType extends RoundsDataContract,
  RoundType extends ERCRound,
  RoundSignData extends ERCRoundSignData,
> {
  public address!: string;
  public provider!: Provider;
  public contract!: ContractType;

  constructor(options: {
    address?: string;
    provider?: Provider;
    contract?: ContractType;
    factory: FactoryConnect<ContractType>;
  }) {
    if (options.contract) {
      this.initFromContract(options.contract);
    } else if (options.address && options.provider && options.factory) {
      this.init(options.address, options.provider, options.factory);
    } else {
      if (!options.address && options.provider) {
        throw Error('Missing contract address');
      } else if (options.address && !options.provider) {
        throw Error('Missing provider');
      } else {
        throw Error('Need contract instance or address and provider');
      }
    }

    if (!this.contract) {
      throw Error('No contracts have been connected');
    }
  }

  public initFromContract(contract: BaseContract) {
    this.address = contract.address;
    this.provider = contract.provider;

    this.contract = contract as ContractType;
    return this;
  }

  public init(
    address: string,
    provider: Provider,
    factory: FactoryConnect<ContractType>,
  ) {
    this.address = address;
    this.provider = provider;

    this.contract = factory(address, provider);
    return this;
  }

  /**
   * Check if provided signature data is correct for the current configuration.
   * Throw an error if not
   */
  public async checkSignature(
    round: RoundType,
    account: string,
    signData: RoundSignData,
  ) {
    const { chainId } = await this.provider.getNetwork();

    return checkSignaturePartial(signData.expires_at, [
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

  /**
   * Get all rounds data
   */
  async getRounds() {
    const rounds = await this.contract.allRounds();
    const roundData = rounds.map(round => {
      const needValidator = round.validator !== ethers.constants.AddressZero;

      return {
        // Remove duplicate attributes with an id as name
        ...Object.fromEntries(
          Object.entries(round).filter(([key]) => isNaN(parseInt(key))),
        ),
        validator: round.validator.toLowerCase(),
        needValidator,
      };
    });
    return roundData as RoundType[];
  }

  /**
   * Get all data
   */
  public abstract getAllData(): Promise<
    {
      rounds: RoundType;
      totalSupply: any;
    } & any
  >;
}
