import * as IPFS from "ipfs-core"

const ipfstry = async () => {
  const ipfs = await IPFS.create()
  const { cid } = await ipfs.add("fffffffffffffffffffffffffffffffff")
  console.log(cid)
  // QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf
}

ipfstry()
