'use strict'

const part1 = input => input.split('\n\n')
  .map(group => [...new Set(group.replace(/\n/g, ''))])
  .flat().length;

const part2 = input => input.split('\n\n')
  .map(group => group.split('\n').map(decl => [...decl])
    .reduce((p, c) => p.filter(e => c.includes(e))))
  .flat().length;

module.exports = { part1, part2 }
