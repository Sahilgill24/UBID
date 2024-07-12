// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./SafeMath.sol";
contract DIDRegistryBase {
    using SafeMath for uint256;

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
        bytes name,
        bytes value,
        uint256 validity,
        uint256 lastUpdated
    );

    event DIDControllerChanged(
        address indexed identity,
        address controller,
        uint256 lastUpdated
    );

    modifier onlyController(address identity) {
        require(isController(identity, msg.sender), "Not authorized");
        _;
    }
     function generateDID(address walletAddress) public pure returns (string memory) {
        return string(abi.encodePacked("did:ubit:", toAsciiString(walletAddress)));
    }

    function isController(address identity, address controller) internal view returns (bool) {
        DIDDocument storage doc = didDocuments[identity];
        for (uint256 i = 0; i < doc.controllers.length; i++) {
            if (doc.controllers[i] == controller) {
                return true;
            }
        }
        return identity == controller;
    }

    function addController(address identity, address controller) external onlyController(identity) {
        DIDDocument storage doc = didDocuments[identity];
        require(!isController(identity, controller), "Controller already exists");

        doc.controllers.push(controller);
        emit DIDControllerChanged(identity, controller, block.timestamp);
    }

    function removeController(address identity, address controller) external onlyController(identity) {
        DIDDocument storage doc = didDocuments[identity];
        require(doc.controllers.length > 1, "At least one controller required");
        require(isController(identity, controller), "Controller does not exist");

        for (uint256 i = 0; i < doc.controllers.length; i++) {
            if (doc.controllers[i] == controller) {
                doc.controllers[i] = doc.controllers[doc.controllers.length - 1];
                doc.controllers.pop();
                break;
            }
        }

        emit DIDControllerChanged(identity, controller, block.timestamp);
    }

    function setAttribute(
        address identity,
        bytes calldata name,
        bytes calldata value,
        uint256 validity
    ) external onlyController(identity) {
        DIDDocument storage doc = didDocuments[identity];
        bytes32 nameHash = keccak256(name);
        doc.attributes[nameHash] = Attribute(value, block.timestamp + validity);
        doc.lastUpdated = block.timestamp;

        emit DIDAttributeChanged(identity, name, value, validity, block.timestamp);
    }

    function revokeAttribute(
        address identity,
        bytes calldata name
    ) external onlyController(identity) {
        DIDDocument storage doc = didDocuments[identity];
        bytes32 nameHash = keccak256(name);
        delete doc.attributes[nameHash];
        doc.lastUpdated = block.timestamp;

        emit DIDAttributeChanged(identity, name, "", 0, block.timestamp);
    }

    function getDIDDocument(address identity) external view returns (string memory) {
        DIDDocument storage doc = didDocuments[identity];
        string memory did = string(abi.encodePacked("did:ubit:", toHexString(identity)));
        string memory docString = string(abi.encodePacked(
            '{"@context":"https://www.w3.org/ns/did/v1",',
            '"id":"', did, '",',
            '"controller":["', did, '"],',
            '"verificationMethod":[{"id":"', did, '#vm-0","type":"Secp256k1VerificationKey2018","controller":"', did, '","publicKeyHex":"', toHexString(identity), '"}],',
            '"authentication":["', did, '#vm-0"],',
            '"capabilityInvocation":["', did, '#vm-0"],',
            '"capabilityDelegation":["', did, '#vm-0"],',
            '"assertionMethod":["', did, '#vm-0"],',
            '"keyAgreement":["', did, '#vm-0"],',
            '"service":[{"id":"', did, '#mailbox","type":"DIDComm","serviceEndpoint":"http://localhost:5173/network"}],'
        ));

        string memory attrString = '"attributes":{';
        bool first = true;
        for (uint256 i = 0; i < doc.controllers.length; i++) {
            if (doc.controllers[i] != address(0)) {
                if (!first) {
                    attrString = string(abi.encodePacked(attrString, ","));
                }
                first = false;
                attrString = string(abi.encodePacked(
                    attrString,
                    '"', toHexString(abi.encodePacked(doc.controllers[i])), '":',
                    '{"value":"', string(doc.attributes[keccak256(abi.encodePacked(doc.controllers[i]))].value), '",',
                    '"validity":', uint2str(doc.attributes[keccak256(abi.encodePacked(doc.controllers[i]))].validity), '}'
                ));
            }
        }
        attrString = string(abi.encodePacked(attrString, '}'));

        return string(abi.encodePacked(docString, attrString, '}'));
    }

    function toHexString(address account) internal pure returns (string memory) {
        return toHexString(abi.encodePacked(account));
    }

    function toHexString(bytes memory data) internal pure returns (string memory) {
        bytes memory hexuy = "0123456789abcdef";
        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < data.length; i++) {
            str[2 + i * 2] = hexuy[uint8(data[i] >> 4)];
            str[3 + i * 2] = hexuy[uint8(data[i] & 0x0f)];
        }
        return string(str);
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (_i != 0) {
            bstr[--k] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2 ** (8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }
    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
    function getAttribute(address identity, bytes calldata name) external view returns (bytes memory value) {
        DIDDocument storage doc = didDocuments[identity];
        bytes32 nameHash = keccak256(name);
        Attribute storage attribute = doc.attributes[nameHash];
        return (attribute.value);
}

}