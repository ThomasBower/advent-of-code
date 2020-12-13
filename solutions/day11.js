'use strict'

const empty = 'L', occupied = '#';

const parse = input => input.split('\n').map(row => row.split(''));

const iterate = (seats, numTaken, immediateOnly) => seats
  .map((row, y) => row.map((seat, x) => {
    const taken = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0],
      [1, 1]].reduce((p, [dy, dx]) => {
        let dxP = dx, dyP = dy;
        while (x + dxP >= 0 && x + dxP < row.length
          && y + dyP >= 0 && y + dyP < seats.length) {
          if (seats[y + dyP][x + dxP] === occupied) {
            return p + 1;
          }
          if (seats[y + dyP][x + dxP] === empty || immediateOnly) {
            break;
          }
          dxP += dx;
          dyP += dy;
        }
        return p;
      }, 0);
    if (taken === 0 && seat === empty) {
      return occupied;
    }
    if (taken >= numTaken && seat === occupied) {
      return empty;
    }
    return seat;
  }));

const countOccupied = (input, numTaken, immediateOnly = true) => {
  let prev = null;
  let next = parse(input);
  while (JSON.stringify(prev) !== JSON.stringify(next)) {
    prev = next;
    next = iterate(prev, numTaken, immediateOnly);
  }
  return next.flat().filter(seat => seat === occupied).length;
}

const part1 = input => countOccupied(input, 4, true);
const part2 = input => countOccupied(input, 5, false);

module.exports = { part1, part2 }
