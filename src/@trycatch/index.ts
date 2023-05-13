/**
 * Use this decorator to mute temporarily silence console.log calls.
 */
export function tryCatch(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const targetMethod = descriptor.value
  return Object.defineProperty(target, propertyKey, {
    value: (...args: any[]) => {
      try {
        return targetMethod(...args)
      } catch (error) {
        console.warn(`@tryCatch caught an error on method ${propertyKey}: ${error}`)
      }
    },
  })
}
