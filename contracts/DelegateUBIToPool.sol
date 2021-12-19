// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";
import "./UBI.sol";

contract DelegateUBIToPool {

  using SafeMath for uint256;

  /* Events */

  event IncomeDelegated(address indexed from, address indexed to, uint256 percentage, uint256 streamId);

  /* Storage */

  /// @dev The contract's governor.
  address public governor;

  mapping (address => mapping (address => uint256)) public delegatedPercentages;

  /// @dev The Proof Of Humanity registry to reference.
  IProofOfHumanity public proofOfHumanity;

  /// @dev The UBI contact that stores the delegation streams.
  UBI public ubi;

  /* Private */

  uint256 private constant _ONE_YEAR = 31536000;
  uint256 private constant _FIVE_MINS = 300;

  /* Initializer */

  function initialize(IProofOfHumanity _proofOfHumanity, UBI _ubi) public {
    proofOfHumanity = _proofOfHumanity;
    ubi = _ubi;
    governor = msg.sender;
  }

  function delegateToPool(address recipient, uint256 percentage) public returns (bool) {
    require(proofOfHumanity.isRegistered(msg.sender), "Only registered humans can stream UBI.");
    require(recipient != address(0x00), "stream to the zero address");
    require(recipient != address(this), "stream to the contract itself");
    require(recipient != msg.sender, "stream to the caller");
    require(percentage > 0 && percentage <= 100, "Percentage out of bounds");
    require(delegatedPercentages[msg.sender][recipient] == 0, "Sender already delegated to the recipient");

    uint256 accruedPerSecond = ubi.accruedPerSecond();
    uint256 ubisPersecond = accruedPerSecond.mul(percentage).div(100);
    uint256 streamId = ubi.createStream(recipient, ubisPersecond, address(ubi), block.timestamp + _FIVE_MINS, block.timestamp.add(_ONE_YEAR));

    delegatedPercentages[msg.sender][recipient] = percentage;
    emit IncomeDelegated(msg.sender, recipient, percentage, streamId);
    return true;
  }
}
