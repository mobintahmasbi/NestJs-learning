let ratePerSecond: number = 10;
const listof: Map<string, number> = new Map();
let rightNow: number = 0;
let kill: boolean = false

@declareRate(12, 10)
class TestRateLimiter {
  @RateLimiter(10)
  testLimitation() {
    return "hi " + ratePerSecond;
  }
}

function declareRate(rateLimit: number, howlong: number) {
  return (target: Function) => {
    listof.set("rateLimiter", rateLimit);
    listof.set("time", howlong * 1000);
    ratePerSecond = rateLimit;
  };
}
function RateLimiter(limit: number) {
  return (
    target: TestRateLimiter,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (ratePerSecond === listof.get("rateLimiter")) {
        rightNow = Date.now();
      }
      let diffrence: number = Date.now() - rightNow;
      if (ratePerSecond !== 0 && diffrence < listof.get("time") && !kill) {
        ratePerSecond--;
        return originalMethod.apply(this, args);
      } else if (ratePerSecond === 0 && diffrence <= listof.get("time") || kill) {
        kill = true
        return `You have violated our policy regarding the number of requests in a certain period 
                of time and therefore your access to our resources has been terminated`;
      } else if (ratePerSecond === 0 && diffrence >= listof.get("time") && !kill){
        ratePerSecond = listof.get("rateLimiter")
        return "passed time"
      } else if (ratePerSecond !== 0 && diffrence >= listof.get("time") && !kill){
        ratePerSecond = listof.get("rateLimiter")
        return "passed time"
      }
      return "something went wrong"
    };

    return descriptor;
  };
}

const testRateLimiterclass = new TestRateLimiter();
setInterval(() => {
    console.log(testRateLimiterclass.testLimitation());
}, 500)
