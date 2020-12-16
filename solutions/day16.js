'use strict'

const parse = input => (([rules, ticket, nearby]) => ({
  rules: Object.fromEntries(rules.split('\n').map(line => {
    const [field, constraints] = line.split(': ');
    return [
      field,
      constraints.split(' or ').map(constraint => {
        const [from, to] = constraint.split('-');
        return { from: Number(from), to: Number(to) };
      })
    ];
  })),
  ticket: ticket.split('\n')[1].split(',').map(num => Number(num)),
  nearby: nearby.split('\n').slice(1)
    .map(line => line.split(',').map(num => Number(num)))
}))(input.split('\n\n'));

const part1 = input => (({ rules, nearby }) => 
  nearby.flat().filter(num => !Object.values(rules).flat()
    .some(({ from, to }) => num >= from && num <= to))
    .reduce((a, b) => a + b)
)(parse(input));

const part2 = input => (({ rules, ticket, nearby }) => {
  const validTickets = [
    ticket,
    ...nearby.filter(nums => nums.every(num => Object.values(rules).flat()
      .some(({ from, to }) => num >= from && num <= to)))
  ];

  const valsPerField = validTickets[0].map((_, colIndex) =>
    validTickets.map(row => row[colIndex]));

  const validPerCol = valsPerField.map((nums, i) => [i, Object.keys(rules).filter(rule =>
    nums.every(num => rules[rule].some(({ from, to }) => num >= from && num <= to))
  )]);

  let validByPotentialFields = validPerCol.sort((a, b) =>
    a[1].length - b[1].length);
})(parse(input));

module.exports = { part1, part2 }
