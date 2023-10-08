import hre, { ethers } from "hardhat";
import addresses from "../../../utils/addressUtils";
import { CakeToken__factory } from "../../../typechain-types";

export async function deployCakeToken() {
  const [owner] = await ethers.getSigners();

  const CakeToken = (await ethers.getContractFactory(
    "CakeToken",
    owner
  )) as CakeToken__factory;

  const cakeToken = await CakeToken.deploy();

  await cakeToken.waitForDeployment();

  const tokenAddr = await cakeToken.getAddress();

  console.log("CakeToken deployed address:", tokenAddr);

  await addresses.saveAddresses(hre.network.name, {
    CAKE: tokenAddr,
  });
}
