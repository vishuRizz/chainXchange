// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BarterBuy {
    struct Transaction {
        uint id;
        address initiator;
        address responder;  // Wallet address of the person wanting to purchase or initiating the barter
        uint item1Id; // For barter
        uint item2Id; // For barter or 0 for purchases
        uint price;   // Final agreed price for purchase
        string status; // "pending", "completed", "rejected"
    }

    uint public transactionCount;

    mapping(uint => Transaction) public transactions;

    event TransactionFinalized(uint transactionId, address initiator, address responder, uint item1Id, uint item2Id, uint price, string status);

    function finalizeTransaction(
        uint _item1Id,
        uint _item2Id,
        uint _price,
        address _responder
    ) public payable {
        require(msg.value == _price, "Incorrect payment amount");

        transactionCount++;
        transactions[transactionCount] = Transaction(
            transactionCount,
            msg.sender,
            _responder,
            _item1Id,
            _item2Id,
            _price,
            "pending"
        );

        emit TransactionFinalized(
            transactionCount,
            msg.sender,
            _responder,
            _item1Id,
            _item2Id,
            _price,
            "pending"
        );
    }

    function completeTransaction(uint _transactionId) public {
        Transaction storage txn = transactions[_transactionId];
        require(txn.responder == msg.sender, "Not authorized");
        require(keccak256(abi.encodePacked(txn.status)) == keccak256(abi.encodePacked("pending")), "Transaction is not in pending state");

        txn.status = "completed";

        // Transfer funds to the responder
        payable(txn.responder).transfer(txn.price);

        emit TransactionFinalized(
            _transactionId,
            txn.initiator,
            txn.responder,
            txn.item1Id,
            txn.item2Id,
            txn.price,
            txn.status
        );
    }
}
