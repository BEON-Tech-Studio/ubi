// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

interface IUBI {
  function balanceOf(address _human) 
    external
    view 
      returns (
        uint256 balance
      );
  function transfer(address _recipient, uint256 _amount)
    external
    returns (
      bool transferred
    );
}

contract PoIPool is Initializable {

  using SafeMath for uint256;

  /* Events */

  event UBIDistributed(uint256 totalHumans, uint256 totalUBI);

  /* Storage */
  IUBI public ubi;
  address public governor;
  uint256 public maxUBIPerRecipient;

  /// @dev Verifies that the sender has ability to modify governed parameters.
  modifier onlyByGovernor() {
    require(governor == msg.sender, "The caller is not the governor.");
    _;
  }

  /* Initializer */

  function initialize(IUBI _ubi, uint256 _maxUBIPerRecipient) public initializer {
    ubi = _ubi;
    maxUBIPerRecipient = _maxUBIPerRecipient;
    governor = msg.sender;
  }

  function claimUBIFromStreams(uint256[] streamIds) public onlyByGovernor returns (bool) {
    // TODO
    return true;
    
    /*for(uint i = 0; i < _humans.length; i++) {
      address currentHuman = _humans[i];
      if(isRecipient(currentHuman)) {
        if(ubi.transfer(currentHuman, valueToDistribute)) {
          totalHumans++;
          totalTransferred = totalTransferred.add(valueToDistribute);
        }
      }
    }*/
  }

  function changeMaxUBIPerRecipient(uint256 _maxUBIPerRecipient) external onlyByGovernor {
    maxUBIPerRecipient = _maxUBIPerRecipient;
  }

  function changeIUBI(IUBI _ubi) external onlyByGovernor {
    ubi = _ubi;
  }

  function distributeUBIToRecipients(address[] memory _humans, uint256 totalRecipients) public onlyByGovernor returns (bool) {
    require(address(ubi) != address(0x00), "UBI contract has not been assigned");
    require(totalRecipients > 0, "Total recipients must be greater than zero");
    require(_humans.length <= 0, "Number of humans must be greater than total recipients");
    uint256 valueToDistribute = ubi.balanceOf(address(this)).div(totalRecipients);
    if(valueToDistribute > maxUBIPerRecipient) {
      valueToDistribute = maxUBIPerRecipient;
    }
    require(valueToDistribute > 0, "Not enough UBIs to distribute");

    uint256 totalHumans = 0;
    uint256 totalTransferred = 0;
    for(uint i = 0; i < _humans.length; i++) {
      address currentHuman = _humans[i];
      if(isRecipient(currentHuman)) {
        if(ubi.transfer(currentHuman, valueToDistribute)) {
          totalHumans++;
          totalTransferred = totalTransferred.add(valueToDistribute);
        }
      }
    }

    emit UBIDistributed(totalHumans, totalTransferred);

    return true;
  }

}