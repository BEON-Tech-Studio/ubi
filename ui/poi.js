var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'));

var UBIContractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
var poolContractAddress = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e';
var abiUBI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"senderBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"recipientBalance","type":"uint256"}],"name":"CancelStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"deposit","type":"uint256"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stopTime","type":"uint256"}],"name":"CreateStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromStream","type":"event"},{"inputs":[],"name":"accruedPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"accruedSince","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"cancelStream","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"changeGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IProofOfHumanity","name":"_proofOfHumanity","type":"address"}],"name":"changeProofOfHumanity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"ubiPerSecond","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"}],"name":"createStream","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"deltaOf","outputs":[{"internalType":"uint256","name":"delta","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getAccruedValue","outputs":[{"internalType":"uint256","name":"accrued","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getDelegatedAccruedValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"getStream","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"},{"internalType":"uint256","name":"remainingBalance","type":"uint256"},{"internalType":"uint256","name":"ratePerSecond","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getStreamsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getStreamsOf","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_initialSupply","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_accruedPerSecond","type":"uint256"},{"internalType":"contract IProofOfHumanity","name":"_proofOfHumanity","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxStreamsAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startA","type":"uint256"},{"internalType":"uint256","name":"_endA","type":"uint256"},{"internalType":"uint256","name":"_startB","type":"uint256"},{"internalType":"uint256","name":"_endB","type":"uint256"}],"name":"overlapsWith","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"prevStreamId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofOfHumanity","outputs":[{"internalType":"contract IProofOfHumanity","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"reportRemoval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"setMaxStreamsAllowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"startAccruing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamIdsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamIdsOfSenderAndRecipient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgrade","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"withdrawFromStream","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]');
var abiPool = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalStreams","type":"uint256"}],"name":"UBIClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalHumans","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalUBI","type":"uint256"}],"name":"UBIDistributed","type":"event"},{"inputs":[{"internalType":"contract IUBI","name":"_ubi","type":"address"}],"name":"changeIUBI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxUBIPerRecipient","type":"uint256"}],"name":"changeMaxUBIPerRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_streamIds","type":"uint256[]"}],"name":"claimUBIFromStreams","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_humans","type":"address[]"},{"internalType":"uint256","name":"_totalRecipients","type":"uint256"}],"name":"distributeUBIToRecipients","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IUBI","name":"_ubi","type":"address"},{"internalType":"uint256","name":"_maxUBIPerRecipient","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxUBIPerRecipient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ubi","outputs":[{"internalType":"contract IUBI","name":"","type":"address"}],"stateMutability":"view","type":"function"}]');
var contractUBI = new web3.eth.Contract(abiUBI, UBIContractAddress);
var contractPool = new web3.eth.Contract(abiPool, poolContractAddress);

var allAccounts;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  allAccounts = accounts;
  web3.eth.defaultAccount = accounts[0];

  document.getElementById('address-stream-recipient').value = poolContractAddress;
  document.getElementById('userWallet').textContent = accounts[0];
});

/** Helpers **/ 

function toLargeAmount(amount) {
  var amountLarge = amount * Math.pow(10, 18);
  return amountLarge.toLocaleString('fullwide', {useGrouping: false});
}

function toShortAmount(amount) {
  var amountShort = amount / Math.pow(10, 18);
  return amountShort.toLocaleString('fullwide', {useGrouping: false});
}

function setStreamWeeks(weeks) {
  setStreamDays(weeks * 7);
}

function setStreamDays(days) {
  setStreamHours(days * 24);
}

function setStreamHours(hours) {
  setStreamMinutes(hours * 60);
}

function setStreamMinutes(minutes) {
  const now = new Date();
  const start = Math.round(now.getTime() / 1000) + 60;
  const end = start + minutes * 60;
  document.getElementById('start-stream').value = start;
  document.getElementById('stop-stream').value = end;
}

function setStreamPercentage(value) {
  document.getElementById('quantity-stream').value = value / 100 * 280000000000000;
}

/** UBI Smart Contract functions **/

function upgradeUBI() {
  contractUBI.methods.upgrade().send({from: allAccounts[0]}).then(function(tx) {
    console.log("Transaction: ", tx);
  }).catch(function(err) {
    console.log("Failed with error: " + err);
  });
}

function getBalance() {
  var address = document.getElementById('address-balance').value;
  contractUBI.methods.balanceOf(address).call().then(function(result) {
    console.log(result);
    document.getElementById('balance').textContent = toShortAmount(result);
  });
}

function getPoolBalance() {
  contractUBI.methods.balanceOf(poolContractAddress).call().then(function(result) {
    console.log(result);
    document.getElementById('balance-pool').textContent = toShortAmount(result);
  });
}

function startAccruing() {
  var address = document.getElementById('address-accruing').value;
  contractUBI.methods.startAccruing(address).send({from: allAccounts[0]}).then(function(tx) {
    console.log("Transaction: ", tx);
    document.getElementById('accruing-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('accruing-result').textContent = 'error';
  });
}

function createStream() {
  var account = document.getElementById('address-stream-sender').value;
  var start = document.getElementById('start-stream').value;
  var stop = document.getElementById('stop-stream').value;
  var quantity = document.getElementById('quantity-stream').value;
  contractUBI.methods.createStream(poolContractAddress, quantity, UBIContractAddress, start, stop).send({from: account}).then(function(tx) {
    console.log("Transaction: ", tx);
    streamId = tx.events.CreateStream.returnValues[0];
    document.getElementById('stream-result').textContent = 'success - Stream ID: ' + streamId;
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('stream-result').textContent = 'error';
  });
}

function getBalanceByStream() {
  var streamId = document.getElementById('stream-id').value;
  var address = document.getElementById('address-stream-balance').value; 
  contractUBI.methods.balanceOf(streamId, address).call().then(function(result) {
    console.log(result);
    document.getElementById('balance-stream').textContent = toShortAmount(result);
  });
}

/** PoI Pool Smart Contract functions **/

function setMaxUBIPerRecipient() {
  var maxUBI = document.getElementById('max-ubi').value;
  var maxUBIPerRecipient = toLargeAmount(maxUBI);
  contractPool.methods.changeMaxUBIPerRecipient(maxUBIPerRecipient).send({from: allAccounts[0]}).then(function(tx) {
    console.log("Transaction: ", tx);
    document.getElementById('set-max-ubi-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('set-max-ubi-result').textContent = 'error';
  });
}

function getMaxUBIPerRecipient() {
  contractPool.methods.maxUBIPerRecipient().call().then(function(result) {
    console.log(result);
    document.getElementById('max-ubi-result').textContent = toShortAmount(result);
  });
}

function claimFromStreams() {
  var streamIdsStrings = document.getElementById('claim-stream-ids').value.split(',');
  var streamIds = new Array();
  streamIdsStrings.forEach(function(element) {
    streamIds.push(element.trim());
  });
  contractPool.methods.claimUBIFromStreams(streamIds).send({from: allAccounts[0]}).then(function(tx) {
    console.log("Transaction: ", tx);
    document.getElementById('claim-stream-id-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('claim-stream-id-result').textContent = 'error';
  });
}

// TODO
function distributeUBI() {
  var address1 = $("#distribute-address-1").val();
  var address2 = $("#distribute-address-2").val();
  var address3 = $("#distribute-address-3").val();
  contract.methods.distributeUBIToRecipients([address1, address2, address3]).send({from: account1}).then(function(tx) {
    showResult("true");
    console.log("Transaction: ", tx);
  }).catch(function(err) {
    showResult("false");
    console.log("Failed with error: " + err);
  });
}

