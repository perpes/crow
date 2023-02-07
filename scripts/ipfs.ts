import { create } from "ipfs-http-client"

let client

const decoder = new TextDecoder()

const setClient = () => {
  client = create("http://localhost:5001")
}

const setIpfs = async (_data) => {
  setClient()
  const { cid } = await client.add(_data)
  //console.log(cid)
  return cid
}

const getIpfs = async (_cid) => {
  let data = ""
  setClient()
  const client = create("http://localhost:5001")

  for await (const chunk of client.cat(_cid)) {
    data += decoder.decode(chunk)
  }
  //console.log(data)
  return data
}

//getIpfs("QmQLCRtJ9FGEkvAbjDzGGvU4TjrcA9gvQUBymfuCgzFtu2")

export { setIpfs, getIpfs }
