export interface ObjectItem {
  key: string
  value?: null | object | string
}

function print(key: string, obj: object): void {
  console.log(`key: ${key}, value: ${(obj as any)[key]}`)
}

export function objectToArray(array: ObjectItem[], obj: Object): void {
  Object.keys(obj).forEach((key: string) => {
    let item: ObjectItem = { key, value: null }
    print(key, obj)
    if (typeof (obj as any)[key] === 'object') {
      array.push(item)
      return objectToArray(array, (obj as any)[key])
    }
    item.value = (obj as any)[key]
    array.push(item)
  })
}

export function createNestedObj(obj: any, keyPath: any[], value: string): void {
  const lastKeyIndex = keyPath.length - 1
  for (var i = 0; i < lastKeyIndex; ++i) {
    const key: string = keyPath[i]
    if (!(key in obj)) {
      ;(obj as any)[key] = {}
    }
    obj = obj[key]
  }
  obj[keyPath[lastKeyIndex]] = value
}

export function makeKeyPath(array: ObjectItem[]): any[] {
  let tempArray: any[] = [...array]
  tempArray = tempArray.reverse().map((item: ObjectItem) => item.key)
  // get last value and put first positon
  tempArray.unshift((array[array.length - 1] as any).value)
  tempArray.pop()
  return tempArray
}

export function getValue(array: ObjectItem[]): string {
  let tempArray: any[] = [...array]
  tempArray = tempArray.reverse().map((item: ObjectItem) => item.key)
  return tempArray.pop()
}

export function reverseObject(input: object): object {
  // 1. object to array
  const loopArray: ObjectItem[] = []
  objectToArray(loopArray, input)

  // 2. array to object
  const finalObj = {}
  const keyPath = makeKeyPath(loopArray)
  const lastValue = getValue(loopArray)
  createNestedObj(finalObj, keyPath, lastValue)
  objectToArray(loopArray, finalObj)

  return finalObj
}

export default reverseObject
