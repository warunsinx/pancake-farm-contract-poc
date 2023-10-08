import hre, { ethers } from "hardhat";
import {
  MockBEP20__factory,
  MasterChef__factory,
  CakeToken__factory,
} from "../../../typechain-types";
import addressUtils from "../../../utils/addressUtils";

// npx hardhat run scripts/interact/testMasterChef/withdraw.ts --network bkc_test

const main = async () => {
  const [, alice] = await ethers.getSigners();
  const addressList = await addressUtils.getAddressList(hre.network.name);

  const lp1 = MockBEP20__factory.connect(addressList["LP1"], alice);
  const cake = CakeToken__factory.connect(addressList["CAKE"], alice);
  const masterChef = MasterChef__factory.connect(
    addressList["MasterChef"],
    alice
  );

  await lp1
    .approve(addressList["MasterChef"], ethers.MaxUint256)
    .then((tx) => tx.wait());
  await masterChef.withdraw(1, ethers.parseEther("20")).then((tx) => tx.wait());
  console.log("Alice wihtdrawn 20 LP1");

  console.log(
    "Alice's Cake balance:",
    (await cake.balanceOf(alice.address)).toString()
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
