import hre, { ethers } from "hardhat";
import addressUtils from "../../../utils/addressUtils";
import { deployCakeToken } from "./deployCakeToken";
import { deploySyrupBar } from "./deploySyrup";
import { deployMockBEP20 } from "./deployMockBEP20";
import { deployMasterChef } from "./deployMasterChef";
import {
  CakeToken__factory,
  SyrupBar__factory,
} from "../../../typechain-types";

const main = async () => {
  const [owner] = await ethers.getSigners();
  const addressList = await addressUtils.getAddressList(hre.network.name);
  await deployCakeToken();
  await deploySyrupBar(addressList["CAKE"]);
  await deployMockBEP20("LP1", "1000000");
  await deployMockBEP20("LP2", "1000000");
  await deployMasterChef(
    addressList["CAKE"],
    addressList["SyrupBar"],
    owner.address,
    "40",
    "100"
  );

  const cakeToken = CakeToken__factory.connect(addressList["CAKE"], owner);
  const syrupBar = SyrupBar__factory.connect(addressList["SyrupBar"], owner);

  await cakeToken
    .transferOwnership(addressList["MasterChef"])
    .then((tx) => tx.wait());
  await syrupBar
    .transferOwnership(addressList["MasterChef"])
    .then((tx) => tx.wait());
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
