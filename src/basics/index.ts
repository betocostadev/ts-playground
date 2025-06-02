// This file contains basic TypeScript examples and exercises.
import { log } from '../utils/helpers'

export function greet(name: string): string {
  return `Hello, ${name}!`
}

export function add(a: number, b: number): number {
  return a + b
}

export class Person {
  constructor(public name: string, public age: number) {}

  describe(): string {
    return `${this.name} is ${this.age} years old.`
  }
}

// Example usage
const person = new Person('Alice', 30)
log(person.describe())
log(greet('Bob'))
log(add(5, 10).toString())
