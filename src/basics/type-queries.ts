//* keyof

type DatePropertyNames = keyof Date

// Check that it gets the methods of the Date type
type DateStringPropertyNames = DatePropertyNames & string
type DateSymbolPropertyNames = DatePropertyNames & symbol

// Another type by extraction of keys
const contact = {
  name: 'Jumbalaya',
  age: 35,
  email: 'jumba.monza@example.com',
}

type ContactProperty = keyof typeof contact

// keyof = Object.keys() for types
// typeof = "get me the type of this value"

//* typeof

async function main() {
  const apiResponse = await Promise.all([
    fetch('https://example.com'),
    Promise.resolve('Titanium White'),
  ])
  type ApiResponseType = typeof apiResponse
}

//?^ note: type alias within a function scope!
const MyAjaxConstructor = CSSRule
CSSRule.STYLE_RULE
const myAjax = new CSSRule()

type MyRuleType = typeof MyAjaxConstructor

//* Indexed Access Types

interface ICar {
  make: string
  model: string
  year: number
  color: {
    red: string
    green: string
    blue: string
  }
}

let carColor: ICar['color'] //✔️ Reaching for something that exists
// let carSomething: ICar["not-something-on-car"] //! Reaching for something invalid
let carColorRedComponent: ICar['color']['red'] //✔️ Reaching for something nested
let carProperty: ICar['color' | 'year'] // ✔️ Passing a union type through the index

//* Use case: the type registry pattern
/*
// See: 
import("./09-type-registry/")

/**/
export default {}
