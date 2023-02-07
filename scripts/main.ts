import { codeCheck } from "./check-code"
import { Io, encrypt, decrypt, SAMPLE_IO } from "./crypto"
import { setIpfs, getIpfs } from "./ipfs"
import { ethers } from "hardhat"

let crow, accounts, signers, setterBal, solverBal

const utf8Encode = new TextEncoder()
const utf8Decode = new TextDecoder()

const main = async () => {
  await initCrow("")
  await getBalances()
  await setProblem("8.88", { 1: 2, 2: 3, 3: 4 })
  await getBalances()
  //await getProblem(0)
  await swap(0, signers[2].address, "./tmp/addOne")
  await getBalances()
}

const initCrow = async (_deployedAddress) => {
  if (_deployedAddress == "") {
    const Crow = await ethers.getContractFactory("Crow")
    crow = await Crow.deploy()
    await crow.deployed()
  } else {
    accounts = await ethers.provider.listAccounts()
    const Crow = await ethers.getContractFactory("Crow")
    crow = await Crow.attach(_deployedAddress)
  }

  signers = await ethers.getSigners()

  console.log("[OK] Initialized Crow")
}

const setProblem = async (_reward, _io) => {
  const encryptedIo = encrypt("pwd", _io)
  const cid = await setIpfs(encryptedIo)
  const connProblemSetter = crow.connect(signers[1])
  _reward = ethers.utils.parseUnits(_reward, "ether")
  const cidArr = ethers.utils.arrayify(utf8Encode.encode(cid))
  await connProblemSetter.setProblem(_reward, cidArr, { value: _reward })
  console.log(`[OK] Problem set with\n\tCID: ${cid.toString()}\n\tReward: ${_reward}`)
}

const getProblem = async (_id) => {
  console.log("[W8] Getting the problem from contract...")
  const retProblem = await crow.getProblem(_id)
  const reward = retProblem[0]
  const cidRaw = retProblem[1]
  const cid = utf8Decode.decode(ethers.utils.arrayify(cidRaw))
  console.log("[OK] Problem received:")
  console.log(
    `\tReward:\t${retProblem[0].toString()}\n\tCID:\t${retProblem[1].toString()}\n\tProblem setter address:\t${
      retProblem[2]
    }\n\tSolved status:\t${retProblem[3]}`
  )
  return cid
}

const swap = async (_problemId, _coderAddress, _codePath) => {
  const cid = await getProblem(_problemId)
  const encryptedIo = await getIpfs(cid)
  const io = decrypt("pwd", encryptedIo)
  const match = await codeCheck(io, _codePath)
  if (match) {
    console.log("[SUCCESS] Code matches the I/O pairs successfully")
    await crow.problemSolved(_problemId, _coderAddress)
    console.log("[OK] Reward transfer completed")
    // TODO: code to be sent to the problem setter (stored on ipfs)
  } else {
    console.log("[FAIL] Code does not match all I/O pairs")
  }
}

const getBalances = async () => {
  const crowBal = await ethers.provider.getBalance(crow.address)
  const setterBal = await ethers.provider.getBalance(signers[1].address)
  const solverBal = await ethers.provider.getBalance(signers[2].address)
  console.log(
    `[OK] Balances:\n\tCrow:\t${crowBal}\n\tProblem setter:\t${setterBal.toString()}\n\tProblem solver:\t${solverBal.toString()}`
  )
}

main()
