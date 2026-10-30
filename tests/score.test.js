import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScore } from '../score.js';

test('ten wins at rank 30 and 100% career wins give 83.75', () => {
  assert.equal(calculateScore(30, 100, 10).total, 83.75);
});

test('zero wins at rank one give the arena floor, not zero', () => {
  assert.equal(calculateScore(1, 0, 0).total, 16.25);
});

test('five wins at rank one and 50% career wins give 35', () => {
  assert.equal(calculateScore(1, 50, 5).total, 35);
});

test('rank above 30 is capped', () => {
  assert.deepEqual(calculateScore(35, 60, 7), calculateScore(30, 60, 7));
});

test('every extra arena win adds 3.25 points', () => {
  for (let rank = 1; rank <= 30; rank++) {
    for (let wins = 0; wins < 10; wins++) {
      assert.ok(Math.abs(calculateScore(rank, 63, wins + 1).total - calculateScore(rank, 63, wins).total - 3.25) < 1e-10);
    }
  }
});
