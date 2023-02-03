import { Io, encrypt, decrypt } from "./crypto"
import { Web3Storage, getFilesFromPath } from "web3.storage"

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

const storeFiles = async () => {
  const files = await getFilesFromPath("./files-tmp")
  const cid = await client.put(files)
  console.log(cid)
}

storeFiles()
