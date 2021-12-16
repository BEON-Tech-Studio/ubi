// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";

interface IUBI {
  function balanceOf(address _human) 
    external
    view 
      returns (
        uint256 balance
      );
}

contract PoIPool {

  using SafeMath for uint256;

  /* Events */

  event UBIDistributed(uint256 total);

  /* Storage */
  IUBI public ubi;
  address public governor;
  mapping(address => bool) public allowedRecipients;
  uint256 public maxUBIPerRecipient;

  /// @dev Verifies that the sender has ability to modify governed parameters.
  modifier onlyByGovernor() {
    require(governor == msg.sender, "The caller is not the governor.");
    _;
  }

  /* Initializer */

  function initialize(IUBI _ubi, uint256 _maxUBIPerRecipient) public {
    ubi = _ubi;
    maxUBIPerRecipient = _maxUBIPerRecipient;
    governor = msg.sender;
  }

  function addRecipient(address _human) public onlyByGovernor returns (bool) {
    require(_human != address(0x00), "Cannot add the zero address");
    require(_human != address(this), "Cannot add the contract itself");
    require(!allowedRecipients[_human], "Recipient already allowed");
    allowedRecipients[_human] = true;
    return true;
  }

  function removeRecipient(address _human) public onlyByGovernor returns (bool) {
    require(allowedRecipients[_human], "Recipient is not registered");
    allowedRecipients[_human] = false;
    return true;
  }

  function isRecipient(address _human) public view returns (bool) {
    return allowedRecipients[_human];
  }

  /* TODO: claim UBIs from a list of streams */
  function claimUBIFromStreams() public onlyByGovernor returns (bool) {
    // TODO
    return true;
  }

  /* TODO: set Max UBI per recipient + category */
  function changeMaxUBIPerRecipient(uint256 _maxUBIPerRecipient) external onlyByGovernor {
    maxUBIPerRecipient = _maxUBIPerRecipient;
  }

  function changeIUBI(IUBI _ubi) external onlyByGovernor {
    ubi = _ubi;
  }

  function distributeUBIToRecipients(address[] memory _humans, uint256 _totalHumans) public onlyByGovernor returns (bool) {
    require(address(ubi) != address(0x00), "UBI contract has not been assigned");
    require(_totalHumans > 0, "TotalHumans must be greater than zero");
    uint256 valueToDistribute = ubi.balanceOf(address(this)).div(_totalHumans);
    if(valueToDistribute > maxUBIPerRecipient) {
      valueToDistribute = maxUBIPerRecipient;
    }
    require(valueToDistribute > 0, "Not enough UBIs to distribute");

    for(uint i = 0; i < _humans.length; i++) {
      address currentHuman = _humans[i];
      // TODO
    }

    return true;
  }

}