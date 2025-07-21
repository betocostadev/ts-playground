//* TypeScript Classes
// Lots of contents from here: https://www.typescript-training.com/course/fundamentals-v4/11-classes/

console.log(`
============= TypeScript - Classes =============
`)

const TSpecies = {
  RODENT: 'rodent',
  CAT: 'cat',
  DOG: 'canine',
} as const

type TAnimalSpecies = (typeof TSpecies)[keyof typeof TSpecies]

//* Field types
class SomeMammal {
  species: TAnimalSpecies
  type: string
  age: number
  constructor(species: TAnimalSpecies, type: string, age: number) {
    this.species = species
    this.type = type
    this.age = age
  }
}

// Car.generateSerialNumber() //✔️ Works, calls on the class and not the instance (static)

let jaguar = new SomeMammal('cat', 'jaguar', 12)
// jaguar.act("jump") //! not safe!
// new SomeMammal(13, "dog", "bulldog") //! not safe!

//* method types
class Bike {
  make: string
  model: string
  year: number
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }

  // typed method
  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`
  }
}

const suzukiOne = new Bike('Suzuki', 'One', 2025)
suzukiOne.honk(3) // "hooonk"

//* Static member fields and static blocks
class Car {
  //? static fields
  static nextSerialNumber = 100
  static generateSerialNumber() {
    // 'this' here is Car class
    // return Car.nextSerialNumber++
    return this.nextSerialNumber++
  }
  make: string
  model: string
  year: number
  serialNumber = Car.generateSerialNumber() // Access to Car class
  constructor(make: string, model: string, year: number) {
    // this here is car instance
    this.make = make
    this.model = model
    this.year = year
  }

  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`
  }

  getLabel() {
    // this.serialNumber works here because we have generated for the class above
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }
}

//* static blocks
//? static blocks are called after the class declaration is proccessed. It doesn't wait for a new instance to be created
class Truck {
  // static members
  static nextSerialNumber = 10
  // static generate
  static {
    // `this` is the static scope
    fetch('https://api.example.com/new_truck_serial_number')
      .then((response) => response.json())
      .then((data) => {
        this.nextSerialNumber = data.mostRecentInvoiceId + 1
      })
  }

  make: string
  model: string
  year: number

  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }

  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`
  }
}

//* Access modifier keywords
class SmallCar {
  //? on static fields
  // private - only instances of this class can see this field (subclasses cannot see it)
  // private static nextSerialNumber: number
  private static nextSerialNumber = 0
  //? on member fields
  private static generateSerialNumber(): number {
    return this.nextSerialNumber++
  }
  // no static - instance
  private _serialNumber = SmallCar.generateSerialNumber()
  // sub-classes can see it, but anything else outside can't
  protected get serialNumber() {
    return this._serialNumber
  }

  make: string
  model: string
  year: number

  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }

  getSmallCarData() {
    // this.serialNumber = 123 //! read-only property only a getter
    return `Car ${this.model} by ${this.make} has the serial number: ${this.serialNumber}`
  }
}

// static field
// SmallCar.generateSerialNumber() //! private

const smallNissan = new SmallCar('Nissan', 'Altima', 2020)
// smallNissan.serialNumber //! not acessible
console.log(smallNissan.getSmallCarData()) // 0 - fine

const smallSmart = new SmallCar('Smart', 'Picollino', 2021)
console.log(smallSmart.getSmallCarData()) // 1 - fine

//* JS private #fields

//? member fields
// #serialNumber = Car.generateSerialNumber()
// c.#serialNumber

//? static fields
// static #nextSerialNumber: number
// static #generateSerialNumber() { return this.#nextSerialNumber++ }

//? Private field presence checks
// equals(other: any) {
//   if (other && typeof other === 'object' && #serialNumber in other)

//? readonly
// readonly #serialNumber = Car.#generateSerialNumber()

class SuperTruck {
  //? static fields
  static #nextSerialNumber: number
  static #nextChassiNumber: number
  static #generateSerialNumber(): number {
    return this.#nextSerialNumber++
  }

  // private #serialNumber = SuperTruck.generateSerialNumber() //! TS complains - #serialNumber is private
  // using protected will only 'protect' for ts - #var/method will still be private after compiled
  #serialNumber = SuperTruck.#generateSerialNumber()
  // just to fake an api for a new serial number
  static {
    if (!this.#nextSerialNumber) {
      this.#nextSerialNumber = 1
    }
  }

  static #generateChassiNumber(): number {
    return this.#nextChassiNumber++
  }

  //? readonly - generates at start and it is done
  readonly #chassiNumber = SuperTruck.#generateChassiNumber()

  make: string
  model: string
  year: number
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }

  get getSTruckSerialNumber() {
    return this.#serialNumber
  }

  //? Private field presence checks
  // Check if is the same as other instance - similar to instanceOf
  // all intances of SuperTruck can see private data on all other instances
  equals(other: any) {
    if (other && typeof other === 'object' && #serialNumber in other) {
      other
      //       ^?
      return other.#serialNumber === this.#serialNumber
    }
    return false
  }
}

const megaVolvo = new SuperTruck('Volvo', 'Strider', 2025)
// This is private. Not secure, just private
// megaVolvo.#serialNumber //! not acessible
console.log(
  `MegaVolvo details: Model: ${megaVolvo.model} | SN: #${megaVolvo.getSTruckSerialNumber}`
)

//* Parameter properties
// Having too many properties repeating a lot? This helps

class Base {}

class Car2 extends Base {
  foo = console.log('Class field initializer')
  constructor(public make: string) {
    // make here is like this.make = make
    super()
    console.log('Custom constructor stuff')
  }
}

// constructor(
//     public make: string,
//     public model: string,
//     public year: number
//   ) {}
//? notice that by adding public ts already creates the js part.
class SuperCar {
  #engineIsOn = false
  constructor(public make: string, public model: string, public year: number) {
    console.log(make, model, year)
  }

  get details(): string {
    return `Super car ${this.model}, by ${this.make} | ${this.year}`
  }

  toggleEngine(): string {
    this.#engineIsOn = !this.#engineIsOn
    return `${this.model} engine is ${this.#engineIsOn ? 'on' : 'off'}`
  }
}

const agera = new SuperCar('Koenigsegg', 'Agera', 2018)

console.log(agera.details)
console.log(agera.toggleEngine())
console.log(agera.toggleEngine())

//? override

class SportCar extends SuperCar {
  // override toggleEngines() { //? Can prevent the typo here because checks the base class
  //   return 'No engine'
  // }

  override toggleEngine() {
    // Will warn if noImplicitOverride is true
    return 'Engine not provided'
  }
}

//*tsconfig: noImplicitOverride: true
// This will type check when you are overriding a class method
