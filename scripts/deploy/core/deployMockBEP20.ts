import hre, { ethers } from "hardhat";
import addresses from "../../../utils/addressUtils";
import { MockBEP20__factory } from "../../../typechain-types";

export async function deployMockBEP20(symbol: string, totalSupply: string) {
  const [owner] = await ethers.getSigners();

  const MockBEP20Token = (await ethers.getContractFactory(
    "MockBEP20",
    owner
  )) as MockBEP20__factory;

  const mockBEP20Token = await MockBEP20Token.deploy(
    `${symbol} Token}`,
    symbol,
    ethers.parseEther(totalSupply)
  );

  await mockBEP20Token.waitForDeployment();

  const tokenAddr = await mockBEP20Token.getAddress();

  console.log(`${symbol} deployed address:`, tokenAddr);

  await addresses.saveAddresses(hre.network.name, {
    [`${symbol}`]: tokenAddr,
  });

  return mockBEP20Token;
}
