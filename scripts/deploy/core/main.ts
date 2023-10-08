import hre, { ethers } from "hardhat";
import { deployCakeToken } from "./deployCakeToken";
import { deploySyrupBar } from "./deploySyrup";
import { deployMasterChef } from "./deployMasterChef";

const main = async () => {
  const [owner] = await ethers.getSigners();
  const block = await hre.ethers.provider.getBlock("latest");

  if (!block?.number) {
    throw new Error("Not on a fresh network");
  } else console.log("Block Number: ", block.number);

  const cakeToken = await deployCakeToken();
  const cakeAddr = await cakeToken.getAddress();

  const syrupBar = await deploySyrupBar(cakeAddr);
  const syrupAddr = await syrupBar.getAddress();

  const masterChef = await deployMasterChef(
    cakeAddr,
    syrupAddr,
    owner.address,
    "40",
    (block.number + 100).toString()
  );
  const masterChefAddr = await masterChef.getAddress();

  await cakeToken.transferOwnership(masterChefAddr).then((tx) => tx.wait());
  console.log("CakeToken ownership transferred to MasterChef");

  await syrupBar.transferOwnership(masterChefAddr).then((tx) => tx.wait());
  console.log("SyrupBar ownership transferred to MasterChef");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
