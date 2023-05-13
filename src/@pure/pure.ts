import { throwOnSidEffects } from "./throwOnSideEffects"
/**
 * This decorator will throw an error if side effects are detected on a method.
 */
export function pure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // console.log({ propertyKey, descriptor })
  // console.log(Object.getOwnPropertyDescriptor(target, propertyKey))

  // const targetMethod = target[propertyKey]
  // console.log(typeof targetMethod)
  // console.log({ targetMethod })

  // // make sure th
  // if (typeof targetMethod !== 'function') {
  //   throw new Error(`@pure decorator can only be used on methods: ${propertyKey} is not a method.`)
  // }

  // overrides the methods "this" with a proxy that will throw if a mutation is made.
  return Object.defineProperty(target, propertyKey, {
    value: target[propertyKey].bind(new Proxy({}, {
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
  })
};