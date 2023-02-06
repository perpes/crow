//import * as IPFS from "ipfs"
import { create } from "ipfs-http-client"

const ipfsTry = async () => {
  const client = create("http://localhost:5001")
  const { cid } = await client.add("immilie")
  console.log(cid)
}

//ipfsTry()

const decoder = new TextDecoder()
let data = ""
const ipfsUp = async (_cid) => {
  const client = create("http://localhost:5001")
  for await (const chunk of client.cat(_cid)) {
    data += decoder.decode(chunk)
  }
  console.log(data)
  // return content
}

ipfsUp("QmQLCRtJ9FGEkvAbjDzGGvU4TjrcA9gvQUBymfuCgzFtu2")
