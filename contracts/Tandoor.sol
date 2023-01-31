// SPDX-License-Identifier: MIT

/**
 * @title Tandoor
 * @author Millie @5r33n
 */

pragma solidity ^0.8.17;

contract Tandoor {
    event ProblemEvent(uint256 indexed id, uint256 reward);

    struct Problem {
        uint256 id;
        uint256 reward;
        uint256[] inputs;
        uint256[] outputs;
    }

    Problem[] public problems;

    function setProblem(
        uint256 _reward,
        uint256[] memory _inputs,
        uint256[] memory _outputs
    ) public {
        problems.push(Problem(problems.length, _reward, _inputs, _outputs));
        emit ProblemEvent(problems.length - 1, _reward);
    }

    function getProblem(uint256 _id) public view returns (uint256[] memory, uint256[] memory) {
        Problem storage problem = problems[_id];
        return (problem.inputs, problem.outputs);
    }
}
