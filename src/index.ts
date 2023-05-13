import { pure } from './@pure/pure'
import { mute } from './@mute/mute'
import { Publisher } from './Publisher'
export { pure, mute }


const publisher = new Publisher({ count: 0 })

function createCounter(value: number, setValue = (value: number) => {}) {
  return { value, setValue }
}

const counter1 = createCounter(1)
const counter2 = createCounter(2)
const counter3 = createCounter(3)

publisher.subscribe((value) => {
  counter1.setValue(value.count)
})

publisher.subscribe((value) => {
  counter2.setValue(value.count)
})

publisher.subscribe((value) => {
  counter3.setValue(value.count)
})