const Catcontract = artifacts.require("Catcontract");

module.exports = function (deployer) {
  deployer.deploy(Catcontract);
};
