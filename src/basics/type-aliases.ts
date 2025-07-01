// Type Aliases - in a way, like naming a variable
type Amount = {
  currency: string
  value: number
}

function printAmount(amt: Amount) {
  console.log(amt)

  const { currency, value } = amt
  console.log(`${currency} ${value}`)
}

const donation = {
  currency: 'EUR',
  value: 20.0,
  description: 'Donation to dogs care taker',
}

printAmount(donation)

// Inheritance in Type Aliases
// It is not exactly Inheritance, but in a way it works similarly. You can have a type and add another type
// basically inherit from one type and add the second type that you want

type SpecialDate = Date & { getDescription(): string }

const newYearsEve: SpecialDate =
  //                    ^?
  Object.assign(new Date(), {
    getDescription: () => 'Last day of the year',
  })

console.log(newYearsEve.getDescription())

type dateDetails = {
  getDateDescription(): string
  isHoliday: boolean
}

type dateWithEvent = Date & dateDetails

const christmas: dateWithEvent = Object.assign(new Date(), {
  getDateDescription: () => 'Usually on december 25',
  isHoliday: true,
})

console.log(christmas.getDateDescription(), christmas.isHoliday)
