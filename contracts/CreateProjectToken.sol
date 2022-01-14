// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "./TokenERC20.sol";

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract CreateProjectToken {
    IERC20[] public erc20s;
    // GnosisSafe public safe; 

    function createProjectToken(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) external {
        IERC20 erc20 = new TokenERC20(msg.sender, _name, _symbol, _totalSupply);
        erc20s.push(erc20);
        
    }

    function getProjectTokenAddress() external view returns (IERC20[] memory) {
        return erc20s;
    }
}