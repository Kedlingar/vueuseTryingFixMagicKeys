import { describe, expect, it } from 'vitest'
import { ref as deepRef, shallowRef } from 'vue'
import { usePrevious } from './index'

describe('usePrevious', () => {
  it('works for literals', () => {
    const target = shallowRef(1)
    const previous = usePrevious(target)

    expect(previous.value).toBe(undefined)

    target.value = 2

    expect(previous.value).toBe(1)

    target.value = 10

    expect(previous.value).toBe(2)
  })

  it('works with initial value', () => {
    const target = shallowRef('Hello')
    const previous = usePrevious(() => target.value, 'initial')

    expect(previous.value).toBe('initial')

    target.value = 'World'

    expect(previous.value).toBe('Hello')
  })

  it('works with object', () => {
    const target = deepRef<any>({ a: 1 })
    const previous = usePrevious(target)

    expect(previous.value).toEqual(undefined)

    target.value.a = 2

    // nested reactiveness is not triggered
    expect(previous.value).toEqual(undefined)

    target.value = { b: 2 }

    expect(previous.value).toEqual({ a: 2 })
  })
})
