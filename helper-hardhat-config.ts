const { ethers } = require("hardhat")

const networkConfig = {
  31337: {
    name: "hardhat",
    callbackGasLimit: "500000",
    interval: "30",
  },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = { networkConfig, developmentChains }
