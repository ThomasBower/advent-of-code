'use strict'

const parse = str => str.split('\n').map(n => parseInt(n));

const compareWindows = (depths, windowSize) => depths.reduce((p, _, i, a) =>
  (i < windowSize || a.slice(i - windowSize, i).reduce((a, b) => a + b)
    >= a.slice(i - windowSize + 1, i + 1).reduce((a, b) => a + b))
    ? p : p + 1, 0
);

const part1 = input => compareWindows(parse(input), 1);
const part2 = input => compareWindows(parse(input), 3);

module.exports = { part1, part2 }
