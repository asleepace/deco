/**
 * Thrown when a side effect was detected on a @pure method.
 */
export class SideEffectError extends Error {
  constructor(type: string, method: Symbol | string) {
    super(`@pure side effect detected (${type}): ${method.toString()}`)
    this.name = 'PureSideEffectError'
  }
}


/**
 * Use this function to detect side-effects on functions with the @pure decorator.
 */
export function throwOnSidEffects(targetMethod: any) {

  return targetMethod.bind(new Proxy({}, {
    get(target, propertyKey, receiver) {
      throw new SideEffectError('get', propertyKey)
    },
    set(target, propertyKey, value, receiver) {
      throw new SideEffectError('set', propertyKey)
    },
    apply(target, thisArg, argumentsList) {
      throw new SideEffectError('apply', targetMethod)
    },
    deleteProperty(target, propertyKey) {
      throw new SideEffectError('deleteProperty', propertyKey)
    },
    defineProperty(target, propertyKey, descriptor) {
      throw new SideEffectError('defineProperty', propertyKey)
    },
    getOwnPropertyDescriptor(target, propertyKey) {
      throw new SideEffectError('getOwnPropertyDescriptor', propertyKey)
    },
    getPrototypeOf(target) {
      throw new SideEffectError('getPrototypeOf', String(target))
    },
    has(target, propertyKey) {
      throw new SideEffectError('has', propertyKey)
    },
    isExtensible(target) {
      throw new SideEffectError('isExtensible', String(target))
    },
    ownKeys(target) {
      throw new SideEffectError('ownKeys', String(target))
    },
    preventExtensions(target) {
      throw new SideEffectError('preventExtensions', String(target))
    },
    setPrototypeOf(target, prototype) {
      throw new SideEffectError('setPrototypeOf', String(target))
    }
  }))
}
