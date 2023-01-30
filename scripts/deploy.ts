import { ethers, network, run } from "hardhat"

async function main() {
  // to run directly with `node`, call compile manually to make sure everything is compiled:
  // await hre.run('compile')
  const Tandoor = await ethers.getContractFactory("Tandoor")
  console.log("[W8] deploying contract...")
  const tandoor = await Tandoor.deploy()
  await tandoor.deployed()

  // verification on testnet
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("[W8] looking for block confirmations...")
    await tandoor.deployTransaction.wait(6)
    await verify(tandoor.address, [])
  }

  console.log(`[OK] deployed contract address: ${tandoor.address}`)

  // call retrieve() from contract
  //let currentValue = await tandoor.retrieve()
  //console.log(`[OK] current value retrieved: ${currentValue}`)
}

const verify = async (contractAddress: string, args: any[]) => {
  console.log("[W8] verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("[OK] it's already verified")
    } else {
      console.log(e)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
