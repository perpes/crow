import { Io } from "./crypto"

/*const sampleIOList: Io = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
}*/

const codeCheck = async (_io, _codeFile) => {
  const { addOne } = await import(_codeFile)
  const ioObj = JSON.parse(_io)
  const ioIter = Object.entries(ioObj)
  let match = true
  for (const _io of ioIter) {
    const codeOutput = addOne(parseInt(_io[0]))
    const expectedOutput = _io[1]
    codeOutput != expectedOutput && (match = false)
  }
  return match
}

//codeCheck(sampleIOList, "./tmp/addOne.ts").then((result) => console.log(result))

export { codeCheck }
