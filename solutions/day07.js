'use strict'

const target = 'shiny gold';

const parse = input => input.split('\n').reduce((map, line) => {
  const [containedBy, contains] = line.split(' bags contain ')
  map[containedBy] = contains.includes('no other bags') ? []
    : [...contains.matchAll(/(\d+) ([a-z]+ [a-z]+)/g)].map(
      ([, amount, type]) => ({ type, amount: parseInt(amount) }));
  return map;
}, {});

const find = (input, root) => input[root].reduce((p, { type }) =>
  p || type === target || find(input, type), false) ? 1 : 0;

const part1 = input => (parsed => Object.keys(parsed).reduce((t, b) =>
  t + find(parsed, b), 0))(parse(input));

const count = (input, type) => 1 + input[type].reduce(
  (total, { type, amount }) => total + amount * count(input, type), 0);

const part2 = input => count(parse(input), target) - 1;

module.exports = { part1, part2 }
