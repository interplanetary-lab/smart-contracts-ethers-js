# Smart Contracts Ethers.JS

**Interplanetary Lab's smart contract binding libraries with Ethers.js.**

## Table of Contents

- [Smart Contracts Ethers.JS](#smart-contracts-ethersjs)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Documentation](#documentation)
    - [ERC721RoundsData and ERC1155RoundsData](#erc721roundsdata-and-erc1155roundsdata)
      - [Constructor](#constructor)
      - [Get rounds](#get-rounds)
      - [Verify signature](#verify-signature)

## Overview

### Installation

```console
$ npm install @interplanetary-lab/smart-contracts-ethers-js
```

### Usage

Once installed, you can use the contracts in the library by importing them:

```javascript
import { ethers } from 'ethers';
import { ERC721RoundsData } from '@interplanetary-lab/smart-contracts-ethers-js';

const provider = new ethers.providers.JsonRpcProvider('defaultRpcUrl');
const roundsData = new ERC721RoundsData({
  address: 'contractAddress',
  provider,
});

const allRounds = await roundsData.getRounds();
const { rounds, totalSupply } = await roundsData.getAllData();
```

## Documentation

### ERC721RoundsData and ERC1155RoundsData

#### Constructor

You can instantiate the `ERC721RoundsData` or `ERC1155RoundsData` with:

- The contract `address` and a ethers.js `provider`

```javascript
import {
  ERC721RoundsData,
  ERC1155RoundsData,
} from '@interplanetary-lab/smart-contracts-ethers-js';

const roundsDataForERC721 = new ERC721RoundsData({
  address: 'contractAddress',
  provider,
});

const roundsDataForERC1155 = new ERC1155RoundsData({
  address: 'contractAddress',
  provider,
});
```

- Directly with an existing contract instance

```javascript
import { MyERC1155__factory } from '../../types/ethers-contracts';
import { ERC1155RoundsData } from '@interplanetary-lab/smart-contracts-ethers-js';

const contract = MyERC1155__factory.connect(address, provider);

const erc1155RoundsData = new ERC1155RoundsData({ contract });
```

#### Get rounds

Get all sanitized rounds data, filtered and typed with `ERC721Round` or `ERC1155Round`.

```javascript
const allRounds = await roundsData.getRounds();
```

#### Verify signature

You can check if your signature data fit with your smart contract.
Allows you to predict in advance that a private mint will not work and have more information than the revert of the contract.

Throw error like `The signature is expired` or `The signature was not generated for the correct [contract|network|round|wallet]`.

```javascript
import { ERC1155RoundSignData, ERC1155Round } from '@interplanetary-lab/smart-contracts-ethers-js';

try {

  let currentRound: ERC1155Round;
  let sigData: ERC1155RoundSignData;
  // ...
  // Get `sigData` from an api
  // ...
  await erc1155RoundsData.checkSignature(currentRound, account, sigData);
} catch (error: Error) {
  console.error(error);
}
```
