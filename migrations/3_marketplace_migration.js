const Catcontract = artifacts.require("Catcontract");
const Marketplace = artifacts.require("Marketplace")

module.exports = function (deployer) {
  deployer.deploy(Marketplace, Catcontract.address);
};
