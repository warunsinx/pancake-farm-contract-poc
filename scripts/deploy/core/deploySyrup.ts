import hre, { ethers } from "hardhat";
import addresses from "../../../utils/addressUtils";
import { SyrupBar__factory } from "../../../typechain-types";

export async function deploySyrupBar(cakeAddr: string) {
  const [owner] = await ethers.getSigners();

  const SyrupBar = (await ethers.getContractFactory(
    "SyrupBar",
    owner
  )) as SyrupBar__factory;

  const syrupBar = await SyrupBar.deploy(cakeAddr);

  await syrupBar.waitForDeployment();

  const syrupAddr = await syrupBar.getAddress();

  console.log("SyrupBar deployed address:", syrupAddr);

  await addresses.saveAddresses(hre.network.name, {
    SyrupBar: syrupAddr,
  });

  return syrupBar;
}
