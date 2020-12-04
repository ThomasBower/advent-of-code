'use strict'

const validators = {
  byr: v => v >= 1920 && v <= 2002,
  iyr: v => v >= 2010 && v <= 2020,
  eyr: v => v >= 2020 && v <= 2030,
  hgt: v => /^(59|6[0-9]|7[0-6])in$|^1([5-8][0-9]|9[0-3])cm$/.test(v),
  hcl: v => /^#[a-f0-9]{6}$/.test(v),
  ecl: v => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: v => /^\d{9}$/.test(v),
}, keys = Object.keys(validators);

const parse = input => 
  input.split('\n\n')
    .map(entry => entry
      .match(new RegExp(`(${keys.join('|')}):\\S*`, 'g'))
      .map(match => match.split(':')))
    .map(Object.fromEntries);

const part1 = input => parse(input).filter(entry =>
  keys.every(key => key in entry)).length;

const part2 = input => parse(input).filter(entry =>
  keys.every(key => key in entry && validators[key](entry[key]))).length;

module.exports = { part1, part2 }
