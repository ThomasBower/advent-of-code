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

  // compute field names
  const fieldPositions = new Map();
  const remainingFields = Object.keys(rules);
  const remainingFieldPositions = remainingFields.map((_, i) => i);

  // loop while we have fields, since we have to progressively narrow the search space
  while (remainingFields.length > 0) {
    let didFindAMatch = false;

    // loop through each field by position
    for (const i of remainingFieldPositions) {
      // get list of fields for this position
      const values = validTickets.map(t => t[i]).flat();
      // find all possible matches for this field
      const matchingFields = remainingFields.filter(field => values.every(value => rules[field].some(option => value >= option.from && value <= option.to)));
      if (matchingFields.length === 0) {
        throw new Error(`Did not fid a match for field ${ i }`);
      }
      
      // if there is exactly one, then we found the match
      if (matchingFields.length === 1) {
        // save field position
        const matchingField = matchingFields[0];
        fieldPositions.set(matchingField, i);
    
        // mark field and position as consumed
        remainingFields.splice(remainingFields.indexOf(matchingField), 1);
        remainingFieldPositions.splice(remainingFieldPositions.indexOf(i), 1);

        // keep iterating - we haven't failed yet
        didFindAMatch = true;
      }
    }

    // detect and break out of stalls
    if (!didFindAMatch) {
      throw new Error(`Search stalled - no new matches found and ${ remainingFields.length } remaining.`);
    }
  }

  return ['departure location', 'departure station', 'departure platform', 'departure track', 'departure date', 'departure time']
    .map(field => fieldPositions.get(field))
    .map(fieldPosition => ticket[fieldPosition])
    .reduce((prod, value) => prod * value, 1)
})(parse(input));

module.exports = { part1, part2 }
