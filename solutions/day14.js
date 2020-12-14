'use strict'

const ignore = 'X', maskLength = 36;

const parse = input => input.split('\n').map(line => line.split(' = '));

const part1 = input => {
  let memory = {};
  let mask = 'X'.repeat(maskLength);

  parse(input).forEach(([lhs, rhs]) => lhs === 'mask'
    ? mask = rhs
    : memory[parseInt(lhs.split('[')[1])] = (value =>
      parseInt([...value.toString(2).padStart(maskLength, '0')]
        .map((value, i) => mask[i] === 'X' ? value : mask[i])
        .join(''), 2))(parseInt(rhs))
  );

  return Object.values(memory).reduce((a, b) => a + b);
}

const part2 = input => {
  return input
}

module.exports = { part1, part2 }
