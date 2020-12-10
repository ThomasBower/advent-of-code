'use strict'

const parse = input => input.split('\n').map(line => Number(line));

const part1 = input => (([ones, _, threes]) => ones * threes)(parse(input)
  .sort((a, b) => a - b).reduce((diffs, val, i, arr) => diffs.map((cnt, j) =>
    val - (arr[i - 1] || 0) === j + 1 ? cnt + 1 : cnt), [0, 0, 1]));

const part2 = input => [0, ...parse(input).sort((a, b) => a - b)]
  .reduce((combinations, val, i, arr) => [...combinations, (i === 0 ?
    1 : arr.slice(Math.max(0, i - 3), i).map((prev, j) => val - prev <= 3 ?
      combinations[Math.max(0, i - 3) + j] : 0).reduce((a, b) => a + b))], [])
  .pop();

module.exports = { part1, part2 }
