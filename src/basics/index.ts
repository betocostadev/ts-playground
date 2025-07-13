//* This file contains basic TypeScript examples
// Also an index for the 'basics' folder

import { log } from '../utils/helpers'

const topics = ['1 - Introduction (intro.ts)', '2 - Variables and values']

// Tuple type for topic entries: [description, filename]
type TopicEntry = readonly [string, string]

// Array of topic tuples
const topicEntries: TopicEntry[] = [
  ['1 - Intro', 'intro.ts'],
  ['2 - Variables and values', 'variables.ts'],
  ['3 - Type aliases', 'type-aliases.ts'],
  ['4 - Objects, arrays and tuples', 'TO-CREATE'],
  ['5 - Functions', 'function-returns.ts'],
  ['7 - Union & intersection', 'union-intersection.ts'],
  ['8 - Using enums', 'TO-CREATE'],
  ['9 - Using as const', 'as-const.ts'],
  ['10 - Interfaces, extends, implements', 'interface-extends-implements.ts'],
  ['11 - Type queries', 'type-queries'],
  ['12 - callables and constructors', 'callables-constructors'],
  ['13 - Classes & type guards', 'cls-and-type-guards.ts'],
]

const logIndex = (topicsArr: TopicEntry[]) => {
  for (let i = 0; i < topicsArr.length; i++) {
    log(`Topic: ${topicsArr[i][0]} | File: ${topicsArr[i][1]}`)
  }
}

logIndex(topicEntries)
