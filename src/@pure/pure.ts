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
  const targetMethod = descriptor.value

  // overrides the methods "this" with a proxy that will throw if a mutation is made.
  return Object.defineProperty(target, propertyKey, {
    value: throwOnSidEffects(targetMethod),
  })
};