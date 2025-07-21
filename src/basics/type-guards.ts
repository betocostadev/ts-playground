//* TypeScript Type Guards and narrowing
// Lots of contents from here: https://www.typescript-training.com/course/fundamentals-v4/12-type-guards/

// Type guards used with control flow allow to create branches of code that have concrete assumptions.
// Like, if it follows 1 branch, it is because it is of that specific type.

console.log(`
============= TypeScript - Type Guards =============
`)

//* Built-in type guards
let value:
  | Date
  | null
  | undefined
  | 'pineapple'
  | [number]
  | { dateRange: [Date, Date] }

//? instanceof
if (value instanceof Date) {
  value
  // ^?
}
//? typeof
else if (typeof value === 'string') {
  value
  // ^?
}
//? Specific value check
else if (value === null) {
  value
  // ^?
}
//? Truthy/falsy check
else if (!value) {
  value
  // ^?
}
//? Some built-in functions
else if (Array.isArray(value)) {
  value
  // ^?
}
//? Property presence check
else if ('dateRange' in value) {
  value
  // ^?
} else {
  value
  // ^?
}

// Example of something you saw earlier that is applying a type guard
function flipCoin(): 'heads' | 'tails' {
  if (Math.random() > 0.5) return 'heads'
  return 'tails'
}
const success = [
  'success',
  { name: 'Beto Costa', email: 'beto@example.com' },
] as const

const error = ['error', new Error('User not found!')] as const

// It knows that we can have one or the other, each for one branch
export function maybeGetUserInfo(): typeof success | typeof error {
  // implementation is the same in both examples
  if (flipCoin() === 'heads') {
    return success
  } else {
    return error
  }
}

const userInfoOutcome = maybeGetUserInfo()

type Toutcome = typeof success | typeof error

// specific value check
const getOutcome = (outcome: Toutcome) => {
  if (outcome[0] === 'error') {
    // knows it will be type error
    return `Response error - ${outcome[1]}`
  } else {
    // knows it will be type success
    return `User: ${outcome[1].name} | ${outcome[1].email}`
  }
}

console.log(getOutcome(userInfoOutcome))

const numOrApple = (item: 1 | 'apple'): void => {
  if (typeof item === 'number') {
    console.log('it is numeber: ', item)
  } else {
    console.log('it is the ', item)
  }
}
console.log(numOrApple('apple'))

//* User-defined type guards

interface CarLike {
  make: string
  model: string
  year: number
}

let maybeCar: any

// the guard
// if (
//   maybeCar &&
//   typeof maybeCar === 'object' &&
//   'make' in maybeCar &&
//   typeof maybeCar['make'] === 'string' &&
//   'model' in maybeCar &&
//   typeof maybeCar['model'] === 'string' &&
//   'year' in maybeCar &&
//   typeof maybeCar['year'] === 'number'
// ) {
//   maybeCar // - Still any
//   // ^?
// }

// the guard
// function isCarLike(valueToTest: any) { // Will check for truthy, but return any
// Type guards should return booleans, like the function is doing
// But we need to tell TS what this boolean means, we need to explicitly set the return type
function isCarLike(valueToTest: any): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'make' in valueToTest &&
    typeof valueToTest['make'] === 'string' &&
    'model' in valueToTest &&
    typeof valueToTest['model'] === 'string' &&
    'year' in valueToTest &&
    typeof valueToTest['year'] === 'number'
  )
}

// using the guard
// if (isCarLike(maybeCar)) {
// maybeCar // with the return type in the function, it is Car Like here
// ^?
// }

const busTen = {
  make: 'Volvo',
  model: 'Bus',
  year: 2010,
}

const motorcycleHaya = {
  make: 'Suzuki',
  model: 'Hayabusa',
  year: 2012,
}

const ferrariCalifornia: CarLike = {
  make: 'Ferrari',
  model: 'California',
  year: 2016,
}

const checkCarLike = (item: any) => {
  if (isCarLike(item)) {
    return `Item ${item.model} is Car Like` // Now item is CarLike
  } else {
    return 'Unknown item'
  }
}
console.log(checkCarLike(maybeCar))
console.log(checkCarLike(busTen))
console.log(checkCarLike(motorcycleHaya))
console.log(checkCarLike(ferrariCalifornia))

//* asserts value is foo

// function assertsIsCarLike(valueToTest: any): asserts valueToTest is CarLike {
//   if (
//     !(
//       valueToTest &&
//       typeof valueToTest === 'object' &&
//       'make' in valueToTest &&
//       typeof valueToTest['make'] === 'string' &&
//       'model' in valueToTest &&
//       typeof valueToTest['model'] === 'string' &&
//       'year' in valueToTest &&
//       typeof valueToTest['year'] === 'number'
//     )
//   )
//     throw new Error(`Value does not appear to be a CarLike${valueToTest}`)
// }
// assertsIsCarLike(maybeCar)
// maybeCar

//? throw or not?
// The difference in the assert function is basically that we are throwing and error
// think of it like the same thing, but for a different output. Maybe you can accept only that
// type and other types should throw an error

//* Use with private #field presence checks

class Car {
  static #nextSerialNumber: number = 100
  static #generateSerialNumber() {
    return this.#nextSerialNumber++
  }

  #serialNumber = Car.#generateSerialNumber()

  static isCar(other: any): other is Car {
    if (
      other && // is it truthy
      typeof other === 'object' && // and an object
      #serialNumber in other
    ) {
      // and we can find a private field that we can access from here
      // then it *must* be a car
      other // Car
      // ^?
      return true
    }
    return false
  }
}

// let anotherVal: any

// if (Car.isCar(anotherVal)) {
// anotherVal // Car
// ^?
// }

//* Narrowing with switch(true)

class Fishy {
  swim(): void {
    console.log('Fish is swimming')
  }
}
class Birdy {
  fly(): void {
    console.log('Bird is flying')
  }
}

// Pattern matching
function runAnimalAction(val: any): void {
  switch (true) {
    case val instanceof Birdy:
      val.fly()
      break
    case val instanceof Fishy:
      val.swim()
      break
  }
}

const theNeeeemo = new Fishy()
const theBeepyBoop = new Birdy()
runAnimalAction(theNeeeemo)
runAnimalAction(theBeepyBoop)

//* Writing high-quality type guards

//! EXAMPLE OF A BAD TYPE GUARD
function isNull(val: any): val is null {
  // falsy values will pass through here, so it will not return what we expect
  // better to use val === null
  return !val //! Lies!
}
const empty = ''
const zero = 0
if (isNull(zero)) {
  console.log(zero) //? is it really impossible to get here?
}
if (isNull(empty)) {
  console.log(empty) //? is it really impossible to get here?
}
