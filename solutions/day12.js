'use strict'

const parse = input => input.split('\n').map(line =>
  [line.slice(0, 1), Number(line.slice(1))]);

const rotations = { 
  R: { 90: [[0, -1], [1, 0]], 180: [[-1, 0], [0, -1]], 270: [[0, 1], [-1, 0]] },
  L: { 90: [[0, 1], [-1, 0]], 180: [[-1, 0], [0, -1]], 270: [[0, -1], [1, 0]] }
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
  .reduce((state, [operation, value]) => operations[operation](state, value), state)
  .slice(0, 2).reduce((p, c) => p + Math.abs(c), 0);

const part1 = input => run(input, operations1, [0, 0, 0, 1]);
const part2 = input => run(input, operations2, [0, 0, 1, 10]);

module.exports = { part1, part2 }
