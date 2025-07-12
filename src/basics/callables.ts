//* Callables

interface TwoNumberCalculation {
  (x: number, y: number): number
}

type TwoNumberCalc = (x: number, y: number) => number

const add: TwoNumberCalculation = (a, b) => a + b
const subtract: TwoNumberCalc = (x, y) => x - y

//* `void`

function printFormattedJSON(obj: string[]) {
  console.log(JSON.stringify(obj, null, '  '))
}

const x = printFormattedJSON(['hello', 'world'])

function invokeInFourSeconds(callback: () => undefined) {
  setTimeout(callback, 4000)
}
function invokeInFiveSeconds(callback: () => void) {
  setTimeout(callback, 5000)
}

// Notice this
const values: number[] = []
// invokeInFourSeconds(() => values.push(4)) //! Error: Type 'undefined' is not assignable to type 'number'.
invokeInFiveSeconds(() => values.push(4))
// First one is not ok because the function expects undefined as the return value
// but .push() actually returns a number, the new length of the array
// Second one is ok because it is void, so no return is expected, we only run the side-effect
// () => void == ignore the return value
