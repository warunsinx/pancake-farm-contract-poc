import hre, { ethers } from "hardhat";
import addresses from "../../../utils/addressUtils";
import { MasterChef__factory } from "../../../typechain-types";

export async function deployMasterChef(
  cakeAddr: string,
  syrupAddr: string,
  devAddr: string,
  cakePerBlock: string,
  startBlock: string
) {
  const [owner] = await ethers.getSigners();

  const MasterChef = (await ethers.getContractFactory(
    "MasterChef",
    owner
  )) as MasterChef__factory;

  const masterChef = await MasterChef.deploy(
    cakeAddr,
    syrupAddr,
    devAddr,
    ethers.parseEther(cakePerBlock),
    startBlock
  );

  await masterChef.waitForDeployment();

  const masterChefAddr = await masterChef.getAddress();

  console.log("MasterChef deployed address:", masterChefAddr);

  await addresses.saveAddresses(hre.network.name, {
    MasterChef: masterChefAddr,
  });
}
