import { BigNumber } from 'ethers';

import { ERCRound, FilteredProperties } from '../types';
import { nowTimestamp } from './time';

/**
 * Return true if the round has already started (startTime not null and grater than current timestamp)
 * Does not take into account if the round is ended or not
 */
export const isRoundStart = (round: ERCRound) =>
  round.startTime.toNumber() < nowTimestamp() &&
  round.startTime.toNumber() !== 0;

/**
 * Return true if the round has ended (duration not infinite and past)
 */
export const isRoundEnd = (round: ERCRound) =>
  !!round.duration.toNumber() &&
  round.duration.add(round.startTime).toNumber() < nowTimestamp();

/**
 * Return true if the round has started and not ended
 */
export const isRoundActive = (round: ERCRound) =>
  isRoundStart(round) && !isRoundEnd(round);

/**
 * Return true if the round have not yet started
 */
export const isRoundNext = (round: ERCRound) =>
  !isRoundStart(round) && round.startTime.toNumber() !== 0;

/**
 * Return true if the round is finished
 */
export const isRoundEnded = (round: ERCRound) =>
  !isRoundEnd(round) && round.startTime.toNumber() !== 0;

/**
 * Get all rounds started and not ended
 */
export const getActiveRounds = (rounds: ERCRound[]) =>
  rounds.filter(round => isRoundActive(round));

/**
 * Get all rounds that have not yet started
 */
export const getNextRounds = (rounds: ERCRound[]) =>
  rounds.filter(round => isRoundNext(round));

/**
 * Get all rounds that are finished
 */
export const getPastRounds = (rounds: ERCRound[]) =>
  rounds.filter(round => isRoundEnded(round));

/**
 * Get `activeRounds`, `nextRounds` and `pastRounds`
 */
export const getRoundsByState = (rounds: ERCRound[]) =>
  rounds.reduce(
    (res, round) => {
      if (round.startTime.toNumber() == 0) {
        return res;
      }

      const isStart = isRoundStart(round);
      const isEnd = isRoundEnd(round);

      return {
        activeRounds:
          isStart && !isEnd ? [...res.activeRounds, round] : res.activeRounds,
        nextRounds: !isStart ? [...res.nextRounds, round] : res.nextRounds,
        pastRounds: isEnd ? [...res.pastRounds, round] : res.pastRounds,
      };
    },
    { activeRounds: [], nextRounds: [], pastRounds: [] } as {
      activeRounds: ERCRound[];
      nextRounds: ERCRound[];
      pastRounds: ERCRound[];
    },
  );

/**
 * Sort rounds by a BigNumber key
 */
export const sortRoundsBy = (
  by: keyof FilteredProperties<ERCRound, BigNumber>,
  rounds: ERCRound[],
  direction: 'asc' | 'desc' = 'asc',
) =>
  rounds.sort((a, b) =>
    a[by].eq(b[by])
      ? 0
      : a[by].lte(b[by])
      ? direction === 'asc'
        ? -1
        : 1
      : direction === 'asc'
      ? 1
      : -1,
  );

/**
 * Sort rounds by startTime
 */
export const sortRoundsByStartTime = (
  rounds: ERCRound[],
  direction: 'asc' | 'desc' = 'asc',
) => sortRoundsBy('startTime', rounds, direction);

/**
 * Sort rounds by price
 */
export const sortRoundsByPrice = (
  rounds: ERCRound[],
  direction: 'asc' | 'desc' = 'asc',
) => sortRoundsBy('price', rounds, direction);
