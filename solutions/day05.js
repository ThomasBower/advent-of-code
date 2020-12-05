'use strict'

const seatIds = input => input.split('\n').map(row =>
  parseInt(row.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2));

const part1 = input => Math.max(...seatIds(input))

const part2 = input => seatIds(input)
  .sort((a, b) => a - b)
  .reduce((res, a, i, as) => 
    !i || res !== undefined || as[i - 1] + 1 === a ? res : as[i - 1] + 1
  , undefined);

module.exports = { part1, part2 }
