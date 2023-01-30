# Tandoor

Tandoor takes coding problems, lists of I/O pairs, rewards, and deadlines from the clients, and solutions from the coders. If the provided solution matches all items of the I/O lists correctly, the code gets revealed to the client, and the reward gets transferred to the coder. Otherwise, the success percentage will get returned to the coder, and in addition to that the indexes of failed items will get returned to the client.

## Procedure

Here is a procedural overview of how humans can interact with Tandoor and get results:

1. Client provides the following:

    1.1. a description of the problem

    1.2. a deadline

    1.3. a list of input/output pairs

    1.4. reward (ETH)

2. Tandoor:

    2.1. stores deadline timestamp in the smart contract 

    2.2. keeps reward in the smart contract

    2.3. uploads the I/O list on IPFS

3. Coder sends his/her solution code to a specific problem

4. Tandoor compiles the code and checks if I/O pairs match

    4.1. If all I/O pairs match:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1.1. code gets revealed to the client

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1.2. reward gets transferred to the coder

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2. Else:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2.1. success percentage gets returned to the coder

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2.2. success percentage and indices of the failed I/O pairs get returned to the client
