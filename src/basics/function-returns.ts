//* Function implicit return type
// https://www.typescript-training.com/course/fundamentals-v4/10-callables/

console.log(`
============= TypeScript - Function returns =============
`)

const maybeSumTwoNumbers = (a: number, b: number) => {
  if (Math.random() > 0.5) return 'Oh no'
  return a + b
}
// (a: number, b: number) => number | "Oh no"
// Implicit returns
// Problem is like if you only expect a number, then it is number | "Oh no"
// in the above because of inference.

const sumTwoNumbers = (a: number, b: number): number => {
  // if (Math.random() > 0.5) return 'Oh no' //! Not allowed
  return a + b
}

//* Function best practices

//? Explicit function return types
//! bad
export async function getData(url: string) {
  const resp = await fetch(url)
  // if (resp.ok) {
  const data = (await resp.json()) as {
    properties: string[]
  }
  return data
  // }
}
/* 
If we add the condition above in getData(), we will have an error here at result.properties?
we could say it is in the wrong place, but that is because we haven't explicit
decided on the return type of getData()
Imagine if we had many functions calling getData, after adding the condition in getData
we would have to change the code in all functions calling getData
*/
function loadData() {
  getData('https://example.com').then((result) => {
    console.log(result.properties.join(', '))
    //           ^?
  })
}

//* good
// Return type
// just returning the Promise with string[] as example
// or handle the error, but add the correct return type
export async function getDataGood(
  url: string
): Promise<{ properties: string[] }> {
  const resp = await fetch(url)
  if (resp.ok) {
    const data = (await resp.json()) as {
      properties: string[]
    }
    return data
  }
  return new Promise((resolve) => ['ok'])
}

function loadDataGood() {
  getData('https://example.com').then((result) => {
    console.log(result.properties.join(', '))
    //           ^?
  })
}
