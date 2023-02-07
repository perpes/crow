// SPDX-License-Identifier: MIT

/**
 * @title Crow
 * @author Millie @5r33n
 *
 * Crow is a trustless autonomous escrow application for digital problems and solutions.
 *
 * Inputs from problem setter:
 *   1. Description
 *   2. I/O list
 *   3. Reward
 *
 * Inputs from problem solver:
 *   1. Code (currently only in JavaScript)
 *
 * Crow takes a list of I/O from the problem setter which is a list of pairs, each pair consists
 * of an input and an output; the required code from the problem solver must match each input of
 * this list to its corresponding output. If it does, the problem solver will automatically
 * receive the reward (which was already escrowed from the problem setter), and the problem
 * setter will receive the code applied by the problem solver; else, the mentioned swap will not
 * take place, keeping solver's code a secret to themselves, and setter's reward will stay as
 * escrow in the smart contract.
 *
 * @dev The I/O list gets encrypted and then added to the IPFS, so that it is securely
 * @dev decentralized. If the proposed code matches all I/O pairs successfully, the code also
 * @dev gets uploaded to the IPFS, with a secret key for the problem setter, so that only they
 * @dev can access it securely.
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

    function setProblem(uint256 _reward, bytes memory _cid) public payable returns (uint256) {
        require(_reward == msg.value, "[ERR] Reward not equal to msg.value");
        problems.push(Problem(problems.length, _reward, _cid, msg.sender, false));
        emit ProblemSet(problems.length - 1, _reward);
        return (problems.length - 1);
    }

    function getProblem(uint256 _id) public view returns (uint256, bytes memory, address, bool) {
        Problem storage problem = problems[_id];
        return (problem.reward, problem.cid, problem.problemSetter, problem.solved);
    }

    function problemSolved(uint256 _problemId, address _coderAddress) public onlyOwner {
        Problem storage problem = problems[_problemId];
        require(problem.solved == false, "[ERR] Problem is already solved");
        uint256 reward = problem.reward;
        (bool sent, ) = _coderAddress.call{value: reward}("");
        require(sent, "[ERR] Failed to send Ether");
        problem.solved = true;
        emit ProblemSolved(_problemId);
    }
}
