//* TypeScript Generics
// Lots of contents from here: https://www.typescript-training.com/course/fundamentals-v4/13-generics/

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

function idGenerator(element: any, key: string): string {
  return element[key]
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
console.log('Transformed phone list')
console.log(dictPhoneList)
