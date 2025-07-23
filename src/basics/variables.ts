//* TypeScript Variable Declarations & Inference

//* Variable Declarations & Inference

console.log(`
============= TypeScript - Variables & Inference =============
`)

let temperature = 6 //* inference
// temperature = "hot"  //! type-checking
const humidity = 40 //* literal type

let temp2 = 19 //* temp2's type is { all numbers }
let humidity2 = 79 as const //* humidity's type is { 79 }
temp2 = 20 // fine
// humidity = 50 //! not possible - 40 only

let temp3 = 19 // temp2's type is { all numbers }
let humidity3 = 79 as const // humid2's type is { 79 }

temp2 = 23 //* Is each member in { 23 } also in { all numbers }? ✅ YES
temp2 = humidity3 //* Is each member in { 79 } also in { all numbers }? ✅ YES
//
// humidity3 = temp3; //! Is each member in { all numbers } also in { 79 }? ❌ NO
humidity3 = 79 //* Is each member in { 79 } also in { 79 } ✅ YES
// humidity3 = 78; //! Is each member in { 78 } also in { 79 } ❌ NO

// Sometimes, we need to declare a variable before it gets initialized, like endTime below:
// between 500 and 1000
const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500

let startTime = new Date()
let endTime //! any

setTimeout(() => {
  endTime = 0 // still any
  endTime = new Date()
}, RANDOM_WAIT_TIME)

// endTime was not assigned a value at the start neither was set a type
// so it is 'any'
// even later in setTimeout is still any, so no type checking for this variable

// In cases like this, set the time if you can't or don't need to initialize the variable.

function generateRandomWaitTime() {
  const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500
  let startTime = new Date()
  let endTime: Date
  let resultString: string

  setTimeout(() => {
    // endTime = 0 //! not possible, 0 is not Date
    endTime = new Date() //* fine
    resultString = `
    Times generated
    Start time: ${startTime}
    End time: ${endTime}`
    console.log(resultString)
  }, RANDOM_WAIT_TIME)
}

console.log(generateRandomWaitTime())

//* Type Casting
// When we want to force the compiler to regard a value as being of a particular type
let frontEndMastersFounding = new Date('Jan 1, 2012')
let femFoundingDate = frontEndMastersFounding // Date

let femAnyDate = frontEndMastersFounding as any // force the type to be `any`

const newHumidity = 79 as number // It is a number, safe

//! danger
let anyDate = 'oops' as any as Date
// anyDate // TypeScript thinks this is a Date now, but it's really a string
// let anyDate: Date // Like this
// anyDate.toISOString() //! will break the code 💥
