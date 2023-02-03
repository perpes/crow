import sjcl from "sjcl"

interface Io {
  input: number
  output: number
}

const sampleIOList: Io = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
}

const encrypt = (_pwd, _ioList) => {
  const jsonedIoList = JSON.stringify(_ioList)
  let encrypted = sjcl.json.encrypt(_pwd, jsonedIoList)
  return encrypted
}

const decrypt = (_pwd, _encrypted) => {
  let decrypted = sjcl.json.decrypt("pwd", _encrypted)
  return decrypted
}

//const encrypted = encrypt("pwd", sampleIOList)
//const decrypted = decrypt("pwd", encrypted)

export { Io, encrypt, decrypt }
