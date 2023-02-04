import { expect } from "chai"
import { ethers } from "hardhat"
import { Crow, Crow__factory } from "../typechain-types"

const utf8Encode = new TextEncoder()
const utf8Decode = new TextDecoder()

describe("Crow", () => {
  let crow: Crow
  let crowFactory: Crow__factory
  let signers, deployer
  const provider = ethers.provider

  beforeEach(async () => {
    crowFactory = (await ethers.getContractFactory("Crow")) as Crow__factory
    crow = await crowFactory.deploy()
    signers = await ethers.getSigners()
    deployer = signers[0].address
  })

  describe("constructor", () => {
    it("sets the owner", async function () {
      const owner = await crow.owner()
      expect(deployer).to.equal(owner)
    })
  })

  describe("setProblem", () => {
    const reward = ethers.utils.parseUnits("0.1", "ether")
    const reward2 = ethers.utils.parseUnits("0.2", "ether")
    const cid = "bafybeiabvhsiulhmki7zaedgvanbmuizv3kky4y4ucs3cwmi7omr4mgoqa"
    const bytesCid = utf8Encode.encode(cid)

    it("pushes the problem to the problems array", async () => {
      await crow.setProblem(reward, bytesCid, { value: reward })
      const expectedProblem = await crow.problems(0)
      expect(expectedProblem["id"].toString()).to.equal("0")
      expect(expectedProblem["reward"].toString()).to.equal(reward.toString())
    })

    it("emits ProblemEvent by setting multiple problems", async () => {
      const cid1 = "bafybeiabvhsiulhmki7zaedgvanbmuizv3kky4y4ucs3cwmi7omr4mgoqa"
      const cid2 = "fjaicuvjjgdsoaihmki7zaedgvanbmuizv3kky4y4ucs3cwmi7omr4mgoqa"
      const bytesCid1 = utf8Encode.encode(cid1)
      const bytesCid2 = utf8Encode.encode(cid2)
      await expect(crow.setProblem(reward, bytesCid1, { value: reward }))
        .to.emit(crow, "ProblemSet")
        .withArgs(0, reward)
      await expect(crow.setProblem(reward2, bytesCid2, { value: reward2 }))
        .to.emit(crow, "ProblemSet")
        .withArgs(1, reward2)
    })

    it("reverts if reward is not provided", async () => {
      await expect(crow.setProblem(reward, bytesCid)).to.be.revertedWith(
        "[ERR] Reward not equal to msg.value"
      )
    })
  })

  describe("getProblem", () => {
    const reward = ethers.utils.parseUnits("0.1", "ether")
    const cid = "bafybeiabvhsiulhmki7zaedgvanbmuizv3kky4y4ucs3cwmi7omr4mgoqa"
    const cidHex = ethers.utils.arrayify(utf8Encode.encode(cid))
    let retProblem

    beforeEach(async () => {
      await crow.setProblem(reward, cidHex, { value: reward })
      retProblem = await crow.getProblem(0)
    })

    it("gets the problem CID", async () => {
      const retCid = retProblem[1]
      const arrRetCid = ethers.utils.arrayify(retCid)
      const hexRetCid = utf8Decode.decode(arrRetCid)
      expect(cid).to.equal(hexRetCid)
    })

    it("gets the problem reward", async () => {
      const retReward = retProblem[0].toString()
      expect(reward).to.equal(retReward)
    })

    it("gets the problem setter's address", async () => {
      const retSetterAddr = retProblem[2]
      expect(retSetterAddr).to.equal(deployer)
    })

    it("gets the problems solved status", async () => {
      const retSolvedStatus = retProblem[3]
      expect(retSolvedStatus).to.equal(false)
    })
  })

  describe("problemSolved", () => {
    const reward = ethers.utils.parseUnits("0.1", "ether")
    const cid = "bafybeiabvhsiulhmki7zaedgvanbmuizv3kky4y4ucs3cwmi7omr4mgoqa"
    const cidHex = ethers.utils.arrayify(utf8Encode.encode(cid))
    let retProblem
    let problemSetter, problemSolver, connProblemSetter

    beforeEach(async () => {
      connProblemSetter = crow.connect(signers[1])
      await connProblemSetter.setProblem(reward, cidHex, { value: reward })
      retProblem = await crow.getProblem(0)
      problemSetter = signers[1].address
      problemSolver = signers[2].address
    })

    it("emits ProblemSolved event", async () => {
      await expect(crow.problemSolved(0, problemSolver)).to.emit(crow, "ProblemSolved")
    })

    it("sets problem's solved status to true", async () => {
      await crow.problemSolved(0, problemSolver)
      const finalRetProblem = await crow.getProblem(0)
      expect(retProblem[3]).to.equal(false)
      expect(finalRetProblem[3]).to.equal(true)
    })

    it("transfers the reward to the problem solver address", async () => {
      const problemSolverInitBal = await provider.getBalance(problemSolver)
      await crow.problemSolved(0, problemSolver)
      const problemSolverFinalBal = await provider.getBalance(problemSolver)
      expect(problemSolverFinalBal).to.equal(
        problemSolverInitBal.add(ethers.utils.parseUnits("0.1", "ether"))
      )
    })

    it("reverts if notOwner tries to push problemSolved function", async () => {
      await expect(connProblemSetter.problemSolved(0, problemSolver)).to.be.reverted
    })
  })
})
