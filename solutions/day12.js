'use strict'

const parse = input => input.split('\n').map(line =>
  [line.slice(0, 1), Number(line.slice(1))]);

const move = ([y, x, direction], [action, value]) => {
  const bearings = { 'N': 0, 'E': 90, 'S': 180, 'W': 270 };
  switch(action) {
    case 'N': return [y + value, x, direction];
    case 'S': return [y - value, x, direction];
    case 'E': return [y, x + value, direction];
    case 'W': return [y, x - value, direction];
    case 'L': return [y, x,
      Object.entries(bearings)[((bearings[direction] - value + 360) / 90) % 4][0]];
    case 'R': return [y, x,
      Object.entries(bearings)[((bearings[direction] + value) / 90) % 4][0]];
    case 'F': return move([y, x, direction], [direction, value]);
  }
}

const part1 = input => parse(input)
    .reduce((state, instr) => move(state, instr), [0, 0, 'E']).slice(0, 2)
    .reduce((p, c) => p + Math.abs(c), 0);

const rotations = { 
  R: { 90: [[0, -1], [1, 0]], 180: [[-1, 0], [0, -1]], 270: [[0, 1], [-1, 0]] },
  L: { 90: [[0, 1], [-1, 0]], 180: [[-1, 0], [0, -1]], 270: [[0, -1], [1, 0]] }
};

const move2 = ([y, x, wy, wx], [action, value]) => {
  switch(action) {
    case 'N': return [y, x, wy + value, wx];
    case 'S': return [y, x, wy - value, wx];
    case 'E': return [y, x, wy, wx + value];
    case 'W': return [y, x, wy, wx - value];
    case 'L':
    case 'R':
      return [y, x, wy * rotations[action][value][0][0] + wx * rotations[action][value][0][1],
        wy * rotations[action][value][1][0] + wx * rotations[action][value][1][1]];
    case 'F':
      return [y + (wy * value), x + (wx * value), wy, wx];
  }
}

const part2 = input => parse(input)
    .reduce((state, instr) => move2(state, instr), [0, 0, 1, 10]).slice(0, 2)
    .reduce((p, c) => p + Math.abs(c), 0);

module.exports = { part1, part2 }
