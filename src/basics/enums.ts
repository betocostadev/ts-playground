//* TypeScript Classes
//? And why not to use them
// Nice video with more information: https://youtu.be/jjMbPt_H3RQ?si=EGYSL1JKY_iursmt

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

enum UserStatuses {
  ACTIVE = 1,
  INACTIVE = 2,
  REMOVED = 3,
}

enum Colors {
  RED,
  GREEN,
}

const enum Porsche {
  CARRERA,
  GT3,
}

const USER_COLORS = {
  RED: 0,
  BLUE: 1,
}

console.log(`
A POJO - Plain old javascript object:
  const USER_COLORS = {
    RED: 0,
    BLUE: 1,
  }
`)
console.log(USER_COLORS)
