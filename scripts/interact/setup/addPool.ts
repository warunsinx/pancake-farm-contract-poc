import hre, { ethers } from "hardhat";
import { MasterChef__factory } from "../../../typechain-types";
import addressUtils from "../../../utils/addressUtils";

// npx hardhat run scripts/interact/setup/addPool.ts --network bkc_test

const main = async () => {
  const [owner] = await ethers.getSigners();

  const tokens = [
    {
      name: "LP1",
      point: "1000",
      update: true,
    },
    {
      name: "LP2",
      point: "1000",
      update: true,
    },
    {
      name: "LP3",
      point: "1000",
      update: true,
    },
  ];

  const addressList = await addressUtils.getAddressList(hre.network.name);

  const masterChef = MasterChef__factory.connect(
    addressList["MasterChef"],
    owner
  );

  for (let i = 0; i < tokens.length; i++) {
    await masterChef
      .add(
        ethers.parseEther(tokens[i].point),
        addressList[tokens[i].name],
        tokens[i].update
      )
      .then((tx) => tx.wait());
    console.log(`Add ${tokens[i].name} success.`);
  }

  console.log(
    "MasterChef Pool Length:",
    (await masterChef.poolLength()).toString()
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
