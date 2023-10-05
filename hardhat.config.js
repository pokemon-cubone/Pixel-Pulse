/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/23e9ab2bca1d4d5c99fe519a25786a7b",
      accounts: [
        "f831509dfd0709312e79a5bd6847d54ff9072032cf016b75f29d888ac598a2a7",
      ],
    },
  },
};
