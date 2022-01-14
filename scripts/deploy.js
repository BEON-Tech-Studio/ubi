const deploymentParams = require('../deployment-params');

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Fake = await ethers.getContractFactory("FakeProofOfHumanity");
  console.log("Deploying Fake Proof Of Humanity...");

  const fake = await upgrades.deployProxy(
    Fake,
    [],
    {}
  );
  
  console.log("Fake PoH deployed to:", fake.address);

  const Token = await ethers.getContractFactory("UBI");
  console.log("Deploying UBI Coin...");

  const token = await upgrades.deployProxy(
    Token,
    [
      deploymentParams.INITIAL_SUPPLY,
      deploymentParams.TOKEN_NAME,
      deploymentParams.TOKEN_SYMBOL,
      deploymentParams.ACCRUED_PER_SECOND,
      fake.address
    ],
    {
      initializer: 'initialize',
      unsafeAllowCustomTypes: true 
    }
  );

  console.log("Token deployed to:", token.address);  
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
