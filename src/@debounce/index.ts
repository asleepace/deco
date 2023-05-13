export function debounce(interval: number) {

  let lastTimeCalled = +new Date()

  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const targetMethod = descriptor.value
    const currentTime = +new Date()

    return Object.defineProperty(target, propertyKey, {
      value: (...args: any[]) => {
        if (currentTime - lastTimeCalled > interval) {
          lastTimeCalled = currentTime
          return targetMethod(...args)
        }
      }
    })
  }
}