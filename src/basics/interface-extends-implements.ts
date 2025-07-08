//* Differences of Interfaces and Classes
// Interface Extends
// Interface Implements
// Open Interfaces
// Recursive types

// Understand the difference of the base class extends & implements
// and see the difference of what we have in TypeScript

// Using classes
type Food = string

function consumeFood(arg: string) {
  return `Just eaten ${arg}`
}

class Animal {
  eat(food: Food) {
    consumeFood(food)
  }
}

// Regular JS extends
class Cat extends Animal {
  meow() {
    return 'meow'
  }
}

const neighborsCat = new Cat()
neighborsCat.eat('fish')
neighborsCat.meow()

// TypeScript Interfaces - extends
// In the same way, they extend the upper class, so they are for "like" things
interface Animal {
  isAlive(): boolean
}

interface Mammal extends Animal {
  getFurOrHairColor(): string
}

interface Hamster extends Mammal {
  squeak(): string
  species: string
}

function careForHamster(h: Hamster) {
  h.getFurOrHairColor()
  h.squeak()
}

const pottyPetty: Hamster = {
  species: 'rodent',
  isAlive: () => true,
  eat: (food: Food) => consumeFood(food),
  getFurOrHairColor: () => 'black',
  squeak: () => 'xiiii',
}

// TypeScript Interfaces - implements
function getMoveAbility(type: string) {
  const abilities = []
  switch (type) {
    case 'dog':
    case 'cat':
      abilities.push('walks', 'runs', 'jumps')
      break
    case 'bird':
      abilities.push('walks', 'flies')
    default:
      break
  }

  return abilities
}

// Implements represents a contract that the subclass must adhere to
interface AnimalLike {
  eat(food: Food): void
  moveAbility(): string[]
  isAlive(): boolean
}

class Dog implements AnimalLike {
  //! Must creat the eat function
  eat(food: Food) {
    consumeFood(food)
  }
  //! Must create moveAbility
  moveAbility(): string[] {
    return getMoveAbility('dog')
  }
  bark() {
    return 'woof'
  }
  isAlive(): boolean {
    return true
  }
}

const meg = new Dog()

console.log(meg.moveAbility())

// More implements

class LivingOrganism {
  //? A base class
  isAlive() {
    return true
  }
}
interface CanBark {
  //? Another interface
  bark(): string
}

//! classes can only extend a single class
// class Dog2 extends LivingOrganism, Breather implements AnimalLike, CanBark {
// However you can extend interfaces like in the interface Hamster

class Dog2 extends LivingOrganism implements AnimalLike, CanBark {
  bark() {
    return 'woof'
  }
  moveAbility(): string[] {
    return getMoveAbility('dog')
  }
  eat(food: Food) {
    consumeFood(food)
  }
}

//? Implements sometimes works with type aliases
type CanJump = {
  jumpToHeight(): number | [number, number]
}

class Dog3 implements CanJump {
  jumpToHeight(): [number, number] {
    return [1.7, 5.4]
  }
  eat(food: Food) {
    consumeFood(food)
  }
}

type CanBarkLoud =
  | number
  | {
      barkLoud(): string
    }

//* Open interfaces

function feed(animal: AnimalLike) {
  if (animal.isAlive()) {
    animal.eat('food')
  }
}
// Image something like a class that comes from a library
// you cannot change it, but you can improve on your own

interface NotAnimalLike {
  eat(food: Food): void
}

//* Allowed, it is 'extending' it
interface NotAnimalLike {
  //✔️ Additional declaration is OK
  isAlive(): boolean
}

class FlyingBug implements NotAnimalLike {
  // Notice that asks for both functions above
  eat(): string {
    return 'eating'
  }
  isAlive(): boolean {
    return true
  }
}

//* Use case: augmenting existing types

// window.document // an existing property
// //      ^? (property) document: Document
// window.exampleProperty = 42
// //      ^? (property) exampleProperty: number

// tells TS that `exampleProperty` exists
// declare global {
//     interface Window {
//     exampleProperty: number
//     }
// }

//* Recursive types

type NestedNumbers = number | NestedNumbers[]

const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221]

if (typeof val !== 'number') {
  val.push(41)
  // val.push('this will not work') //! No strings allowed
}
