import { throwOnSidEffects } from "./throwOnSideEffects"
/**
 * This decorator will throw an error if side effects are detected on a method.
 */
export function pure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log({ propertyKey, descriptor })
  console.log(Object.getOwnPropertyDescriptor(target, propertyKey))

  const targetMethod = target[propertyKey]
  console.log(typeof targetMethod)
  console.log({ targetMethod })

  if (typeof targetMethod !== 'function') {
    throw new Error(`@pure decorator can only be used on methods: ${propertyKey} is not a method.`)
  }

  return Object.defineProperty(target, propertyKey, {
    value: throwOnSidEffects(targetMethod),
  })
};