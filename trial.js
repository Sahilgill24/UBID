const {ethers}=require('ethers');


const provider = new ethers.providers.JsonRpcProvider('https://rpc.ubitscan.io/');
const wallet = new ethers.Wallet('76585d57ace9d6a5baa80855f462f470aceaeecf3b7999a076ea5b9b861d1370',provider)

const contractAddress = '0xc87b9bEF7f65466c1Aa9ebcC1efB44DBAAFCc361';
const abi = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_minKeyRotationTime",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "addController",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "controller",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "changeController",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "newController",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "changeControllerSigned",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "sigV",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "sigR",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "sigS",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "newController",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "changed",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "controllers",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "disableKeyRotation",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "enableKeyRotation",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "keyRotationTime",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getControllers",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address[]",
          "internalType": "address[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "identityController",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "nonce",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "removeController",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "controller",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "revokeAttribute",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "name",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "value",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "revokeAttributeSigned",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "sigV",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "sigR",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "sigS",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "name",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "value",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setAttribute",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "name",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "value",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "validity",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setAttributeSigned",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "sigV",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "sigR",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "sigS",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "name",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "value",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "validity",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "DIDAttributeChanged",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "name",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        },
        {
          "name": "value",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        },
        {
          "name": "validTo",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "previousChange",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "DIDControllerChanged",
      "inputs": [
        {
          "name": "identity",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "controller",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "previousChange",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    }
  ]

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function main() {
    const controllers = await contract.identityController('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4',{gasLimit: '1000000'   })
    console.log(controllers);
}

main();