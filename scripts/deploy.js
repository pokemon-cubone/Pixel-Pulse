const hre = require("hardhat");

async function main() {
  const oneBeat = await hre.ethers.getContractFactory("OneBeat");
  const onebeat = await oneBeat.deploy();

  await onebeat.deployed();

  console.log("1Beat deployed to:", onebeat.address); // 0xfeA7ee9ABf1E6892441Fbd679E17511110dB944F
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
