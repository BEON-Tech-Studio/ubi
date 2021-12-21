const deploymentParams = require('../deployment-params');

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Pool = await ethers.getContractFactory("PoIPool");
  console.log("Deploying PoIPool...");

  const pool = await upgrades.deployProxy(
    Pool,
    [
      "0x9c9DB8354652d0cEf9097cFe1e9eB893fD743958",
      "1500000000000000000000"
    ],
    {
      initializer: 'initialize',
      unsafeAllowCustomTypes: true 
    }
  );

  console.log("PoIPool deployed to:", pool.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
