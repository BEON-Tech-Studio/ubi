var infuraAPIKEY = '9ecdcc8cfd4e4f299867b193230ffea6';
var kovan = 'https://kovan.infura.io/v3/' + infuraAPIKEY;
var web3 = new Web3(new Web3.providers.HttpProvider(kovan));
var contractAddressUBI = '0xD037C59786615848E8988Af8356E3316b1E08018';
var contractAddressPoIPoolUBI = '0x0E24f28e416e1bc0dAFad990e276E48ec5Fc130c';
var contractAddressPoIPoolERC20 = '0x6E5D79A53e97c649dbFEe21F4370b2bCe605701e';
var abiUBI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"senderBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"recipientBalance","type":"uint256"}],"name":"CancelStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"deposit","type":"uint256"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stopTime","type":"uint256"}],"name":"CreateStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromStream","type":"event"},{"inputs":[],"name":"accruedPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"accruedSince","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"cancelStream","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"changeGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IProofOfHumanity","name":"_proofOfHumanity","type":"address"}],"name":"changeProofOfHumanity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"ubiPerSecond","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"}],"name":"createStream","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"deltaOf","outputs":[{"internalType":"uint256","name":"delta","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getAccruedValue","outputs":[{"internalType":"uint256","name":"accrued","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getDelegatedAccruedValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"getStream","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"},{"internalType":"uint256","name":"remainingBalance","type":"uint256"},{"internalType":"uint256","name":"ratePerSecond","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getStreamsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"getStreamsOf","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_initialSupply","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_accruedPerSecond","type":"uint256"},{"internalType":"contract IProofOfHumanity","name":"_proofOfHumanity","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxStreamsAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startA","type":"uint256"},{"internalType":"uint256","name":"_endA","type":"uint256"},{"internalType":"uint256","name":"_startB","type":"uint256"},{"internalType":"uint256","name":"_endB","type":"uint256"}],"name":"overlapsWith","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"prevStreamId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofOfHumanity","outputs":[{"internalType":"contract IProofOfHumanity","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"reportRemoval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"setMaxStreamsAllowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_human","type":"address"}],"name":"startAccruing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamIdsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamIdsOfSenderAndRecipient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgrade","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromStream","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]');
var abiPoIPoolUBI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalStreams","type":"uint256"}],"name":"UBIClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalHumans","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalUBI","type":"uint256"}],"name":"UBIDistributed","type":"event"},{"inputs":[{"internalType":"contract IUBI","name":"_ubi","type":"address"}],"name":"changeIUBI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxUBIPerRecipient","type":"uint256"}],"name":"changeMaxUBIPerRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_streamIds","type":"uint256[]"}],"name":"claimUBIFromStreams","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_humans","type":"address[]"},{"internalType":"uint256","name":"_totalRecipients","type":"uint256"}],"name":"distributeUBIToRecipients","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IUBI","name":"_ubi","type":"address"},{"internalType":"uint256","name":"_maxUBIPerRecipient","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxUBIPerRecipient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ubi","outputs":[{"internalType":"contract IUBI","name":"","type":"address"}],"stateMutability":"view","type":"function"}]');
var abiPoIPoolERC20 = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EtherReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferERC20Sent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferEtherSent","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"DAI","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_DAI","type":"address"}],"name":"changeDAITokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISwapRouter","name":"_swapRouter","type":"address"}],"name":"changeISwapRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_WETH9","type":"address"}],"name":"changeWETH9TokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Upgradeable","name":"_token","type":"address"}],"name":"getERC20Balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEtherBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ISwapRouter","name":"_swapRouter","type":"address"},{"internalType":"address","name":"_DAI","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapRouter","outputs":[{"internalType":"contract ISwapRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenIn","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint24","name":"_poolFee","type":"uint24"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"swapTokenForDAI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenIn","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint24","name":"_poolFee","type":"uint24"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"swapTokenForETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Upgradeable","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Upgradeable","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]');
var contractUBI = new web3.eth.Contract(abiUBI, contractAddressUBI);
var contractPoolUBI = new web3.eth.Contract(abiPoIPoolUBI, contractAddressPoIPoolUBI);
var contractPoolERC20 = new web3.eth.Contract(abiPoIPoolERC20, contractAddressPoIPoolERC20);

var loginButton, userWallet, account;
window.userWalletAddress = null;

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
  document.getElementById('contract-address-ubi').textContent = contractAddressUBI;
  document.getElementById('contract-address-poiubi').textContent = contractAddressPoIPoolUBI;
  document.getElementById('contract-address-poierc20').textContent = contractAddressPoIPoolERC20;
  document.getElementById('address-stream-balance').value = contractAddressPoIPoolUBI;
}

window.addEventListener('DOMContentLoaded', () => {
  fillContractsAddresses();
  loginButton = document.getElementById('loginButton');
  userWallet = document.getElementById('userWallet');
  loginButton.addEventListener('click', tryLoginWithMetaMask);
  checkMetamask();
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

function formatBalanceAmount(amount) {
  return (amount / Math.pow(10, 18)).toFixed(3) + " UBI";
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
  document.getElementById('amount-stream').value = value / 100 * 280000000000000;
}

/** Smart Contract Functions **/

/** UBI Contract Functions **/

function getUserBalance() {
  contractUBI.methods.balanceOf(account).call().then(function(balance) {
    console.log(balance);
    document.getElementById('balance-user').textContent = formatBalanceAmount(balance);
  });
}

function getPoolBalance() {
  contractUBI.methods.balanceOf(contractAddressPoIPoolUBI).call().then(function(balance) {
    console.log(balance);
    document.getElementById('balance-pool').textContent = formatBalanceAmount(balance);
  });
}

async function startAccruing() {
  const transaction = {
    from: account, 
    to: contractAddressUBI, 
    data: contractUBI.methods.startAccruing(account).encodeABI(),
    gas: web3.utils.toHex(21000 * 200)
  };

  sendTransaction(transaction, 'accruing-result');
}

async function createStream() {
  var start = document.getElementById('start-stream').value;
  var stop = document.getElementById('stop-stream').value;
  var amount = document.getElementById('amount-stream').value;

  const transaction = {
    from: account,
    to: contractAddressUBI,
    data: contractUBI.methods.createStream(contractAddressPoIPoolUBI, amount, contractAddressUBI, start, stop).encodeABI(),
    gas: web3.utils.toHex(21000 * 200)
  };

  sendTransaction(transaction, 'stream-result');
}

function getBalanceByStream() {
  var streamId = document.getElementById('stream-id').value;
  var address = document.getElementById('address-stream-balance').value;
  contractUBI.methods.balanceOf(streamId, address).call().then(function(balance) {
    console.log(balance);
    document.getElementById('balance-stream').textContent = formatBalanceAmount(balance);
  });
}

/** PoI Pool UBI Contract Functions **/

function getMaxUBIPerRecipient() {
  contract.methods.maxUBIPerRecipient().call().then(function(result) {
    showResult(toShortAmount(result));
    console.log(result);
  })
}

function getRecipientsCount() {
  contract.methods.recipientsCount().call().then(function(result) {
    showResult(result);
    console.log(result);
  });
}

function addRecipient() {
  var recipient = $("#add-address").val();

  const transaction = {
    from: account, 
    to: contractAddressPoI, 
    data: contract.methods.addRecipient(recipient).encodeABI(),
    gas: web3.utils.toHex(21000 * 200)
  };

  sendTransaction(transaction);
}

function removeRecipient() {
  var recipient = $("#remove-address").val();

  const transaction = {
    from: account, 
    to: contractAddressPoI, 
    data: contract.methods.removeRecipient(recipient).encodeABI(),
    gas: web3.utils.toHex(21000 * 200)
  };

  sendTransaction(transaction);
}

function isRecipient() {
  var recipient = $("#is-recipient-address").val();
  contract.methods.isRecipient(recipient).call().then(function(result) {
    showResult(result ? "true" : "false");
    console.log(result);
  });
}

function addInputForAddress() {
  var inputField = $(".distribute-address").first().clone();
  inputField.val("");
  $("#distribute-addresses").append(inputField);
  $("#distribute-addresses").append("<br/><br/>");
}

function distributeUBI() {
  var addresses = $(".distribute-address");
  var filteredAddresses = [];
  addresses.each(function(index) {
    if($(this).val().length > 0) {
      filteredAddresses.push($(this).val());
    }
  });

  const transaction = {
    from: account, 
    to: contractAddressPoI, 
    data: contract.methods.distributeUBIToRecipients(filteredAddresses).encodeABI(),
    gas: web3.utils.toHex(21000 * 200)
  };

  sendTransaction(transaction);
}

/** PoI Pool ERC20 Contract Functions **/
