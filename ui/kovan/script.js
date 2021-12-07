var infuraAPIKEY = '9ecdcc8cfd4e4f299867b193230ffea6'; // TODO: Move this API KEY to a config file
var kovan = 'https://kovan.infura.io/v3/' + infuraAPIKEY;
var web3 = new Web3(new Web3.providers.HttpProvider(kovan));
//var UBI_contractAddress = '0xDdAdE19B13833d1bF52c1fe1352d41A8DD9fE8C9';
var UBIv2_contractAddress = '0xeAE49a04ab45750d8E810d057182cf6b7C3F044D';
var abi = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"senderBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"recipientBalance","type":"uint256"}],"name":"CancelStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"deposit","type":"uint256"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stopTime","type":"uint256"}],"name":"CreateStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromStream","type":"event"},{"inputs":[],"name":"accruedPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"accruedSince","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"cancelStream","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"changeGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IProofOfHumanity","name":"_proofOfHumanity","type":"address"}],"name":"changeProofOfHumanity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"ubiPerSecond","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"}],"name":"createStream","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"deltaOf","outputs":[{"internalType":"uint256","name":"delta","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getAccruedValue","outputs":[{"internalType":"uint256","name":"accrued","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getDelegatedAccruedValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"getStream","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"},{"internalType":"uint256","name":"remainingBalance","type":"uint256"},{"internalType":"uint256","name":"ratePerSecond","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getStreamsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getStreamsOf","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_initialSupply","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_accruedPerSecond","type":"uint256"},{"internalType":"contract IProofOfHumanity","name":"_proofOfHumanity","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxStreamsAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startA","type":"uint256"},{"internalType":"uint256","name":"_endA","type":"uint256"},{"internalType":"uint256","name":"_startB","type":"uint256"},{"internalType":"uint256","name":"_endB","type":"uint256"}],"name":"overlapsWith","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"prevStreamId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofOfHumanity","outputs":[{"internalType":"contract IProofOfHumanity","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"reportRemoval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"setMaxStreamsAllowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"startAccruing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamIdsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamIdsOfSenderAndRecipient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgrade","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromStream","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]');
var contract = new web3.eth.Contract(abi, UBIv2_contractAddress);
var loginButton, userWallet, account;
window.userWalletAddress = null;

function toggleButton() {
  if(!window.ethereum) {
    loginButton.textContent = 'MetaMask is not installed'
    return false;
  }

  loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', loginWithMetaMask);
}

async function loginWithMetaMask() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((e) => {
      console.error(e.message);
      return
    })
  if (!accounts) { return }

  window.userWalletAddress = accounts[0];
  account = window.userWalletAddress;
  userWallet.textContent = window.userWalletAddress;
  loginButton.textContent = 'Disconnnect';

  loginButton.removeEventListener('click', loginWithMetaMask);
  setTimeout(() => {
    loginButton.addEventListener('click', signOutOfMetaMask);
  }, 200)
}

function signOutOfMetaMask() {
  window.userWalletAddress = null;
  userWallet.innerText = '';
  loginButton.innerText = 'Connect';

  loginButton.removeEventListener('click', signOutOfMetaMask);
  setTimeout(() => {
    loginButton.addEventListener('click', loginWithMetaMask);
  }, 200)
}

window.addEventListener('DOMContentLoaded', () => {
  loginButton = document.getElementById('loginButton');
  userWallet = document.getElementById('userWallet');
  toggleButton();
});

/** Helpers **/

function formatBalanceAmount(amount) {
  return (amount / Math.pow(10, 18)).toFixed(3) + " UBI";
}

/** Smart contract functions **/

function getBalance() {
  contract.methods.balanceOf(account).call().then(function(balance) {
    $("#address").html(account);
    $("#balance").html(formatBalanceAmount(balance));
  });
}

function accruing() {
  contract.methods.startAccruing(account).send({from: account}).then(function(tx) {
    console.log("Transaction: ", tx);
  }).catch(function(err) {
    console.log("Failed with error: " + err);
  });
}

function createStream(receiver) {
  const now = new Date();
  const start = Math.round(now.getTime() / 1000) + 60;
  const end = start + 1 * 60 * 60; // 1 hour
  console.log("START: ", start, " END: ", end);
  contract.methods.createStream(receiver, 10000000000000, UBIcontractAddress, start, end).send({from: account}).then(function(tx) {
    console.log("Transaction: ", tx);
    streamId = tx.events.CreateStream.returnValues[0];
    console.log("Stream ID: ", streamId);
  }).catch(function(err) {
    console.log("Failed with error: " + err);
  });
}

function getAccruedValue(account) {
  contract.methods.getDelegatedAccruedValue(account).call().then(function(value) {
    console.log("Value: ", formatBalanceAmount(value));
  }).catch(function(err) {
    console.log("Failed with error: " + err);
  });
}

function getBalanceFromStream(streamId, account) {
  contract.methods.balanceOf(streamId, account).call().then(function(balance) {
    $("#address").html(account);
    $("#balance").html(formatBalanceAmount(balance));
  });
}

function withdrawFromStream(streamId, account) {
  var amount = $("#amount").val();
  var amountLarge = amount * Math.pow(10, 18);
  contract.methods.withdrawFromStream(streamId, amountLarge).send({from: account}).then(function(tx) {
    console.log("Transaction: ", tx);
  }).catch(function(err) {
    console.log("Failed with error: " + err);
  });
}