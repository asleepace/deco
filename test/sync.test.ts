import { sync } from '../src/index'

class MockAPI {
  @sync async get() {
    return { data: 'hello' };
  }
}
