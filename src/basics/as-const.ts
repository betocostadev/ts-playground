//* TypeScript - as const
// Very useful feature, including to be used as a better type instead
// of using 'enums'.

import { log } from '../utils/helpers'

// Very effective technique
let goodHumid2 = 80 as const //! humidity's type is { 80 }
// goodHumid2 = 90 //! No can't do

// TS Syntax

const places = {
  home: 'Lisbon',
  newHome: 'Porto',
  previousHome: 'São Paulo',
  dreamHome: 'Helsinki',
  nestedPlaces: {
    good: 'Amsterdan',
  },
} as const
// Transforms the above keys in readonly
// It is deep, nestedPlaces is also readonly
// places.home = 'Porto' //! No can't do

type TimeTo = 'future' | 'now' | 'back then' | ({} & string) // Auto-complete and other strings

const goToPlace = ({
  destination,
  locations,
}: {
  destination: TimeTo
  locations: typeof places
}): void => {
  switch (destination) {
    case 'now':
      log(`Going to ${locations.newHome}`)
      break
    case 'future':
      log(`Going to ${locations.dreamHome}`)
      break
    case 'now':
      log(`Going to ${locations.newHome}`)
      break
    default:
      log(`Not sure it going to ${destination}`)
      break
  }
}

goToPlace({ destination: 'future', locations: places })
goToPlace({ destination: 'someday', locations: places }) //^ Fine due to timeTo type
goToPlace({ destination: 'back then', locations: places })
// goToPlace({ destination: 10, locations: places }) //! Not good

const places2 = Object.freeze({
  home: 'Lisbon',
  newHome: 'Porto',
  previousHome: 'São Paulo',
  dreamHome: 'Helsinki',
  nestedPlace: {
    good: 'Amsterdan',
  },
})
// Also transforms into readonly - this is runtime
// But it is not deep
// places2.home = 'Nevada' //! Not possible
places2.nestedPlace.good = 'Dublin' // Fine

//* Extracting the types from 'as const'
const dayGreetings = {
  morning: 'Good morning',
  afternoon: 'Lets grab a coffee?',
  evening: 'Want a beer?',
} as const

// type Greetings = keyof typeof dayGreetings
type Greetings = (typeof dayGreetings)[keyof typeof dayGreetings] // extract the key value
// Like Object.values but on the type

const greet = (choice: Greetings) => {
  log(choice)
}

greet('Lets grab a coffee?') // Auto-completes with key values
