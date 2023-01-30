// SPDX-License-Identifier: MIT

/**
 * @title Tandoor
 * @author Millie @5r33n
 */

pragma solidity ^0.8.17;

contract Tandoor {
    struct Problem {
        uint256 id;
        uint256[3] inputs;
        uint256[3] outputs;
    }

    Problem[] public problems;

    function setProblem(uint256[3] memory _inputs, uint256[3] memory _outputs) public {
        problems.push(Problem(problems.length, _inputs, _outputs));
    }
}
