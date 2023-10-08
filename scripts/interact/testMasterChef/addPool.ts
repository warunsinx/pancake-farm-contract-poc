import hre, { ethers } from "hardhat";
import { MasterChef__factory } from "../../../typechain-types";
import addressUtils from "../../../utils/addressUtils";

// npx hardhat run scripts/interact/testMasterChef/addPool.ts --network bkc_test

const main = async () => {
  const [owner] = await ethers.getSigners();
  const addressList = await addressUtils.getAddressList(hre.network.name);

  const masterChef = MasterChef__factory.connect(
    addressList["MasterChef"],
    owner
  );

  await masterChef
    .add(ethers.parseEther("2000"), addressList["LP1"], true)
    .then((tx) => tx.wait());

  await masterChef
    .add(ethers.parseEther("1000"), addressList["LP2"], true)
    .then((tx) => tx.wait());

  await masterChef
    .add(ethers.parseEther("500"), addressList["LP3"], true)
    .then((tx) => tx.wait());

  await masterChef
    .add(ethers.parseEther("500"), addressList["LP3"], true)
    .then((tx) => tx.wait());
  await masterChef
    .add(ethers.parseEther("500"), addressList["LP3"], true)
    .then((tx) => tx.wait());
  await masterChef
    .add(ethers.parseEther("500"), addressList["LP3"], true)
    .then((tx) => tx.wait());
  await masterChef
    .add(ethers.parseEther("500"), addressList["LP3"], true)
    .then((tx) => tx.wait());
  await masterChef
    .add(ethers.parseEther("100"), addressList["LP3"], true)
    .then((tx) => tx.wait());
  await masterChef
    .add(ethers.parseEther("100"), addressList["LP3"], true)
    .then((tx) => tx.wait());

  console.log(
    "MasterChef Pool Length:",
    (await masterChef.poolLength()).toString()
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
