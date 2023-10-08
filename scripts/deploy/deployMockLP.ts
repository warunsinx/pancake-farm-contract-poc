import { ethers } from "hardhat";
import { deployMockBEP20 } from "./core/deployMockBEP20";

// npx hardhat run scripts/deploy/deployMockLP.ts --network bkc_test

const main = async () => {
  const [, alice] = await ethers.getSigners();

  const lp1 = await deployMockBEP20("LP1", "1000000");
  await lp1
    .transfer(alice.address, ethers.parseEther("1000"))
    .then((tx) => tx.wait());

  const lp2 = await deployMockBEP20("LP2", "1000000");
  await lp2
    .transfer(alice.address, ethers.parseEther("1000"))
    .then((tx) => tx.wait());

  const lp3 = await deployMockBEP20("LP3", "1000000");
  await lp3
    .transfer(alice.address, ethers.parseEther("1000"))
    .then((tx) => tx.wait());
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
