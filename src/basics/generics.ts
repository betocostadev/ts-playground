//* TypeScript Generics
// Lots of contents from here: https://www.typescript-training.com/course/fundamentals-v4/13-generics/

import { log } from '../utils/helpers'

console.log(`
============= TypeScript - Generics =============
`)

//* A motivating use case
// A dictionary could be typed using index signatures

// const phones: {
//   [k: string]: {
//     customerId: string
//     areaCode: string
//     num: string
//   }
// } = {}

// phones.home
// phones.mobile
// phones.work

const phoneList = [
  { customerId: '0001', areaCode: '321', num: '123-4566' },
  { customerId: '0002', areaCode: '174', num: '142-3626' },
  { customerId: '0003', areaCode: '192', num: '012-7190' },
  { customerId: '0005', areaCode: '402', num: '652-5782' },
  { customerId: '0004', areaCode: '301', num: '184-8501' },
]
const phoneDict = {
  '0001': {
    customerId: '0001',
    areaCode: '321',
    num: '123-4566',
  },
  '0002': {
    customerId: '0002',
    areaCode: '174',
    num: '142-3626',
  },
  /*... and so on */
}

interface PhoneInfo {
  customerId: string
  areaCode: string
  num: string
}

function listToDict(
  list: PhoneInfo[], // take the list as an argument
  idGen: (arg: PhoneInfo) => string // a callback to get Ids
): { [k: string]: PhoneInfo } {
  const dict: { [k: string]: PhoneInfo } = {} // initialize a data structure of the right type
  list.forEach((element) => {
    const dictKey = idGen(element)
    dict[dictKey] = element // store the element under key
  })
  return dict
}

const dictPhoneList = listToDict(phoneList, (item) => item.customerId)
log('Transformed phone list')
log(dictPhoneList)

// While the above works great, it is very narrow, we only work with the PhoneInfo type.
// What about making it wider, but still having the type information?\\

//* Defining a type parameter <T>
// T comes back from C, Template Classes
// It is just a convention...
// function improvedListToDict<T, E, X>(
function improvedListToDict<T>(
  list: T[],
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {} // initialize a data structure of the right type
  list.forEach((element) => {
    const dictKey = idGen(element)
    dict[dictKey] = element // store the element under key
  })
  return dict
}

// check the difference of dictPhoneList with dictPhoneList2
// const dictPhoneList2 = improvedListToDict(phoneList, (item) => item.customerId)
// log('Transformed phone list')
// log(dictPhoneList)

const carList = [
  { carId: '0001', make: 'Lamborghini', model: 'Aventador', year: 2016 },
  { carId: '0002', make: 'Ferrari', model: 'Modena', year: 2008 },
  { carId: '0003', make: 'BMW', model: 'X6', year: 2019 },
  { carId: '0005', make: 'Mercedes', model: 'GLS AMG', year: 2010 },
  { carId: '0004', make: 'Fiat', model: 'Uno Stairs Top', year: 2000 },
]

const dictCarList = improvedListToDict(carList, (item) => item.carId)
log(dictCarList)

function wrapInArray<T>(arg: T): [T] {
  return [arg]
}
wrapInArray(3)
//   ^?
wrapInArray(new Date())
//   ^?
wrapInArray(new RegExp('/s/'))
