// SPDX-License-Identifier: MIT

/**
 * @title Tandoor
 * @author Millie @5r33n
 */

pragma solidity ^0.8.17;

contract Tandoor {
    struct Problem {
        uint256 id;
        uint256[] inputs;
        uint256[] outputs;
    }

    Problem[] public problems;

    function setProblem(uint256[] memory _inputs, uint256[] memory _outputs) public {
        problems.push(Problem(problems.length, _inputs, _outputs));
    }

    function getProblem(uint256 _id) public view returns (uint256[] memory, uint256[] memory) {
        Problem storage problem = problems[_id];
        return (problem.inputs, problem.outputs);
    }
}
