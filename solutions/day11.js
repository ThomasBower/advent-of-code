'use strict'

const empty = 'L', occupied = '#', floor = '.';

const parse = input => input.split('\n').map(row => row.split(''));

const iterate = seats => seats.slice().map((row, y) => row.map((seat, x) => {
  const taken = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0],
    [1, 1]].reduce((p, [dy, dx]) => (x + dx < 0 || x + dx >= row.length
      || y + dy < 0 || y + dy >= seats.length) ? p : (seats[y + dy][x + dx] === occupied ? p + 1 : p), 0);
  if (taken === 0 && seat === empty) return occupied;
  if (taken >= 4 && seat === occupied) return empty;
  return seat;
}));

const part1 = input => {
  let seats = parse(input);
  while (JSON.stringify(seats) !== JSON.stringify(iterate(seats))) {
    seats = iterate(seats);
  }
  return seats.flat().reduce((p, c) => c === occupied ? p + 1 : p, 0);
}

const iterate2 = seats => seats.slice().map((row, y) => row.map((seat, x) => {
  const taken = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0],
    [1, 1]].reduce((p, [dy, dx]) => {
      let dxP = dx, dyP = dy;
      while (x + dxP >= 0 && x + dxP < row.length && y + dyP >= 0 && y + dyP < seats.length) {
        if (seats[y + dyP][x + dxP] === occupied) return p + 1;
        if (seats[y + dyP][x + dxP] === empty) return p;
        dxP += dx;
        dyP += dy;
      }
      return p;
    }, 0);
  if (taken === 0 && seat === empty) return occupied;
  if (taken >= 5 && seat === occupied) return empty;
  return seat;
}));

const part2 =  input => {
  let seats = parse(input);
  while (JSON.stringify(seats) !== JSON.stringify(iterate2(seats))) {
    seats = iterate2(seats);
  }
  return seats.flat().reduce((p, c) => c === occupied ? p + 1 : p, 0);
}

module.exports = { part1, part2 }
