var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'));

var contractAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
var abi = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Received","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferERC20Sent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferEtherSent","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"contract IERC20Upgradeable","name":"_token","type":"address"}],"name":"getERC20Balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEtherBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Upgradeable","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Upgradeable","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]');
var abiERC20 = JSON.parse('[{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]');

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

function getTokenSymbol(fieldName) {
  var tokenAddress = document.getElementById(fieldName).value;
  if(tokenAddress.length != 42) {
    return;
  }
  var erc20Contract = new web3.eth.Contract(abiERC20, tokenAddress);
  try {
    erc20Contract.methods.symbol().call().then(function(result) {
      document.getElementById(fieldName + '-symbol').textContent = "(" + result + ")";
    });
  } catch(error) {
    // do nothing
  }
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
    document.getElementById('donate-eth-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('donate-eth-result').textContent = 'error';
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

function transferEther() {
  var address = document.getElementById('transfer-eth-address').value;
  var amount = document.getElementById('transfer-eth-amount').value;
  amountToTransfer = toLargeAmount(amount);
  contract.methods.transferEther(address, amountToTransfer).send({from: allAccounts[0]}).then(function(tx) {
    console.log("Transaction: ", tx);
    document.getElementById('transfer-eth-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('transfer-eth-result').textContent = 'error';
  });
}

function getPoolBalanceERC20() {
  var tokenAddress = document.getElementById('address-erc20-pool-balance').value;
  contract.methods.getERC20Balance(tokenAddress).call().then(function(result) {
    console.log(result);
    document.getElementById('balance-erc20-pool').textContent = toShortAmount(result);
  });
}

function getBalanceERC20() {
  var tokenAddress = document.getElementById('address-erc20-token-balance').value;
  var address = document.getElementById('address-erc20-balance').value;
  var erc20Contract = new web3.eth.Contract(abiERC20, tokenAddress);
  erc20Contract.methods.balanceOf(address).call().then(function(result) {
    console.log(result);
    document.getElementById('balance-erc20').textContent = toShortAmount(result);
  });
}

function donateERC20() {
  var tokenAddress = document.getElementById('donate-erc20-token').value;
  var addressFrom = document.getElementById('donate-erc20-address').value;
  var amount = document.getElementById('donate-erc20-amount').value;
  amountToSend = toLargeAmount(amount);
  var erc20Contract = new web3.eth.Contract(abiERC20, tokenAddress);
  erc20Contract.methods.transfer(contractAddress, amountToSend).send({from: addressFrom}).then(function(tx) {
    console.log("Transaction: ", tx);
    document.getElementById('donate-erc20-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('donate-erc20-result').textContent = 'error';
  });
}

function withdrawERC20() {
  var tokenAddress = document.getElementById('withdraw-erc20-token').value;
  var amount = document.getElementById('withdraw-erc20-amount').value;
  amountToWithdraw = toLargeAmount(amount);
  contract.methods.withdrawERC20(tokenAddress, amountToWithdraw).send({from: allAccounts[0]}).then(function(tx) {
    console.log("Transaction: ", tx);
    document.getElementById('withdraw-erc20-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('withdraw-erc20-result').textContent = 'error';
  });
}

function transferERC20() {
  var tokenAddress = document.getElementById('transfer-erc20-token').value;
  var receiverAddress = document.getElementById('transfer-erc20-address').value;
  var amount = document.getElementById('transfer-erc20-amount').value;
  amountToTransfer = toLargeAmount(amount);
  console.log(tokenAddress, receiverAddress, amountToTransfer);
  contract.methods.transferERC20(tokenAddress, receiverAddress, amountToTransfer).send({from: allAccounts[0]}).then(function(tx) {
    console.log("Transaction: ", tx);
    document.getElementById('transfer-erc20-result').textContent = 'success';
  }).catch(function(err) {
    console.log("Failed with error: " + err);
    document.getElementById('transfer-erc20-result').textContent = 'error';
  });
}

