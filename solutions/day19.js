'use strict'

const parse = input => (([rules, messages]) => ({
  rules: Object.fromEntries(rules.map(rule => rule.split(': '))
    .map(line => [Number(line[0]), line[1].split(' | ').map(part => 
      part.split(' ').map(char => char[0] === '"' ? char[1] : Number(char)))]
    )),
  messages
}))(input.split('\n\n').map(section => section.split('\n')));

const buildRegex = (rules, recursiveRules) => {
  const regexes = {};

  const buildRegexHelper = index => {
    if (regexes[index]) {
      return regexes[index];
    }
    regexes[index] = `(${rules[index].map(rule => {
      if (rule.join('').match(/^[a-z]+$/i)) {
        return rule.join('');
      }
      return rule.map(r => buildRegexHelper(r)).join('');
    }).join('|')})`;
    return regexes[index];
  };

  if (recursiveRules) {
    regexes[8] = `(${buildRegexHelper(42)}+)`;
    // Recursive matching isn't supported in Javascript (yet?), so match up to
    // ten levels deep for now.
    regexes[11] = `(${new Array(10).fill(0).map((_, i) =>
      `(${buildRegexHelper(42)}{${i + 1}}${buildRegexHelper(31)}{${i + 1}})`)
      .join('|')})`;
  }

  return new RegExp(`^${buildRegexHelper(0)}$`);
}

const count = ({ rules, messages }, recursiveRules = false) => {
  const regex = buildRegex(rules, recursiveRules);
  return messages.filter(message => regex.test(message)).length;
}

const part1 = input => count(parse(input));
const part2 = input => count(parse(input), true);

module.exports = { part1, part2 }
