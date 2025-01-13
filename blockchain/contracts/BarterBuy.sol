// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BarterBuy {
    struct Transaction {
        uint id;
        address initiator;
        address responder;
        uint item1Id; // For barter
        uint item2Id; // For barter or 0 for purchases
        uint price;   // Final agreed price for purchase
        string status; // "pending", "completed", "rejected"
    }

    uint public transactionCount;

    mapping(uint => address) public itemOwners; // Maps item ID to owner
    mapping(uint => Transaction) public transactions;

    event TransactionFinalized(uint transactionId, address initiator, address responder, uint item1Id, uint item2Id, uint price, string status);

    // Internal function to transfer ownership during transaction finalization
    function transferOwnership(uint _itemId, address _newOwner) internal {
        itemOwners[_itemId] = _newOwner;
    }

    // Public function to set item ownership (for setup/testing purposes)
    function setItemOwnership(uint _itemId, address _owner) public {
        itemOwners[_itemId] = _owner;
    }

    function finalizeTransaction(
        uint _item1Id,
        uint _item2Id,
        uint _price,
        address _responder
    ) public {
        require(itemOwners[_item1Id] == msg.sender, "You do not own this item");
        require(itemOwners[_item2Id] == _responder, "Responder does not own item2");

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

        emit TransactionFinalized(
            _transactionId,
            txn.initiator,
            txn.responder,
            txn.item1Id,
            txn.item2Id,
            txn.price,
            txn.status
        );

        transferOwnership(txn.item1Id, itemOwners[txn.item2Id]);
        transferOwnership(txn.item2Id, txn.initiator);
    }
}
