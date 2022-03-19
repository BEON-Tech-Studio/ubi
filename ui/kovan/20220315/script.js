var web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + infuraAPIKey));
var contractUBI = new web3.eth.Contract(abiUBI, contractUBIAddress);
var contractSUBI = new web3.eth.Contract(abiSUBI, contractSUBIAddress);

var loginButton, userWallet, account;

function checkMetamask() {
  if(!window.ethereum) {
    loginButton.textContent = 'MetaMask is not installed';
    return false;
  }

  loginButton.textContent = 'Connect';

  window.ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
  });

  if(window.sessionStorage.getItem('connected')) {
    tryLoginWithMetaMask();
  }

  return true;
}

async function tryLoginWithMetaMask() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((e) => {
      console.error(e.message);
      return;
    })
  if(!accounts) { return }

  const kovanNetwork = 42;
  if(window.ethereum.networkVersion != kovanNetwork) {
    userWallet.textContent = "Wrong network. Please, switch to Kovan.";
    return;
  }

  account = accounts[0];
  userWallet.textContent = account;
  loginButton.textContent = 'Connected';
  window.sessionStorage.setItem('connected', true);
}

function fillContractsAddresses() {
  document.getElementById('contract-address-ubi').textContent = contractUBIAddress;
  document.getElementById('contract-address-subi').textContent = contractSUBIAddress;
}

function hideAllSections() {
  var sections = document.getElementsByClassName('functions-section');
  for(var i = 0; i < sections.length; i++) {
    sections[i].style.display = 'none';
  }
}

function showSection(id) {
  hideAllSections();
  document.getElementById(id).style.display = 'block';
  var buttons = document.getElementsByClassName('btn-default');
  for(var i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute('disabled');
  }
  document.getElementById(id + '-button').setAttribute('disabled', true);
}

window.addEventListener('DOMContentLoaded', () => {
  hideAllSections();
  fillContractsAddresses();
  loginButton = document.getElementById('loginButton');
  userWallet = document.getElementById('userWallet');
  loginButton.addEventListener('click', tryLoginWithMetaMask);
  checkMetamask();
});

/** Helpers **/

function formatBalanceAmount(amount) {
  return (amount / Math.pow(10, 18)).toFixed(3) + " UBI";
}

/** Smart contract functions **/

function getBalance() {
  contractUBI.methods.balanceOf(account).call().then(function(balance) {
    console.log(balance);
    document.getElementById('balance').textContent = formatBalanceAmount(balance);
  });
}

function getBalanceOfAddress() {
  var address = document.getElementById('address-balance').value;
  contractUBI.methods.balanceOf(address).call().then(function(balance) {
    console.log(balance);
    document.getElementById('balance-address').textContent = formatBalanceAmount(balance);
  });
}

async function accruing() {
  const transaction = {
    from: account, 
    to: contractUBIAddress, 
    data: contractUBI.methods.startAccruing(account).encodeABI()
  };

  estimateGasAndSendTransaction(transaction, 'accruing-result');
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

async function createStream() {
  var address = document.getElementById('address-stream').value;
  var start = document.getElementById('start-stream').value;
  var stop = document.getElementById('stop-stream').value;
  var quantity = document.getElementById('quantity-stream').value;

  const transaction = {
    from: account, 
    to: contractUBIAddress, 
    data: contractUBI.methods.createStream(address, quantity, start, stop).encodeABI()
  };

  estimateGasAndSendTransaction(transaction, 'stream-result');
}

async function cancelStream() {
  var streamId = document.getElementById('stream-id-cancel').value;

  const transaction = {
    from: account, 
    to: contractUBIAddress, 
    data: contractUBI.methods.cancelStream(streamId).encodeABI()
  };

  estimateGasAndSendTransaction(transaction, 'cancel-stream-result');
}

function getBalanceByStream() {
  var streamId = document.getElementById('stream-id').value;
  contractSUBI.methods.balanceOfStream(streamId).call().then(function(balance) {
    console.log(balance);
    document.getElementById('balance-stream').textContent = formatBalanceAmount(balance);
  });
}

async function withdrawFromStream() {
  var streamId = document.getElementById('withdraw-stream-id').value;

  const transaction = {
    from: account, 
    to: contractUBIAddress, 
    data: contractUBI.methods.withdrawFromStream(streamId).encodeABI()
  };

  estimateGasAndSendTransaction(transaction, 'withdraw-result');
}

async function transferStream() {
  var streamId = document.getElementById('transfer-stream-id').value;
  var address = document.getElementById('transfer-stream-address').value;

  const transaction = {
    from: account, 
    to: contractSUBIAddress, 
    data: contractSUBI.methods.transferFrom(account, address, streamId).encodeABI()
  };

  estimateGasAndSendTransaction(transaction, 'transfer-stream-result');
}

async function estimateGasAndSendTransaction(transaction, elementId) {
  web3.eth.estimateGas(transaction, function(error, estimatedGas) {
    if(error) {
      if(confirm('The transaction will fail. Do you want to continue anyway?')) {
        transaction.gas = web3.utils.toHex(21000 * 200);
        sendTransaction(transaction, elementId);
      }
    } else {
      transaction.gas = web3.utils.toHex(estimatedGas);
      sendTransaction(transaction, elementId);
    }
  });
}

async function sendTransaction(transaction, elementId) {
  try {
    const txHash = await window.ethereum.request({method: 'eth_sendTransaction', params: [transaction]});
    document.getElementById(elementId).textContent = 'Check out your transaction on Etherscan: ';
    document.getElementById(elementId + '-link').href = 'https://kovan.etherscan.io/tx/' + txHash;
    document.getElementById(elementId + '-link').textContent = 'https://kovan.etherscan.io/tx/' + txHash;
  } catch(error) {
    document.getElementById(elementId).textContent = 'Something went wrong: ' + error.message;
    document.getElementById(elementId + '-link').href = '';
    document.getElementById(elementId + '-link').textContent = '';
  }
}