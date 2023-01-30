// SPDX-License-Identifier: MIT

/**
 * @title Tandoor
 * @author Millie @5r33n
 */

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Tandoor {
    mapping(uint256 => uint256) public inputToOutput;

    function setIO(uint256 _input, uint256 _output) public {
        inputToOutput[_input] = _output;
    }

    function getOutput(uint256 _input) public view returns (uint256) {
        return inputToOutput[_input];
    }
}
