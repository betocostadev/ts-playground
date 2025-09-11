//* TypeScript Classes
//? And why not to use them
// Nice video with more information: https://youtu.be/jjMbPt_H3RQ?si=EGYSL1JKY_iursmt
// Enums documentation: https://www.typescriptlang.org/docs/handbook/enums.html

// Enums behave a bit unpredictably at run time
//! Problems when seeing the objects
enum LogLevel {
  DEBUG,
  WARNING,
  ERROR,
}

console.log(`
This enum:
  enum LogLevel {
    DEBUG,
    WARNING,
    ERROR,
  }
Translates to:`)

const logValues = Object.values(LogLevel)
console.log(logValues)
//! [ 'DEBUG', 'WARNING', 'ERROR', 0, 1, 2 ]

// From oficial docs (link above)
// enum LogLevel {
//   ERROR,
//   WARN,
//   INFO,
//   DEBUG,
// }

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
// type LogLevelStrings = keyof typeof LogLevel;

// function printImportant(key: LogLevelStrings, message: string) {
//   const num = LogLevel[key];
//   if (num <= LogLevel.WARN) {
//     console.log("Log level key is:", key);
//     console.log("Log level value is:", num);
//     console.log("Log level message is:", message);
//   }
// }
// printImportant("ERROR", "This is a message");

//* Declaring values solves part of it
enum ImageSize {
  SMALL = '200px',
  MEDIUM = '600px',
  LARGE = '1200px',
}

console.log(`
This enum:
  enum ImageSize {
    SMALL = '200px',
    MEDIUM = '600px',
    LARGE = '1200px',
  }
Translates to:`)

const imageSizeValues = Object.values(ImageSize)
console.log(imageSizeValues)
// [ '200px', '600px', '1200px' ]
//? But in a way this defeats the purpose of using enums
//? these things don't get automatically assigned

console.log(`
  Using in a function for display image sizes:
`)

function logImageSizes(message: string, size: ImageSize) {
  console.log(`Message: ${message} | Image size: ${size}`)
}

// logImageSizes('Hey', '200px') //! Not accepted
//? In the line below we are using a type as an argument, this shouldn't be possible.
//? But since at runtime it will be converted, it works - confusing
console.log('Passing image size as a type to the function:')
logImageSizes('Avatar', ImageSize.SMALL) //* Passing a type (enum) as the value is now ok
console.log('Passing image size as an extracted value to the function:')
logImageSizes('Avatar', imageSizeValues[0]) //* Passing a value extracted from the (enum) is also ok

console.log(`
Using const enums like:
  const enum UserStatuses {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    REMOVED = 'REMOVED',
  }
`)

const enum UserStatuses {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REMOVED = 'REMOVED',
}

function getUserStatus(userId: 1 | 2 | 3 | 4, status: UserStatuses) {
  let message = ''
  if (userId === 1 || userId === 2) {
    message = 'enabled in the system'
  } else {
    message = 'disabled in the system'
  }
  console.log(`User status is ${message} | ${status}`)
}

getUserStatus(1, UserStatuses.ACTIVE) //* Will be converted for the string only: ACTIVE
// If it wasn't const enum UserStatuses we would get:
// UserStatuses["ACTIVE"] = "ACTIVE"
//! WARNING
// While this looks better, TS documentation recommends to not do this.
// https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls
// Instead of generating .ts files, it will generate declarations - .d.ts files
// Particularly bad when creating a library

//* A much better solution is to use a POJO - Plain Old JavaScript Object
// Like in the as-const.ts file
console.log(`
Nice solution using POJO | const { key: value } as const
`)

const AVAILABLE_COLORS = {
  RED: 'RED',
  BLUE: 'BLUE',
  GREEN: 'GREEN',
} as const

type ObjectValues<T> = T[keyof T]

type AvailableColors = ObjectValues<typeof AVAILABLE_COLORS>

console.log(`
A POJO - Plain old javascript object:
  const AvailableColors = {
    RED: 'RED',
    BLUE: 'BLUE',
    GREEN: 'GREEN'
  } as const
`)

function logSelectedColor(color: AvailableColors) {
  console.log(color)
}

console.log(`
Calling as:
  logSelectedColor(AVAILABLE_COLORS.BLUE)
  logSelectedColor('RED')
Will be fine in both ways.

Calls output:`)
logSelectedColor(AVAILABLE_COLORS.BLUE) // OK
logSelectedColor('RED') // Also ok

//* It is easier and safe to access objects using 'as const'

console.log(`
Accessing keys is possible using as const by passing the key of the const to get the index.
Something like Object[key] = value
After the const, creating the type like: type ErrorMessages = keyof typeof ERROR_MESSAGES
then getErrorMessage('SERVER_ERROR') will get the key SERVER_ERROR in the const.
ERROR_MESSAGES['SERVER_ERROR']
`)

const ERROR_MESSAGES = {
  NOT_FOUND: 'Page not found',
  SERVER_ERROR: 'There was an error on the server',
} as const

type ErrorMessages = keyof typeof ERROR_MESSAGES

function getErrorMessage(type: ErrorMessages) {
  console.log(`Error: ${ERROR_MESSAGES[type]}`)
}

getErrorMessage('SERVER_ERROR') //* Auto complete works
