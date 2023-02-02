// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../Crow.sol";

contract ProblemSolver {
    Crow crow = new Crow();

    function getSolverInputs(uint256 _id) public view returns (uint256[] memory) {
        return crow.getProblemInputs(_id);
    }
}
