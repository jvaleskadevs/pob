// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

interface IDA {
    // Allow us to update the units of shares on mint, transfer and burn
    function changeSharesReceiver(address from, address to) external;
}

// The brain of the Plasma DAO. It manages projects and pob (proof of buidlership).
// Every ID is a project. Only mintable by project builders as reward.
// Every NFT is a tradeable cash flow from the project profits, trough a custom sytem.
contract PlasmaDAOHost is ERC1155, Ownable, ERC1155Supply {
    constructor(address safePlasmaDAO) ERC1155("") {
        // transfer ownership to the DAO multisig safe wallet
        transferOwnership(safePlasmaDAO);
    }

    // Sample of IDs and projects
    // ID: 0 -> N3TFL1X
    // ID: 1 -> D1SN3Y 
    // ID: N -> ANY_DAPP_WITH_SUBSCRIPTORS

    // Get the IDA address from a project ID
    mapping (uint256 => address) private _idToIDA;

    // Allow us to add new projects as we build aka populate the previous mapping
    // with ID and address of the IDA distributing the profits from the project
    function addProject(uint256 id, address ida) external onlyOwner {
        _idToIDA[id] = ida;
    }
    
    // Magic happens here. Every transfer, we are updating the shares units on the IDA
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
        for (uint counter = 0; counter < ids.length; ++counter) {
            IDA ida = IDA(_idToIDA[ids[counter]]);
            ida.changeSharesReceiver(from, to);
        }
    }
    
    // Allow us to airdrop the pob to builders
    function pobAirdrop(address[] memory builders, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        for (uint counter = 0; counter < builders.length; ++counter) {
            _mint(builders[counter], id, amount, data);
        }
    }

    // BASIC ERC1555 functions from the OpenZeppelin wizard

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
    
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}
