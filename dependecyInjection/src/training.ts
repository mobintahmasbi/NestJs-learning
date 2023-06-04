import { inject, injectable, Container } from "inversify";
import "reflect-metadata";

interface IDriver {
  drive(pointA: string, pointB: string): void;
}

interface IRouteNavigator {
  navigate(pointA: string, pointB: string): void;
}

@injectable()
class Lawyer {
  driver: IDriver;

  constructor(@inject("IDriver") driver: IDriver) {
    this.driver = driver;
  }

  goToCourt() {
    console.log("I am going to court");
    this.driver.drive("Here", "Court House");
  }
}

@injectable()
class Driver implements IDriver {
  navigator: IRouteNavigator;

  constructor(@inject("IRouteNavigator") navigator: IRouteNavigator) {
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

@injectable()
class RouteNavigator implements IRouteNavigator {
  navigate(pointA: string, pointB: string) {
    console.log(`I am navigating from ${pointA} to ${pointB}`);
  }
}

const container = new Container();

container.bind<Lawyer>(Lawyer).to(Lawyer);
container.bind<Driver>("IDriver").to(Driver);
container.bind<IRouteNavigator>("IRouteNavigator").to(RouteNavigator);

const lawyer = container.resolve<Lawyer>(Lawyer);
lawyer.goToCourt();
