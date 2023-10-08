import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";
import { deployMockBEP20 } from "./core/deployMockBEP20";
import { MockBEP20__factory } from "../../typechain-types";

const main = async () => {
  const [owner, alice] = await ethers.getSigners();
  const addressList = await addressUtils.getAddressList(hre.network.name);
  await deployMockBEP20("LP1", "1000000");
  const lp1 = MockBEP20__factory.connect(addressList.LP1, owner);
  await lp1.transfer(alice.address, "1000").then((tx) => tx.wait());
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
