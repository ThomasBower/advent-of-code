'use strict'

const numberAt = (input, n) => {
  const numbers = input.split(',').map(num => Number(num));
  const seen = new Array(n);
  numbers.slice(0, -1).forEach((num, index) => seen[num] = index);

  let lastSeen = numbers[numbers.length - 1];
  for (let i = numbers.length; i < n; i++) {
    const term = seen[lastSeen] !== undefined ? i - seen[lastSeen] - 1 : 0;
    seen[lastSeen] = i - 1;
    lastSeen = term;
  }
  return lastSeen;
}

const part1 = input => numberAt(input, 2020);
const part2 = input => numberAt(input, 30000000);

module.exports = { part1, part2 }
