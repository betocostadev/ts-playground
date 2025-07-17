//* TypeScript Classes and Type Guards
// Lots of contents from here: https://www.typescript-training.com/course/fundamentals-v4/12-type-guards/

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
  private static nextSerialNumber = 0
  //? on member fields
  private static generateSerialNumber() {
    return this.nextSerialNumber++
  }
  private _serialNumber = SmallCar.generateSerialNumber()
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
    return `Car ${this.model} by ${this.make} has the serial number: ${this.serialNumber}`
  }
}

const smallNissan = new SmallCar('Nissan', 'Altima', 2020)
// smallNissan.serialNumber //! not acessible
console.log(smallNissan.getSmallCarData()) // 0 - fine

const smallSmart = new SmallCar('Smart', 'Picollino', 2021)
console.log(smallSmart.getSmallCarData()) // 1 - fine

//* JS private #fields

//? member fields
// #serialNumber = Car.generateSerialNumber()
// c.#serialNumber
