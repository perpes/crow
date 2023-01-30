import { expect } from "chai"
import { ethers } from "hardhat"
import { Tandoor, Tandoor__factory } from "../typechain-types"

describe("Tandoor", function () {
  let tandoor: Tandoor
  let tandoorFactory: Tandoor__factory
  beforeEach(async () => {
    tandoorFactory = (await ethers.getContractFactory("Tandoor")) as Tandoor__factory
    tandoor = await tandoorFactory.deploy()
  })
  describe("setIO, getOutput", function () {
    it("maps input to output", async function () {
      const input = 2
      const output = 4
      await tandoor.setIO(input, output)
      const outputFromInput = await tandoor.getOutput(input)
      expect(outputFromInput).to.equal(output)
    })
  })
  /*
  it("maps a pair of input and output", async function () {
    
    //let currentValue = await tandoor.retrieve()
    //expect(currentValue).to.equal(0)
  })
  it("should update when we call store", async function () {
    let expectedValue = 7
    let txnResponse = await tandoor.store(expectedValue)
    let txnReceipt = await txnResponse.wait()
    let currentValue = await tandoor.retrieve()
    expect(currentValue).to.equal(expectedValue)
  })*/
})
