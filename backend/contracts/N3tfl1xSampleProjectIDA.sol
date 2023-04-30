// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract N3tfl1xSampleProjectIDA {
    /// @notice Super token to be distributed.
    ISuperToken public spreaderToken;

    /// @notice SuperToken Library
    using SuperTokenV1Library for ISuperToken;

    /// @notice Index ID. Never changes.
    uint32 public constant INDEX_ID = 0;
    
    /// @notice Plasma DAO host address
    address private plasmadaoHost;
    /// @notice project owner address
    address private projectOwner;
    /// @notice owner units multiplier
    uint128 private unitsOwner;
    /// @notice Plasma DAO treasury address
    address private plasmadaoTreasury;

    constructor(ISuperToken _spreaderToken, address _projectOwner, uint128 _unitsOwner, address _plasmadaoHost, address _plasmadaoTreasury/*, uint128 _unitsPlasmaDAO*/) {
        spreaderToken = _spreaderToken;
        unitsOwner = _unitsOwner;
        projectOwner = _projectOwner; 
        plasmadaoHost = _plasmadaoHost;
        plasmadaoTreasury = _plasmadaoTreasury;
        // Creates the IDA Index through which tokens will be distributed
        _spreaderToken.createIndex(INDEX_ID);
        // Set the share the project owner will receive
        setShares(projectOwner, _unitsOwner);
        // Set the share the PlasmaDAO will receive
        setShares(_plasmadaoTreasury, 1);
    }

    // ---------------------------------------------------------------------------------------------
    // IDA OPERATIONS

    /// @notice Takes the entire balance of the designated spreaderToken in the contract and distributes it out to unit holders w/ IDA
    function distribute() public {
        uint256 spreaderTokenBalance = spreaderToken.balanceOf(address(this));

        (uint256 actualDistributionAmount, ) = spreaderToken.calculateDistribution(
            address(this),
            INDEX_ID,
            spreaderTokenBalance
        );

        spreaderToken.distribute(INDEX_ID, actualDistributionAmount);
    }

    /// @notice sets distribution units of an account
    /// @param subscriber subscriber address whose units are to be setted
    function setShares(address subscriber, uint128 units) public {
        // Set units for a subscriber
        spreaderToken.updateSubscriptionUnits(
            INDEX_ID,
            subscriber,
            uint128(units)
        );
    }
    
    function changeSharesReceiver(address from, address to) external {
        require(msg.sender == plasmadaoHost, "Forbidden");
        if (from == address(0)) {
            // pob mint
            (, , uint128 currentUnitsOwner, ) = spreaderToken.getSubscription(
                address(this),
                INDEX_ID,
                projectOwner
            );
            (, , uint128 currentUnitsTo, ) = spreaderToken.getSubscription(
                address(this),
                INDEX_ID,
                to
            );
            setShares(to, currentUnitsTo + 1);
            setShares(projectOwner, currentUnitsOwner + unitsOwner);
            //distribute();
            
            //setShares(projectOwner, currentUnitsOwner + (unitsOwnerPer100 / (100 - unitsOwnerPer100)));
        } else if (to != address(0)) {
            // pob transfer
            (, , uint128 currentUnitsFrom, ) = spreaderToken.getSubscription(
                address(this),
                INDEX_ID,
                from
            );
            (, , uint128 currentUnitsTo, ) = spreaderToken.getSubscription(
                address(this),
                INDEX_ID,
                to
            );
            setShares(from, currentUnitsFrom - 1);
            setShares(to, currentUnitsTo + 1);
            
            //distribute();
        } else {
            // pob burn
            (, , uint128 currentUnitsFrom, ) = spreaderToken.getSubscription(
                address(this),
                INDEX_ID,
                from
            );
            (, , uint128 currentUnitsOwner, ) = spreaderToken.getSubscription(
                address(this),
                INDEX_ID,
                projectOwner
            );
            setShares(from, currentUnitsFrom - 1);
            setShares(projectOwner, currentUnitsOwner - unitsOwner);   
            
            //distribute();   
        }
        distribute();
    }
}
