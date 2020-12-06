'use strict'

const seatIds = input => input.split('\n').map(row =>
  parseInt(row.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2));

const part1 = input => Math.max(...seatIds(input))

const part2 = input => {
  const ids = seatIds(input);
  return (Math.max(...ids) + Math.min(...ids)) * (ids.length + 1) / 2 - ids.reduce((a, b) => a + b);
};

module.exports = { part1, part2 }
