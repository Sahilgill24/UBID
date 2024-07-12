export const abi =[
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
      "name": "generateDID",
      "inputs": [
        {
          "name": "walletAddress",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "getAttribute",
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
        }
      ],
      "outputs": [
        {
          "name": "value",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getDIDDocument",
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
          "type": "string",
          "internalType": "string"
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
          "name": "validity",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "lastUpdated",
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
          "name": "lastUpdated",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    }
  ]