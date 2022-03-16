const deploymentParams = require('../deployment-params');

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const UBI = await ethers.getContractFactory("UBI");
  console.log("Deploying UBI Coin...");

  const ubi = await upgrades.deployProxy(
    UBI,
    [
      deploymentParams.INITIAL_SUPPLY,
      deploymentParams.TOKEN_NAME,
      deploymentParams.TOKEN_SYMBOL,
      deploymentParams.ACCRUED_PER_SECOND,
      deploymentParams.PROOF_OF_HUMANITY_KOVAN
    ],
    {
      initializer: 'initialize',
      unsafeAllowCustomTypes: true 
    }
  );

  console.log("UBI deployed to:", ubi.address);

  const SUBI = await ethers.getContractFactory("sUBI");
  console.log("Deploying sUBI...");

  const subi = await SUBI.deploy(ubi.address, deployer.address, 100, "Streamed Universal Basic Income", "SUBI");

  console.log("Token deployed to:", subi.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
