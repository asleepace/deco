/** allow testing for any thrown errors */
export function shouldThrowError(func: Function): boolean {
  try {
    func()
    return false
  } catch (error) {
    return true
  }
}
/** allow testing for any thrown from an async function errors */
export async function shouldAwaitError(func: Function): Promise<boolean> {
  try {
    await func()
    return false
  } catch (error) {
    return true
  }
}