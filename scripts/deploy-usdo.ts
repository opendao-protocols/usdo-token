import hre, { ethers } from "hardhat";
import { readFileSync, writeFileSync } from "fs";

const outputFilePath = `./deployments/usdo.json`;

const INITIAL_SUPPLY = "0";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`>>>>>>>>>>>> Deployer: ${deployer.address} <<<<<<<<<<<<\n`);

  console.log("Started");

  const deployerTxCount = await deployer.getTransactionCount("latest");
  const newContractAddr = ethers.utils.getContractAddress({ from: deployer.address, nonce: deployerTxCount });
  console.log(`USDO will be deployed at ${newContractAddr} with nonce ${deployerTxCount}`)
  
  const USDO = await hre.ethers.getContractFactory("USDO");
  const usdo = await USDO.deploy(INITIAL_SUPPLY);
  await usdo.deployed();
  console.log("USDO deployed to:", usdo.address);
  
  const deployments = JSON.parse(readFileSync(outputFilePath, "utf-8"));
  deployments[hre.network.name] = usdo.address;
  writeFileSync(outputFilePath, JSON.stringify(deployments, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });