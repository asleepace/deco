/**
 * Use this function to detect side-effects on functions with the @pure decorator.
 */
export function throwOnSidEffects(targetMethod: any) {
  return targetMethod.bind(new Proxy({}, {
    get(target, propertyKey, receiver) {
      console.warn('get', { target, propertyKey, receiver })
      throw new Error(`@pure side effect detected (get) property: ${String(propertyKey)}`)
    },
    set(target, propertyKey, value, receiver) {
      console.warn('get', { target, propertyKey, receiver })
      throw new Error(`@pure side effect detected (set) value ${value} on property: ${String(propertyKey)}`)
    },
    apply(target, thisArg, argumentsList) {
      console.warn('get', { target, thisArg, argumentsList })
      throw new Error(`@pure side effect detected (apply) ${target} on: ${thisArg}`)
    },
  }))
}
