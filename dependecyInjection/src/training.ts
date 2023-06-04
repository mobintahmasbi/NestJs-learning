import { inject, injectable, Container } from "inversify";

@injectable()
class Lawyer {
  driver: Driver;

  constructor(@inject(Driver) driver: Driver) {
    this.driver = driver;
  }

  goToCourt() {
    console.log("I am going to court");
    this.driver.drive("Here", "Court House");
  }
}

@injectable()
class Driver {
  navigator: RouteNavigator;

  constructor(@inject(RouteNavigator) navigator: RouteNavigator) {
    this.navigator = navigator;
  }

  drive(pointA: string, pointB: string) {
    console.log(`I am driving from ${pointA} to ${pointB}`);
    this.navigator.navigate(pointA, pointB);
  }
}

class SnappDriver extends Driver {
  drive(pointA: string, pointB: string): void {
    console.log(
      `I am a snapp driver, driving from ${pointA} to ${pointB} using Snapp`
    );
    this.navigator.navigate(pointA, pointB);
  }
}

class RouteNavigator {
  navigate(pointA: string, pointB: string) {
    console.log(`I am navigating from ${pointA} to ${pointB}`);
  }
}

const container = new Container();


container.bind<Lawyer>(Lawyer).to(Lawyer);
container.bind<Driver>(Driver).to(Driver);
container.bind<RouteNavigator>(RouteNavigator).to(RouteNavigator);


const lawyer = container.resolve<Lawyer>(Lawyer);
lawyer.goToCourt();
