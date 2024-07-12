// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {DIDRegistry} from "../src/DIDregistry.sol";
import {console} from "forge-std/console.sol";

contract DeployUBIT is Script {
    function run() external returns (address) {
        address proxy = deploy();
        return proxy;
    }

    function deploy() public returns (address) {
        vm.startBroadcast();
        DIDRegistry proxy = new DIDRegistry(0);

        vm.stopBroadcast();
        return address(proxy);
    }
}
// -include .env

// .PHONY: all test clean deploy fund help install snapshot format anvil zktest

// DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
// DEFAULT_ZKSYNC_LOCAL_KEY := 0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110

// all: clean remove install update build
