//* TypeScript Callables and Constructors
//* Callables
// Some materials are based on:
// https://www.typescript-training.com/course/fundamentals-v4/10-callables/

console.log(`
============= TypeScript - Callables and Constructors =============
`)

import { log } from '../utils/helpers'

// Call signature
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

//* Callables - Function overloads
// https://www.typescript-training.com/course/fundamentals-v4/10-callables/#function-overloads
// What if we had to create a function that allowed us to register a "main event listener"?
// • If we are passed a form element, we should allow registration of a "submit callback"
// • If we are passed an iframe element, we should allow registration of a "postMessage callback"

type FormSubmitHandler = (data: FormData) => void
type MessageHandler = (evt: MessageEvent) => void // Listener like 'onSubmit'

// function handleMainEvent(
//   elem: HTMLFormElement | HTMLIFrameElement,
//   handler: FormSubmitHandler | MessageHandler
// ) {}

// const myFrame = document.getElementsByTagName('iframe')[0]
// handleMainEvent(myFrame, (val) => {}) // It doesn't get types of handleMainEvent
// as we would expect, in this case is just - const myFrame: HTMLIFrameElement

// Using function overload
// This is for us to get elem: HTMLFormElement & handler: FormSubmitHandler
// or elem: HTMLIFrameElement & handler: MessageHandler
// not mixed

// Function implementation
// Function heads - they don't have a body.
// they are added before the function

function handleMainEvent(
  elem: HTMLFormElement,
  handler: FormSubmitHandler
): void
function handleMainEvent(elem: HTMLIFrameElement, handler: MessageHandler): void
// full function - types must match the function heads
function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler
) {
  log('the real handleMainEvent function')
}

const myFrame = document.getElementsByTagName('iframe')[0] // iframe
handleMainEvent(myFrame, (val) => {}) // messageEvent
// handleMainEvent() - check the call, now we have it correct

// const myFrame = document.getElementsByTagName('form')[0] // - FormData
// handleMainEvent(myFrame, (val) => {}) // myFrame = HTMLForm, val = formData

//* `this` types
// It is possible to type the 'this' keyword to make sure of the type
// you're expecting
// function myClickHandler(event: Event) {
//     this.disabled = true // this = any?
// }
// myClickHandler(new Event("click")) // maybe ok?

// Special JavaScript way of handling this case
function myClickHandler(this: HTMLButtonElement, event: Event) {
  this.disabled = true // Now a button type
}

// Attention - 'this' in the function above is just typing the context of this.
// It is NOT an argument, you still have only one argument for the myClickHandler function
// myClickHandler(new Event('click')) //! Not ok, not button

const myButton = document.getElementsByTagName('button')[0]
const boundHandler = myClickHandler.bind(myButton) // binding the new button
// now 'this' is already applied to boundHandler, just expects the event
boundHandler(new Event('click')) // bound version: ok
myClickHandler.call(myButton, new Event('click')) // or this way, also ok

//* Constructors
// Not using the 'new' word we have a call signature like above
// Most used, used for callbacks, higher order functions, etc.
interface DateCaller {
  (value: number): Date
}

// Constructor signature
// Used for nullables, anything to create an instance like classes
interface DateConstructor {
  new (value: number): Date
}

let MyDateConstructor: DateConstructor = Date
const dateInstance = new MyDateConstructor(1697923072611)
