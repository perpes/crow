import { task } from "hardhat/config"

export default task("block-number", "prints the current block number").setAction(
  async (_taskArgs, hre) => {
    await hre.ethers.provider.getBlockNumber().then((blockNumber: number) => {
      console.log(`[OK] current block number: ${blockNumber}`)
    })
  }
)
