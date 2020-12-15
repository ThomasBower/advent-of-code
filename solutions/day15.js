'use strict'

const numberAt = (input, n) => {
  const numbers = input.split(',').map(num => Number(num));
  const seen = new Map(numbers.slice(0, -1).map((num, index) => [num, index]));

  let lastSeen = numbers[numbers.length - 1];
  for (let i = numbers.length; i < n; i++) {
    const term = seen.has(lastSeen) ? i - seen.get(lastSeen) - 1 : 0;
    seen.set(lastSeen, i - 1);
    lastSeen = term;
  }
  return lastSeen;
}

const part1 = input => numberAt(input, 2020);
const part2 = input => numberAt(input, 30000000);

module.exports = { part1, part2 }
