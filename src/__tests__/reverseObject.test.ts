import reverseObject, { createNestedObj, objectToArray, makeKeyPath, getValue, ObjectItem } from '../reverseObject'

const inputObj = {
  hired: {
    be: {
      to: {
        deserve: 'I',
      },
    },
  },
}

const expectOutput = {
  I: {
    deserve: {
      to: {
        be: 'hired',
      },
    },
  },
}

const expectObjectToArrayReturn = [
  { key: 'hired', value: null },
  { key: 'be', value: null },
  { key: 'to', value: null },
  { key: 'deserve', value: 'I' },
]

const expectMakeKeyPathReturn = ['I', 'deserve', 'to', 'be']

it('MakeKeyPath function return must to equal expectMakeKeyPathReturn', () => {
  const loopArray: ObjectItem[] = []
  objectToArray(loopArray, inputObj)
  const keyPath = makeKeyPath(loopArray)

  expect(keyPath).toEqual(expectMakeKeyPathReturn)
})

it('GetValue function return must to equal LastValue', () => {
  const expectLastValue = 'hired'
  const loopArray: ObjectItem[] = []
  objectToArray(loopArray, inputObj)
  const lastValue = getValue(loopArray)

  expect(lastValue).toBe(expectLastValue)
})

it('ObjectToArray function return must to equal expectObjectToArrayReturn', () => {
  const loopArray: ObjectItem[] = []
  objectToArray(loopArray, inputObj)
  expect(loopArray).toEqual(expectObjectToArrayReturn)
})

it('CreateNestedObj function return must to equal expectOutput', () => {
  const loopArray: ObjectItem[] = []
  objectToArray(loopArray, inputObj)

  const finalObj = {}
  const keyPath = makeKeyPath(loopArray)
  const lastValue = getValue(loopArray)
  createNestedObj(finalObj, keyPath, lastValue)

  expect(finalObj).toEqual(expectOutput)
})

it('ReversObject function return must to output expectOutput', () => {
  const output = reverseObject(inputObj)
  expect(output).toEqual(expectOutput)
})
