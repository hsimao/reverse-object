import reverseObject from '../reverseObject'

it('check reversObject function output', () => {
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

  const output = reverseObject(inputObj)

  expect(output).toEqual(expectOutput)
})
