// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";

/**
 * @title ProofOfHumanity Interface
 * @dev See https://github.com/Proof-Of-Humanity/Proof-Of-Humanity.
 */
interface IProofOfHumanity {
  function isRegistered(address _submissionID)
    external
    view
    returns (
      bool registered
    );
}

interface IUBI {
  function createStream(address recipient, uint256 ubiPerSecond, address tokenAddress, uint256 startTime, uint256 stopTime)
    external
    returns (uint256 streamId);

  function getStream(uint256 streamId)
    external
    view
    returns (
      address sender,
      address recipient,
      uint256 deposit,
      address tokenAddress,
      uint256 startTime,
      uint256 stopTime,
      uint256 remainingBalance,
      uint256 ratePerSecond
    );
}

contract DelegateUBIToPool {

  using SafeMath for uint256;

  /* Events */

  event IncomeDelegated(address indexed from, address indexed to, uint256 percentage);

  /* Storage */

  /// @dev The contract's governor.
  address public governor;

  mapping (address => mapping (address => uint256)) public delegatedPercentages;

  /// @dev The Proof Of Humanity registry to reference.
  IProofOfHumanity public proofOfHumanity;

  /// @dev The Proof Of Humanity registry to reference.
  IUBI public ubi;

  /* Initializer */

  function initialize(IProofOfHumanity _proofOfHumanity, IUBI _ubi) public {
    proofOfHumanity = _proofOfHumanity;
    ubi = _ubi;
    governor = msg.sender;
  }

  function delegateToPool(address recipient, uint256 percentage) public returns (bool) {
    require(proofOfHumanity.isRegistered(msg.sender), "Only registered humans can stream UBI.");
    require(recipient != address(0x00), "stream to the zero address");
    require(recipient != address(this), "stream to the contract itself");
    require(recipient != msg.sender, "stream to the caller");
    require(percentage > 0, "Percentage is zero");
    require(delegatedPercentages[msg.sender][recipient] > 0, "Sender already delegated to the recipient");

    // TODO: call ubi api

    delegatedPercentages[msg.sender][recipient] = percentage;
    emit IncomeDelegated(msg.sender, recipient, percentage);
    return true;
  }
}
