import { Io, encrypt, decrypt } from "./crypto"
import { Web3Storage, getFilesFromPath, File } from "web3.storage"

const sampleIOList: Io = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
}

const encrypted = encrypt("pwd", sampleIOList)
const decrypted = decrypt("pwd", encrypted)

const token = process.env.WEB3STORAGE_TOKEN
const client = new Web3Storage({ token })

const setFiles = () => {
  const obj = { hello: "woddrld" }
  const buffer = Buffer.from(JSON.stringify(obj))
  const files = [new File([buffer], "hello.json")]
  return files
  //const files = await getFilesFromPath("./scripts/files-tmp")
  //console.log(files)
  //await client.put(files)
  //console.log(cid)
}

const getFiles = async () => {
  const cid = "QmZnjog5L9DheF5egGVTuCxcu7csU858eupUkpHVSZ3Yuq"
  const res = await client.get(cid)
  const files = await res.files()

  for (const file of files) {
    console.log(`cid: ${file.cid}`)
    console.log(`name: ${file.name}`)
    console.log(`size: ${file.size} bytes`)
  }
}

async function storeFiles(files) {
  const cid = await client.put(files, { onRootCidReady, onStoredChunk })
  console.log("stored files with cid:", cid)
  return cid
}

const onRootCidReady = (cid) => {
  console.log("uploading files with cid:", cid)
}

const onStoredChunk = (size) => {
  uploaded += size
  const pct = totalSize / uploaded
  console.log(`Uploading... ${pct.toFixed(2)}% complete`)
}

const files = setFiles()
storeFiles(files)
//getFiles()
