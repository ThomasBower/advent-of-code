'use strict'

const parse = input => input.split('\n').map(([operation, ...value]) =>
  [operation, Number(value)]);

const rotations = { 
  L: { 90: [[0, 1], [-1, 0]], 180: [[-1, 0], [0, -1]], 270: [[0, -1], [1, 0]] },
  R: { 90: [[0, -1], [1, 0]], 180: [[-1, 0], [0, -1]], 270: [[0, 1], [-1, 0]] },
};

const rotate = (wy, wx, value, dir) => [wy * rotations[dir][value][0][0]
  + wx * rotations[dir][value][0][1], wy * rotations[dir][value][1][0]
  + wx * rotations[dir][value][1][1]];

const commonOperations = {
  'L': ([y, x, wy, wx], value) => [y, x, ...rotate(wy, wx, value, 'L')],
  'R': ([y, x, wy, wx], value) => [y, x, ...rotate(wy, wx, value, 'R')],
  'F': ([y, x, wy, wx], value) => [y + (wy * value), x + (wx * value), wy, wx],
};

const operations1 = {
  ...commonOperations,
  'N': ([y, x, wy, wx], value) => [y + value, x, wy, wx],
  'S': ([y, x, wy, wx], value) => [y - value, x, wy, wx],
  'E': ([y, x, wy, wx], value) => [y, x + value, wy, wx],
  'W': ([y, x, wy, wx], value) => [y, x - value, wy, wx],
};

const operations2 = {
  ...commonOperations,
  'N': ([y, x, wy, wx], value) => [y, x, wy + value, wx],
  'S': ([y, x, wy, wx], value) => [y, x, wy - value, wx],
  'E': ([y, x, wy, wx], value) => [y, x, wy, wx + value],
  'W': ([y, x, wy, wx], value) => [y, x, wy, wx - value],
};

const run = (input, operations, state) => parse(input)
  .reduce((state, [op, val]) => operations[op](state, val), state)
  .slice(0, 2).reduce((p, c) => p + Math.abs(c), 0);

const part1 = input => run(input, operations1, [0, 0, 0, 1]);
const part2 = input => run(input, operations2, [0, 0, 1, 10]);

module.exports = { part1, part2 }
