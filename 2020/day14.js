'use strict'

const ignore = 'X';

const parse = input => input.split('\n').map(line => line.split(' = '));

const part1 = input => {
  let memory = {};
  let mask = ignore.repeat(36);

  parse(input).forEach(([lhs, rhs]) => lhs === 'mask' ? mask = rhs
    : memory[parseInt(lhs.split('[')[1])] = (val =>
      BigInt(parseInt(mask.replace(new RegExp(`/${ignore}/g`), 1), 2)) &
      (BigInt(parseInt(mask.replace(new RegExp(`/${ignore}/g`), 0), 2)) |
        BigInt(val)))(parseInt(rhs))
  );

  return Number(Object.values(memory).reduce((a, b) => a + b));
}

const floatingAddrs = decoder => (floatingBits =>
  [...Array(2 ** floatingBits).keys()]
    .map(val => parseInt([...Array(floatingBits).keys()].reverse()
      .reduce((mapped, pos) => mapped.replace(ignore, val >> pos & 1), decoder)
      , 2)))([...decoder].filter(val => val === ignore).length);

const part2 = input => {
  let memory = {};
  let mask = '0'.repeat(36);

  parse(input).forEach(([lhs, rhs]) => lhs === 'mask' ? mask = rhs :
    floatingAddrs([...parseInt(lhs.split('[')[1]).toString(2).padStart(36, '0')]
    .map((char, i) => mask[i] !== '0' ? mask[i] : char).join(''))
      .forEach(addr => memory[addr] = parseInt(rhs))
  );

  return Object.values(memory).reduce((a, b) => a + b);
}

module.exports = { part1, part2 }
