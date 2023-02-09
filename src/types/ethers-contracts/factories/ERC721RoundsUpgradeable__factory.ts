/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  ERC721RoundsUpgradeable,
  ERC721RoundsUpgradeableInterface,
} from "../ERC721RoundsUpgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "supply",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "validator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "RoundSetup",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rounds",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "supply",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "validator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalMinted",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "roundsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
    ],
    name: "totalMintedBy",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "allRounds",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "supply",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "startTime",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "duration",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "validator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalMinted",
            type: "uint256",
          },
        ],
        internalType: "struct ERC721RoundsUpgradeable.Round[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611473806100206000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c806370a08231116100a2578063a22cb46511610071578063a22cb465146102d4578063b88d4fde146102e7578063c87b56dd146102fa578063cc5da26b1461030d578063e985e9c51461034257600080fd5b806370a08231146101ec578063755424dd146101ff5780638c65c81f1461021457806395d89b41146102cc57600080fd5b806318160ddd116100e957806318160ddd1461019857806323b872dd146101aa57806327599ee9146101bd57806342842e0e146101c65780636352211e146101d957600080fd5b806301ffc9a71461011b57806306fdde0314610143578063081812fc14610158578063095ea7b314610183575b600080fd5b61012e610129366004610f00565b61037e565b60405190151581526020015b60405180910390f35b61014b6103d0565b60405161013a9190610f6d565b61016b610166366004610f80565b610462565b6040516001600160a01b03909116815260200161013a565b610196610191366004610fb5565b610489565b005b6097545b60405190815260200161013a565b6101966101b8366004610fdf565b6105a3565b61019c60985481565b6101966101d4366004610fdf565b6105d4565b61016b6101e7366004610f80565b6105ef565b61019c6101fa36600461101b565b61064f565b6102076106d5565b60405161013a9190611036565b61027c610222366004610f80565b60996020526000908152604090208054600182015460028301546003840154600490940154929363ffffffff83169367ffffffffffffffff6401000000008504811694600160601b900416926001600160a01b0316919087565b6040805197885263ffffffff909616602088015267ffffffffffffffff948516958701959095529290911660608501526001600160a01b0316608084015260a083015260c082015260e00161013a565b61014b610832565b6101966102e23660046110d6565b610841565b6101966102f5366004611128565b610850565b61014b610308366004610f80565b610888565b61019c61031b366004610fb5565b6000908152609a602090815260408083206001600160a01b03949094168352929052205490565b61012e610350366004611204565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b14806103af57506001600160e01b03198216635b5e139f60e01b145b806103ca57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060606580546103df90611237565b80601f016020809104026020016040519081016040528092919081815260200182805461040b90611237565b80156104585780601f1061042d57610100808354040283529160200191610458565b820191906000526020600020905b81548152906001019060200180831161043b57829003601f168201915b5050505050905090565b600061046d826108fc565b506000908152606960205260409020546001600160a01b031690565b6000610494826105ef565b9050806001600160a01b0316836001600160a01b0316036105065760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061052257506105228133610350565b6105945760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016104fd565b61059e838361095e565b505050565b6105ad33826109cc565b6105c95760405162461bcd60e51b81526004016104fd9061126b565b61059e838383610a4b565b61059e83838360405180602001604052806000815250610850565b6000818152606760205260408120546001600160a01b0316806103ca5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016104fd565b60006001600160a01b0382166106b95760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016104fd565b506001600160a01b031660009081526068602052604090205490565b6060600060985467ffffffffffffffff8111156106f4576106f4611112565b60405190808252806020026020018201604052801561075b57816020015b6040805160e08101825260008082526020808301829052928201819052606082018190526080820181905260a0820181905260c082015282526000199092019101816107125790505b50905060005b60985481101561082c576099600061077a8360016112cf565b81526020808201929092526040908101600020815160e08101835281548152600182015463ffffffff81169482019490945267ffffffffffffffff6401000000008504811693820193909352600160601b909304909116606083015260028101546001600160a01b03166080830152600381015460a08301526004015460c08201528251839083908110610810576108106112e2565b602002602001018190525080610825906112f8565b9050610761565b50919050565b6060606680546103df90611237565b61084c338383610be7565b5050565b61085a33836109cc565b6108765760405162461bcd60e51b81526004016104fd9061126b565b61088284848484610cb5565b50505050565b6060610893826108fc565b60006108aa60408051602081019091526000815290565b905060008151116108ca57604051806020016040528060008152506108f5565b806108d484610ce8565b6040516020016108e5929190611311565b6040516020818303038152906040525b9392505050565b6000818152606760205260409020546001600160a01b031661095b5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016104fd565b50565b600081815260696020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610993826105ef565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806109d8836105ef565b9050806001600160a01b0316846001600160a01b03161480610a1f57506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610a435750836001600160a01b0316610a3884610462565b6001600160a01b0316145b949350505050565b826001600160a01b0316610a5e826105ef565b6001600160a01b031614610ac25760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016104fd565b6001600160a01b038216610b245760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016104fd565b610b2f60008261095e565b6001600160a01b0383166000908152606860205260408120805460019290610b58908490611340565b90915550506001600160a01b0382166000908152606860205260408120805460019290610b869084906112cf565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031603610c485760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104fd565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610cc0848484610a4b565b610ccc84848484610de9565b6108825760405162461bcd60e51b81526004016104fd90611353565b606081600003610d0f5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610d395780610d23816112f8565b9150610d329050600a836113bb565b9150610d13565b60008167ffffffffffffffff811115610d5457610d54611112565b6040519080825280601f01601f191660200182016040528015610d7e576020820181803683370190505b5090505b8415610a4357610d93600183611340565b9150610da0600a866113cf565b610dab9060306112cf565b60f81b818381518110610dc057610dc06112e2565b60200101906001600160f81b031916908160001a905350610de2600a866113bb565b9450610d82565b60006001600160a01b0384163b15610edf57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610e2d9033908990889088906004016113e3565b6020604051808303816000875af1925050508015610e68575060408051601f3d908101601f19168201909252610e6591810190611420565b60015b610ec5573d808015610e96576040519150601f19603f3d011682016040523d82523d6000602084013e610e9b565b606091505b508051600003610ebd5760405162461bcd60e51b81526004016104fd90611353565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610a43565b506001949350505050565b6001600160e01b03198116811461095b57600080fd5b600060208284031215610f1257600080fd5b81356108f581610eea565b60005b83811015610f38578181015183820152602001610f20565b50506000910152565b60008151808452610f59816020860160208601610f1d565b601f01601f19169290920160200192915050565b6020815260006108f56020830184610f41565b600060208284031215610f9257600080fd5b5035919050565b80356001600160a01b0381168114610fb057600080fd5b919050565b60008060408385031215610fc857600080fd5b610fd183610f99565b946020939093013593505050565b600080600060608486031215610ff457600080fd5b610ffd84610f99565b925061100b60208501610f99565b9150604084013590509250925092565b60006020828403121561102d57600080fd5b6108f582610f99565b602080825282518282018190526000919060409081850190868401855b828110156110c9578151805185528681015163ffffffff16878601528581015167ffffffffffffffff90811687870152606080830151909116908601526080808201516001600160a01b03169086015260a0808201519086015260c0908101519085015260e09093019290850190600101611053565b5091979650505050505050565b600080604083850312156110e957600080fd5b6110f283610f99565b91506020830135801515811461110757600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561113e57600080fd5b61114785610f99565b935061115560208601610f99565b925060408501359150606085013567ffffffffffffffff8082111561117957600080fd5b818701915087601f83011261118d57600080fd5b81358181111561119f5761119f611112565b604051601f8201601f19908116603f011681019083821181831017156111c7576111c7611112565b816040528281528a60208487010111156111e057600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561121757600080fd5b61122083610f99565b915061122e60208401610f99565b90509250929050565b600181811c9082168061124b57607f821691505b60208210810361082c57634e487b7160e01b600052602260045260246000fd5b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b808201808211156103ca576103ca6112b9565b634e487b7160e01b600052603260045260246000fd5b60006001820161130a5761130a6112b9565b5060010190565b60008351611323818460208801610f1d565b835190830190611337818360208801610f1d565b01949350505050565b818103818111156103ca576103ca6112b9565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b634e487b7160e01b600052601260045260246000fd5b6000826113ca576113ca6113a5565b500490565b6000826113de576113de6113a5565b500690565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061141690830184610f41565b9695505050505050565b60006020828403121561143257600080fd5b81516108f581610eea56fea264697066735822122079ff595aafd419a77691fcb40f7fd8e5a8b786013ba9f39c9741d7fbebd547b564736f6c63430008110033";

type ERC721RoundsUpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721RoundsUpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721RoundsUpgradeable__factory extends ContractFactory {
  constructor(...args: ERC721RoundsUpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721RoundsUpgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC721RoundsUpgradeable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC721RoundsUpgradeable {
    return super.attach(address) as ERC721RoundsUpgradeable;
  }
  override connect(signer: Signer): ERC721RoundsUpgradeable__factory {
    return super.connect(signer) as ERC721RoundsUpgradeable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721RoundsUpgradeableInterface {
    return new utils.Interface(_abi) as ERC721RoundsUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721RoundsUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC721RoundsUpgradeable;
  }
}