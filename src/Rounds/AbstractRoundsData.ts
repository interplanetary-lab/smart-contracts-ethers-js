import type { Provider } from '@ethersproject/providers';
import { BaseContract, CallOverrides, ethers } from 'ethers';

type FactoryConnect<C> = (address: string, provider: Provider) => C;

type ContractType<C> = {
  allRounds: (overrides?: CallOverrides) => Promise<any[]>;
} & C &
  BaseContract;

export default abstract class AbstractRoundsData<C, RoundType, RoundSignData> {
  public address!: string;
  public provider!: Provider;
  public contract!: ContractType<C>;

  constructor(options: {
    address?: string;
    provider?: Provider;
    contract?: BaseContract;
    factory?: FactoryConnect<ContractType<C>>;
  }) {
    if (options.contract) {
      return this.initFromContract(options.contract);
    }
    if (options.address && options.provider && options.factory) {
      return this.init(options.address, options.provider, options.factory);
    }
  }

  public initFromContract(contract: BaseContract) {
    this.address = contract.address;
    this.provider = contract.provider;

    this.contract = contract as ContractType<C>;
    return this;
  }

  public init(
    address: string,
    provider: Provider,
    factory: FactoryConnect<ContractType<C>>,
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
  public abstract checkSignature(
    round: RoundType,
    account: string,
    signData: RoundSignData,
  ): Promise<void>;

  /**
   * Check all data and throw an error if a signature data is different
   * @param expiresTimestamp
   * @param data Array of signature data to compare
   */
  protected async checkSignaturePartial(
    expiresTimestamp: number,
    /** Data to compare */
    data: {
      /** Actual data */
      a: any;
      /** Expected data */
      b: any;
      /** Name of the comparison to display in the error */
      name: string;
    }[],
  ) {
    if (expiresTimestamp <= Math.floor(Date.now() / 1000)) {
      throw new Error(`The signature is expired`);
    }
    data.forEach(({ a, b, name }) => {
      if (a != b) {
        throw new Error(
          `The signature was not generated for the correct ${name}. ${a} is different from ${b}`,
        );
      }
    });
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
