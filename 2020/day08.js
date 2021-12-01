'use strict'

const parse = input => input.split('\n')
  .map(instruction => instruction.split(' '));

const run = ([type, arg], { pc, acc }) => {
  switch (type) {
    case 'nop':
      return { pc: pc + 1, acc };
    case 'jmp':
      return { pc: pc + parseInt(arg), acc };
    case 'acc':
      return { pc: pc + 1, acc: acc + parseInt(arg) };
  }
}

const getEndOrLoopState = instructions => {
  let state = { pc: 0, acc: 0 };

  const seen = new Set();
  while (!seen.has(state.pc) && state.pc < instructions.length) {
    seen.add(state.pc);
    state = run(instructions[state.pc], state);
  }
  return state;
}

const part1 = input => getEndOrLoopState(parse(input)).acc;

const variants = instructions => instructions.map((instruction, i) => {
  const [type, arg] = instruction;
  if (type === 'acc') {
    return null;
  }
  const variant = [...instructions];
  variant[i] = [type === 'nop' ? 'jmp' : 'nop', arg];
  return variant;
}).filter(variant => variant !== null);

const part2 = input => variants(parse(input)).map(getEndOrLoopState)
  .find(state => state.pc === instructions.length).acc;

module.exports = { part1, part2 }
