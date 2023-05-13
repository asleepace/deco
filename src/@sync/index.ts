
type AsyncMethod = (...args: any[]) => Promise<any>

export function sync(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const targetMethod = descriptor.value as AsyncMethod
  return Object.defineProperty(target, propertyKey, {
    value: async (...args: any[]) => {
      return await targetMethod(...args)
    }
  })
}