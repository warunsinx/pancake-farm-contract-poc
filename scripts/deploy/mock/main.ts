import { ethers } from "hardhat";
import { deployMockBEP20 } from "./deployMockBEP20";

// npx hardhat run scripts/deploy/mock/main.ts --network bkc_test

const main = async () => {
  const [, alice] = await ethers.getSigners();

  const lp1 = await deployMockBEP20("LP1", "1000000");
  await lp1
    .transfer(alice.address, ethers.parseEther("1000"))
    .then((tx) => tx.wait());
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
