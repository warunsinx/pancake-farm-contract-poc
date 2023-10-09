import hre, { ethers } from "hardhat";
import {
  MasterChef__factory,
  CakeToken__factory,
} from "../../../typechain-types";
import addressUtils from "../../../utils/addressUtils";

// npx hardhat run scripts/interact/testMasterChef/enterStaking.ts --network bkc_test

const main = async () => {
  const [, alice] = await ethers.getSigners();
  const addressList = await addressUtils.getAddressList(hre.network.name);

  const cake = CakeToken__factory.connect(addressList["CAKE"], alice);
  const masterChef = MasterChef__factory.connect(
    addressList["MasterChef"],
    alice
  );

  await cake
    .approve(addressList["MasterChef"], ethers.MaxUint256)
    .then((tx) => tx.wait());
  await masterChef
    .enterStaking(ethers.parseEther("20"))
    .then((tx) => tx.wait());
  console.log("Alice deposited 20 CAKE");

  console.log(
    "Alice's Cake balance:",
    ethers.formatEther(await cake.balanceOf(alice.address)).toString()
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
