import sjcl from "sjcl"

interface Io {
  input: number
  output: number
}

const SAMPLE_IO: Io = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
}

const encrypt = (_pwd = "pwd", _ioList) => {
  const jsonedIoList = JSON.stringify(_ioList)
  let encrypted = sjcl.json.encrypt(_pwd, jsonedIoList)
  return encrypted
}

const decrypt = (_pwd = "pwd", _encrypted) => {
  let decrypted = sjcl.json.decrypt(_pwd, _encrypted)
  return decrypted
}

//const encrypted = encrypt("pwd", sampleIOList)
//const decrypted = decrypt("pwd", encrypted)

export { Io, encrypt, decrypt, SAMPLE_IO }
