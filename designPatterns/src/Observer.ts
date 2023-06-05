interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

interface Observer {
  update(temperature: number, humidity: number): void;
}

class WeatherStation implements Subject {
  private observers: Observer[] = [];
  private temperature: number;
  private humidity: number;

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity);
    }
  }

  // Method to update the weather conditions
  setWeatherData(temperature: number, humidity: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.notify();
  }
}

class WeatherDisplay implements Observer {
  update(temperature: number, humidity: number): void {
    console.log(
      `Current weather: Temperature - ${temperature}°C, Humidity - ${humidity}%`
    );
  }
}

// Create instances of the subject and observers
const weatherStation = new WeatherStation();
const display1 = new WeatherDisplay();
const display2 = new WeatherDisplay();

// Attach the observers to the subject
weatherStation.attach(display1);
weatherStation.attach(display2);

// Update the weather conditions
weatherStation.setWeatherData(25, 60);
// Output:
// Current weather: Temperature - 25°C, Humidity - 60%
// Current weather: Temperature - 25°C, Humidity - 60%

// Detach one observer
weatherStation.detach(display1);

// Update the weather conditions again
weatherStation.setWeatherData(28, 55);
// Output:
// Current weather: Temperature - 28°C, Humidity - 55%
