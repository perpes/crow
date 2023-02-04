// SPDX-License-Identifier: MIT

/**
 * @title Crow
 * @author Millie @5r33n
 */

pragma solidity ^0.8.17;

contract Crow {
    event ProblemSet(uint256 indexed id, uint256 reward);
    event ProblemSolved(uint256 indexed id);

    address public owner;

    struct Problem {
        uint256 id;
        uint256 reward;
        bytes cid;
        address problemSetter;
        bool solved;
    }

    Problem[] public problems;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "[ERR] Not Owner");
        _;
    }

    function setProblem(uint256 _reward, bytes memory _cid) public {
        problems.push(Problem(problems.length, _reward, _cid, msg.sender, false));
        emit ProblemSet(problems.length - 1, _reward);
    }

    function getProblemCid(uint256 _id) public view returns (bytes memory) {
        Problem storage problem = problems[_id];
        return problem.cid;
    }

    function problemSolved(uint256 _problemId, address _coderAddress) public onlyOwner {
        Problem storage problem = problems[_problemId];
        uint256 reward = problem.reward;
        (bool sent, ) = _coderAddress.call{value: reward}("");
        require(sent, "[ERR] Failed to send Ether");
        problem.solved = true;
        emit ProblemSolved(_problemId);
    }
}
