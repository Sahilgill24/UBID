// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DIDRegistryBase {
    struct DIDDocument {
        address[] controllers;
        mapping(bytes32 => Attribute) attributes;
        uint256 lastUpdated;
    }

    struct Attribute {
        bytes value;
        uint256 validity;
    }

    mapping(address => DIDDocument) private didDocuments;

    event DIDAttributeChanged(
        address indexed identity,
        bytes32 indexed nameHash,
        bytes value,
        uint256 validity,
        uint256 lastUpdated
    );

    event DIDControllerChanged(
        address indexed identity,
        address indexed controller,
        uint256 lastUpdated
    );

    modifier onlyController(address identity) {
        require(isController(identity, msg.sender), "Not authorized");
        _;
    }

    function generateDID(
        address walletAddress
    ) public pure returns (string memory) {
        return
            string(abi.encodePacked("did:ubit:", toAsciiString(walletAddress)));
    }

    function isController(
        address identity,
        address controller
    ) internal view returns (bool) {
        address[] storage controllers = didDocuments[identity].controllers;
        for (uint256 i = 0; i < controllers.length; i++) {
            if (controllers[i] == controller) {
                return true;
            }
        }
        return identity == controller;
    }

    function addController(
        address identity,
        address controller
    ) external onlyController(identity) {
        require(
            !isController(identity, controller),
            "Controller already exists"
        );

        didDocuments[identity].controllers.push(controller);
        emit DIDControllerChanged(identity, controller, block.timestamp);
    }

    function removeController(
        address identity,
        address controller
    ) external onlyController(identity) {
        address[] storage controllers = didDocuments[identity].controllers;
        uint256 length = controllers.length;

        require(length > 1, "At least one controller required");

        for (uint256 i = 0; i < length; i++) {
            if (controllers[i] == controller) {
                controllers[i] = controllers[length - 1];
                controllers.pop();
                break;
            }
        }

        emit DIDControllerChanged(identity, controller, block.timestamp);
    }

    function setAttribute(
        address identity,
        bytes32 nameHash,
        bytes calldata value,
        uint256 validity
    ) external onlyController(identity) {
        DIDDocument storage doc = didDocuments[identity];
        doc.attributes[nameHash] = Attribute(value, block.timestamp + validity);
        doc.lastUpdated = block.timestamp;

        emit DIDAttributeChanged(
            identity,
            nameHash,
            value,
            validity,
            block.timestamp
        );
    }

    function getAttribute(
        address identity,
        bytes32 nameHash
    ) external view returns (bytes memory) {
        return didDocuments[identity].attributes[nameHash].value;
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            uint8 b = uint8(uint160(x) >> (4 * (39 - i * 2)));
            s[2 * i] = _char(b >> 4);
            s[2 * i + 1] = _char(b & 0x0f);
        }
        return string(s);
    }

    function _char(uint8 b) private pure returns (bytes1) {
        return bytes1(b < 10 ? b + 0x30 : b + 0x57);
    }
}
