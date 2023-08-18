# Smart Contracts Ethers.JS

**Interplanetary Lab's smart contract binding libraries with Ethers.js.**

## Table of Contents

- [Smart Contracts Ethers.JS](#smart-contracts-ethersjs)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Documentation](#documentation)
    - [Rounds](#rounds)
      - [ERC721RoundsData and ERC1155RoundsData](#erc721roundsdata-and-erc1155roundsdata)
      - [Rounds state and sorts](#rounds-state-and-sorts)

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

### Rounds

#### ERC721RoundsData and ERC1155RoundsData

**Constructor**

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

**Get rounds**

Get all sanitized rounds data, filtered and typed with `ERC721Round` or `ERC1155Round`.

```javascript
const allRounds = await roundsData.getRounds();
```

**Verify signature**

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

#### Rounds state and sorts

**Test state**
You can verify if a given round is start, active, next, past...

```javascript
import {
  ERC721Round,
  ERC1155Round,
  isRoundStart,
  isRoundEnded,
  isRoundActive,
  isRoundNext,
} from '@interplanetary-lab/smart-contracts-ethers-js';

let round: ERC1155Round | ERC721Round;
// ...

const isStart = isRoundStart(round);
const isEnded = isRoundEnded(round);
const isActive = isRoundActive(round);
const isNext = isRoundNext(round);
```

**Rounds filtered by state**
You can get an array of filtered rounds according to their condition.

```javascript
import {
  ERC721Round,
  ERC1155Round,
  getActiveRounds,
  getNextRounds,
  getPastRounds,
} from '@interplanetary-lab/smart-contracts-ethers-js';

let rounds: ERC1155Round[] | ERC721Round[];
// ...

/// rounds started and not ended
const activeRounds = getActiveRounds(rounds);

/// rounds that have not yet started
const nextRounds = getNextRounds(rounds);

/// rounds that are finished
const pastRounds = getPastRounds(rounds);

// or

/// Get all at once (more optimized)
const { activeRounds, nextRounds, pastRounds } = getRoundsByState(rounds);
```

**Rounds sorted**
You can get sort an array of rounds.

```javascript
import {
  ERC721Round,
  ERC1155Round,
  sortRoundsByStartTime,
  sortRoundsByPrice,
  sortRoundsBy,
} from '@interplanetary-lab/smart-contracts-ethers-js';

let rounds: ERC1155Round[] | ERC721Round[];
// ...

/// sort rounds by startTime
const roundsByStartTime = sortRoundsByStartTime(rounds, 'asc');

/// sort rounds by price
const roundsByPrice = sortRoundsByPrice(rounds, 'desc');

/// sort rounds by a given BigNumber key
const customSorted = sortRoundsBy('totalMinted', rounds, 'asc');
```
