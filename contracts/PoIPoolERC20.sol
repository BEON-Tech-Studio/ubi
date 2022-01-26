// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "hardhat/console.sol";

interface IWETH9 {
  function withdraw(uint wad) external;
}

contract PoIPoolERC20 is Initializable {

  using SafeERC20Upgradeable for IERC20Upgradeable;

  /* Events */

  event EtherReceived(address sender, uint256 amount);
  event TransferEtherSent(address receiver, uint256 amount);
  event TransferERC20Sent(address token, address receiver, uint256 amount);

  /* Storage */
  address public governor;
  address public DAI;
  address public WETH9;
  ISwapRouter public swapRouter;

  /// @dev Verifies that the sender has ability to modify governed parameters.
  modifier onlyByGovernor() {
    require(governor == msg.sender, "The caller is not the governor.");
    _;
  }

  /* Initializer */

  function initialize(ISwapRouter _swapRouter, address _DAI, address _WETH9) public initializer {
    governor = msg.sender;
    DAI = _DAI;
    WETH9 = _WETH9;
    swapRouter = _swapRouter;
  }

  function changeDAITokenAddress(address _DAI) external onlyByGovernor {
    DAI = _DAI;
  }

  function changeWETH9TokenAddress(address _WETH9) external onlyByGovernor {
    WETH9 = _WETH9;
  }

  function changeISwapRouter(ISwapRouter _swapRouter) external onlyByGovernor {
    swapRouter = _swapRouter;
  }

  /* Handle Ether */

  fallback() external payable {
    emit EtherReceived(msg.sender, msg.value);
  }
    
  receive() external payable {
    emit EtherReceived(msg.sender, msg.value);
  }

  /* Get Balances */

  function getEtherBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getERC20Balance(IERC20Upgradeable _token) public view returns (uint256) {
    return _token.balanceOf(address(this));
  }

  /* Withdraw to governor's wallet & transfer */

  function withdrawEther(uint256 _amount) external onlyByGovernor {
    require(_amount <= getEtherBalance(), "Insufficient funds");
    payable(governor).transfer(_amount);
    emit TransferEtherSent(governor, _amount);
  }

  function transferEther(address _to, uint256 _amount) external onlyByGovernor {
    require(_to != address(0x00), "Cannot burn Ether");
    require(_to != address(this), "Cannot send Ether to itself");
    require(_to != governor, "Use withdrawEther instead");
    require(_amount <= getEtherBalance(), "Insufficient funds");
    payable(_to).transfer(_amount);
    emit TransferEtherSent(_to, _amount);
  }

  function withdrawERC20(IERC20Upgradeable _token, uint256 _amount) external onlyByGovernor {
    uint256 balance = _token.balanceOf(address(this));
    require(_amount <= balance, "Insufficient funds");
    _token.safeTransfer(governor, _amount);
    emit TransferERC20Sent(address(_token), governor, _amount);
  }

  function transferERC20(IERC20Upgradeable _token, address _to, uint256 _amount) external onlyByGovernor {
    require(_to != address(0x00), "Cannot burn ERC20 Token");
    require(_to != address(this), "Cannot send ERC20 Token to itself");
    require(_to != governor, "Use withdrawERC20 instead");
    uint256 balance = _token.balanceOf(address(this));
    require(_amount <= balance, "Insufficient funds");
    _token.safeTransfer(_to, _amount);
    emit TransferERC20Sent(address(_token), _to, _amount);
  }

  /* Swap Tokens */

  function swapTokenForDAI(address _tokenIn, uint256 _amount, uint24 _poolFee, uint256 _deadline) external onlyByGovernor returns (uint256) {
    return swapTokenForToken(_tokenIn, DAI, _amount, _poolFee, _deadline, false);
  }

  function swapTokenForETH(address _tokenIn, uint256 _amount, uint24 _poolFee, uint256 _deadline) external onlyByGovernor returns (uint256) {
    return swapTokenForToken(_tokenIn, WETH9, _amount, _poolFee, _deadline, true);
  }

  function swapTokenForToken(address _tokenIn, address _tokenOut, uint256 _amount, uint24 _poolFee, uint256 _deadline, bool _unwrap) internal returns (uint256) {
    require(getERC20Balance(IERC20Upgradeable(_tokenIn)) > 0, "Insufficient funds");

    TransferHelper.safeApprove(_tokenIn, address(swapRouter), _amount);

    ISwapRouter.ExactInputSingleParams memory params =
      ISwapRouter.ExactInputSingleParams({
        tokenIn: _tokenIn,
        tokenOut: _tokenOut,
        fee: _poolFee,
        recipient: address(this),
        deadline: _deadline,
        amountIn: _amount,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0
      });

    uint256 amountOut = swapRouter.exactInputSingle(params);

    if(_unwrap) {
      unwrapWETH(amountOut);
    }

    return amountOut;
  }

  function unwrapWETH(uint256 _amount) internal {
    IWETH9 weth9 = IWETH9(WETH9);

    if(_amount != 0) {
      weth9.withdraw(_amount);
    }
  }

}