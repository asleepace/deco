/**
 * Use this decorator to mute temporarily silence console.log calls.
 */
export function mute() {
  const placehoder = console.log 
  console.log = () => {}
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log = placehoder
  }
}
