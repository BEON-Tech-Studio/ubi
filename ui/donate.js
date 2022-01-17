var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'));

var contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
var abi = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Received","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferERC20Sent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferEtherSent","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getEtherBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]');
var contract = new web3.eth.Contract(abi, contractAddress);

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

/** Smart Contract functions **/

function getPoolBalanceEther() {
  contract.methods.getEtherBalance().call().then(function(result) {
    console.log(result);
    document.getElementById('balance-eth-pool').textContent = toShortAmount(result);
  });
}

function getBalanceEther() {
  var address = document.getElementById('address-eth-balance').value;
  web3.eth.getBalance(address).then(function(result) {
    console.log(result);
    document.getElementById('balance-eth').textContent = toShortAmount(result);
  });
}

function donateEther() {
  var addressFrom = document.getElementById('donate-eth-address').value;
  var amount = document.getElementById('donate-eth-amount').value;
  amountToSend = web3.utils.toWei(amount, "ether");
  web3.eth.sendTransaction({from: addressFrom, to: contractAddress, value: amountToSend}).then(function(tx) {
    console.log("Transaction: ", tx);
    document.getElementById('transfer-eth-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('transfer-eth-result').textContent = 'error';
  });
}

function withdrawEther() {
  var amount = document.getElementById('withdraw-eth-amount').value;
  amountToWithdraw = toLargeAmount(amount);
  contract.methods.withdrawEther(amountToWithdraw).send({from: allAccounts[0]}).then(function(tx) {
    console.log("Transaction: ", tx);
    document.getElementById('withdraw-eth-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('withdraw-eth-result').textContent = 'error';
  });
}

