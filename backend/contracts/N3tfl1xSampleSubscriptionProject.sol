// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {RedirectAll, ISuperToken, ISuperfluid, IConstantFlowAgreementV1} from "./RedirectAll.sol";

/// @title Sample Subscription Project built by PlasmaDAO
/// @notice Inherits the RedAll logic to redirect all incoming subscription streams 
/// to an IDA index that will distribute the funds to the project owner and the buidlers
contract N3tfl1xSampleSubscriptionProject is RedirectAll {
    /// @param ida the address of the IDA index to which RedAll will redirect all streams
    constructor(
        address ida,
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        ISuperToken acceptedToken
    ) RedirectAll(acceptedToken, host, cfa, ida) {}
}
