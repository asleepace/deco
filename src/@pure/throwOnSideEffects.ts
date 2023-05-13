/**
 * Use this function to detect side-effects on functions with the @pure decorator.
 */
export function throwOnSidEffects(targetMethod: any) {
  return targetMethod.bind(new Proxy({}, {
    get(target, propertyKey, receiver) {
      console.warn('@pure get', { target, propertyKey, receiver })
      throw new Error(`@pure side effect detected (get) property: ${String(propertyKey)}`)
    },
    set(target, propertyKey, value, receiver) {
      console.warn('@pure set', { target, propertyKey, receiver })
      throw new Error(`@pure side effect detected (set) value ${value} on property: ${String(propertyKey)}`)
    },
    apply(target, thisArg, argumentsList) {
      console.warn('@pure apply', { target, thisArg, argumentsList })
      throw new Error(`@pure side effect detected (apply) ${target} on: ${thisArg}`)
    },
    deleteProperty(target, propertyKey) {
      console.warn('@pure deleteProperty', { target, propertyKey })
      throw new Error(`@pure side effect detected (deleteProperty) ${target} on: ${String(propertyKey)}`)
    },
    defineProperty(target, propertyKey, descriptor) {
      console.warn('@pure defineProperty', { target, propertyKey, descriptor })
      throw new Error(`@pure side effect detected (defineProperty) ${target} on: ${String(propertyKey)}`)
    },
    getOwnPropertyDescriptor(target, propertyKey) {
      console.warn('@pure getOwnPropertyDescriptor', { target, propertyKey })
      throw new Error(`@pure side effect detected (getOwnPropertyDescriptor) ${target} on: ${String(propertyKey)}`)
    },
    getPrototypeOf(target) {
      console.warn('@pure getPrototypeOf', { target })
      throw new Error(`@pure side effect detected (getPrototypeOf) ${target}`)
    },
    has(target, propertyKey) {
      console.warn('@pure has', { target, propertyKey })
      throw new Error(`@pure side effect detected (has) ${target} on: ${String(propertyKey)}`)
    },
    isExtensible(target) {
      console.warn('@pure isExtensible', { target })
      throw new Error(`@pure side effect detected (isExtensible) ${target}`)
    },
    ownKeys(target) {
      console.warn('@pure ownKeys', { target })
      throw new Error(`@pure side effect detected (ownKeys) ${target}`)
    },
    preventExtensions(target) {
      console.warn('@pure preventExtensions', { target })
      throw new Error(`@pure side effect detected (preventExtensions) ${target}`)
    },
    setPrototypeOf(target, prototype) {
      console.warn('@pure setPrototypeOf', { target, prototype })
      throw new Error(`@pure side effect detected (setPrototypeOf) ${target}`)
    }
  }))
}
