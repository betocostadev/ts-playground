// Union and Intersection Types

type Evens = 2 | 4 | 6 | 8
type oneThroughFive = 1 | 2 | 3 | 4 | 5

// Union = Like OR in JavaScript
type unionOne = Evens | oneThroughFive

// Intersection = Like AND in JavaScript
type intersectOne = Evens & oneThroughFive
