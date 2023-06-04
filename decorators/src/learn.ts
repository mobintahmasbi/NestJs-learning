const map: Map<string, any> = new Map();

@LogContext('AAAAAAA')
class ADecorator {
  @Logger()
  sayHi(name: string) {
    console.log('Hi', name)
  }

  @Logger()
  logSomething(text: string) {
    console.log(text);
  }
}

function LogContext(context: string) {
  return (target: Function) => {
    map.set(target.name, {
      context
    });
  }
}

function Logger() {
  return (
    target: ADecorator,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    // console.log('target', target);
    // console.log('propertyKey', propertyKey);
    // console.log('descriptor', descriptor);
    // console.log('decriptor value', descriptor.value);
    
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
    //   console.log('args', args)
    //   console.log('target constructor name', target.constructor.name);
      const { context } = map.get(target.constructor.name);
    //   console.info('context ', context)
    //   console.log('this', this);
    //   console.log('args', args)  
      return originalMethod.apply(this, args);

    }

    return descriptor;
  }
}

const a = new ADecorator();
a.sayHi('Mostafa');

// target {}
// propertyKey sayHi
// descriptor {
//   value: [Function: sayHi],
//   writable: true,
//   enumerable: false,
//   configurable: true
// }
// decriptor value [Function: sayHi]
// target {}
// propertyKey logSomething
// descriptor {
//   value: [Function: logSomething],
//   writable: true,
//   enumerable: false,
//   configurable: true
// }
// decriptor value [Function: logSomething]
// args [ 'Mostafa' ]
// target constructor name ADecorator
// context  AAAAAAA
// this ADecorator {}
// args [ 'Mostafa' ]
// Hi Mostafa





