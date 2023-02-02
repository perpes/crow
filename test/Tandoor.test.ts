import { expect } from "chai"
import { ethers } from "hardhat"
import { Crow, Crow__factory } from "../typechain-types"
import { ProblemSolver, ProblemSolver__factory } from "../typechain-types"

describe("Crow", function () {
  let crow: Crow
  let crowFactory: Crow__factory
  beforeEach(async function () {
    crowFactory = (await ethers.getContractFactory("Crow")) as Crow__factory
    crow = await crowFactory.deploy()
  })

  describe("setProblem", function () {
    const reward = ethers.utils.parseUnits("0.1", "ether")
    const inputs = [1, 2, 3]
    const outputs = [4, 5, 6]
    it("pushes the problem to the problems array", async function () {
      await crow.setProblem(reward, inputs, outputs)
      const expectedProblem = await crow.problems(0)
      expect(expectedProblem["id"].toString()).to.equal("0")
      expect(expectedProblem["reward"].toString()).to.equal(reward.toString())
    })
    it("emits ProblemEvent by setting multiple problems", async function () {
      await expect(crow.setProblem(reward, inputs, outputs))
        .to.emit(crow, "ProblemEvent")
        .withArgs(0, reward)
      await expect(crow.setProblem(reward, inputs, outputs))
        .to.emit(crow, "ProblemEvent")
        .withArgs(1, reward)
    })
  })
  describe("getProblem", function () {
    const reward = ethers.utils.parseUnits("0.1", "ether")
    const inputs = [1, 2, 3]
    const outputs = [4, 5, 6]
    beforeEach(async function () {
      await crow.setProblem(reward, inputs, outputs)
    })
    it("gets the problem using ID", async function () {
      const [ins, outs] = await crow.getProblem(0)
      const insArr = [parseInt(ins[0]), parseInt(ins[1]), parseInt(ins[2])]
      const outsArr = [parseInt(outs[0]), parseInt(outs[1]), parseInt(outs[2])]
      expect(JSON.stringify(inputs)).to.equal(JSON.stringify(insArr))
      expect(JSON.stringify(outputs)).to.equal(JSON.stringify(outsArr))
    })
  })

  describe("ProblemSolver", function () {
    let problemSolver: ProblemSolver
    let problemSolverFactory: ProblemSolver__factory
    const reward = ethers.utils.parseUnits("0.1", "ether")
    const inputs = [1, 2, 3]
    const outputs = [4, 5, 6]
    beforeEach(async function () {
      await crow.setProblem(reward, inputs, outputs)
      problemSolverFactory = (await ethers.getContractFactory(
        "ProblemSolver"
      )) as ProblemSolver__factory
      problemSolver = await problemSolverFactory.deploy()
    })
    describe("problemInputs", function () {
      it("calls getProblemInputs from Crow and gets inputs", async function () {
        //const ins = await crow.getProblemInputs(0)
        const ins = await problemSolver.getSolverInputs(0)
        console.log(ins)
      })
    })
  })
})
