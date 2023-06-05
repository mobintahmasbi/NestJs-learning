// Abstract creator class
abstract class CarFactory {
  abstract createCar(): Car;

  // Other methods that use the product objects
  // ...
}

// Product interface
interface Car {
  start(): void;
  stop(): void;
}

// Concrete product class 1
class Sedan implements Car {
  start(): void {
    console.log("Sedan started.");
  }

  stop(): void {
    console.log("Sedan stopped.");
  }
}

// Concrete product class 2
class SUV implements Car {
  start(): void {
    console.log("SUV started.");
  }

  stop(): void {
    console.log("SUV stopped.");
  }
}

// Concrete creator class 1
class SedanFactory extends CarFactory {
  createCar(): Car {
    return new Sedan();
  }
}

// Concrete creator class 2
class SUVFactory extends CarFactory {
  createCar(): Car {
    return new SUV();
  }
}

// Client code
const sedanFactory = new SedanFactory();
const suvFactory = new SUVFactory();

const sedan = sedanFactory.createCar();
const suv = suvFactory.createCar();

sedan.start(); // Output: Sedan started.
suv.start(); // Output: SUV started.
