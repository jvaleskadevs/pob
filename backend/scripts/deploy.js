const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log(
    `Signer: ${signer.address}`
  );
  // plasma dao host deployment
  const Plasmadao = await ethers.getContractFactory("PlasmaDAOHost");
  // signer address for test, use multisig safe wallet address in production
  const plasmadao = await Plasmadao.deploy(signer.address); 
  await plasmadao.deployed();
  console.log(
    `Plasmadao deployed to ${plasmadao.address}`
  );
  
  // n3tfl1x deployment
  const fDAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";
  const n3tfl1xOwner = "0xa984fd4f4F1bc7135f996578fF809139cD03241B"; // use your own wallet
  const unitsOwner = 1; // 50% of the IDA units, 1:1, plasmadao will start with 1 unit too
  const plasmadaoTreasury = "0xB3202696b403b38BCa1cBe715963B062C5CaA72a"; // use your own wallet
  
  const IDA = await ethers.getContractFactory("N3tfl1xSampleProjectIDA");
  const ida = await IDA.deploy(
      fDAIx,
      n3tfl1xOwner,
      unitsOwner,
      plasmadao.address,
      plasmadaoTreasury
  );
  await ida.deployed();
  console.log(
    `IDA deployed to ${ida.address}`
  );
  
  const host = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
  const cfa = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";
  
  const N3tfl1x = await ethers.getContractFactory("N3tfl1xSampleSubscriptionProject");
  const n3tfl1x = await N3tfl1x.deploy(
      ida.address,
      host,
      cfa,
      fDAIx
  );
  await n3tfl1x.deployed();
  console.log(
    `N3tfl1x deployed to ${n3tfl1x.address}`
  );
  
  // adding the n3tfl1x project, ID #0, and its IDA address
  // this function is all we need to add new projects in the future. D1sn3y, 4m4z0n...
  await plasmadao.addProject(0, ida.address);
  console.log(
    `N3tfl1x #0 added to Plasma DAO Host`
  );
  // minting 1 pob to the signer address
  //await plasmadao.mint(signer.address, 0, 1, "0x0");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
