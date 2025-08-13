//* TypeScript Collections - Objects, Arrays and Tuples
// Lots of contents from here: https://www.typescript-training.com/course/fundamentals-v4/04-objects-arrays-and-tuples/

import { log } from '../utils/helpers'

console.log(`
============= TypeScript - Collections: Objects, Arrays and Tuples =============
`)

//* Object with optional properties
type carType = {
  make: string
  model: string
  year: number
  chargeVoltage?: number
}

const myTesla: carType = {
  make: 'Tesla',
  model: 'Model S',
  year: 2022,
  chargeVoltage: 220,
  // engineType: 'Electric' //! not from type carType
}

const myLambo = {
  make: 'Lamborghini',
  model: 'Urus',
  year: 2020,
  color: 'Red', // Fine because we are not typing as carType
}

function printCar(car: carType): string {
  let str = `${car.make} - ${car.model} | Year: ${car.year}`
  if (typeof car.chargeVoltage !== 'undefined') {
    str += ` // ${car.chargeVoltage}v`
  }
  return str
}

log(printCar(myTesla))

log(printCar(myLambo)) // Works because myLambo satisfies the carType asked in printCar

// log(printCar({
//   make: 'Maserati',
//   model: 'Ghibli',
//   year: 2204
//   color: 'Black'
// })) //! in this case it won't work.
// This won't work because the function does not need color. So why add it?
// But if the object exists, then it may have more properties to use in other places.
// So as long as it is an existing object and satisfies the type, it is ok.

type truck = {
  make: 'GM' | 'VOLVO' | 'SCANIA' | (string & {}) // The trick to have flexibility
  model: string
  year: number
}

const myTruck: truck = {
  make: 'VOLVO', // uses autocomplete and accepts other strings
  model: 'X300',
  year: 2000,
}

log(printCar(myTruck)) // Fine, satisfies the carType

console.log('\nIndex Signatures')
//* Index signatures
//? Dictionary of phone #s
const phones: {
  mobile: {
    country: string
    area: string
    number: string
  }
  [k: string]: {
    country: string
    area: string
    number: string
  }
} = {
  home: { country: '+351', area: '211', number: '652-4515' },
  work: { country: '+351', area: '670', number: '752-5856' },
  mobile: { country: '+351', area: '322', number: '525-4357' },
}
// Now, no matter what key we look up, we get an object that represents a phone number.

// phones.mobile
// phones.fax // Ok
// phones['fax'] // Recommended for Dicts since this can be undefined
log(phones)

log(`
Array Types
`)

//*  Array Types
const fileExtensions = ['js', 'ts', 'jsx', 'tsx']
//  ^? string[]

type NumArray = number[]

const newCarYears: NumArray = [2019, 2020, 2021, 2022, 2023, 2024, 2025]
log(fileExtensions)
log(newCarYears)

function logCarsOwnedQty(cars: carType[]) {
  if (!cars.length) {
    return `Provided user has no cars`
  }
  const oldestCar = cars.find((c) => Math.min(c.year))
  const carList: string[] = []

  cars.forEach((car) => carList.push(printCar(car)))

  return `User has ${cars.length} cars:
  ${carList}
  Older car is from: ${oldestCar!.year}`
}

log(logCarsOwnedQty([myLambo, myTesla]))

log(`
Tuples
`)
//* Tuples

let myToyota = [
  2002, // Year
  'Toyota', // Make
  'Corolla', // Model
]
const [year, make, model] = myToyota //✔️ Destructuring

//? Inference doesn't work very well for tuples
// myHonda = ["Honda", 2017, "Accord", "Sedan"] //! Wrong convention

//*  `readonly` tuples
log('numPair Tuple: [4, 5]')
const numPair: [number, number] = [4, 5] //✔️ Valid
// const numTriplet: [number, number, number] = [7]; //! Invalid

// [101, 102, 103].length//? number[].length
log(`numPair length is: ${numPair.length}`) //? [number, number] length

// When it is not read only, you can still use .pop and .push
numPair.push(6) // [4, 5, 6]
numPair.pop() // [4, 5]
numPair.pop() // [4]
numPair.pop() // []

// And here is the problem, check the length
numPair.length //! ❌ DANGER ❌
log(`numPair length is: ${numPair.length}`)

// Now the way that it works and have type safety
const roNumPair: readonly [number, number] = [4, 5]
roNumPair.length
// roNumPair.push(6) // [4, 5, 6] //! Not allowed
// roNumPair.pop() // [4, 5] //! Not allowed
