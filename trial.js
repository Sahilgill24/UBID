// TEsting the smart contracts in sepolia first

// const { ethers } = require('ethers');


// const provider = new ethers.providers.JsonRpcProvider('https://rpc2.sepolia.org');
// const wallet = new ethers.Wallet('6b99711d264ac83b798ec10389f34afe53e6f6c6fdbb821b139aba9fd4cf9f2c', provider)
// const signer = provider.getSigner('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4');
// const contractAddress = '0x71CdB782a3c1c18BB3dC565869fc8846bd81bb71';
// const abi = [
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "identity",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "bytes",
//         "name": "name",
//         "type": "bytes"
//       },
//       {
//         "indexed": false,
//         "internalType": "bytes",
//         "name": "value",
//         "type": "bytes"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "validity",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "lastUpdated",
//         "type": "uint256"
//       }
//     ],
//     "name": "DIDAttributeChanged",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "identity",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "controller",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "lastUpdated",
//         "type": "uint256"
//       }
//     ],
//     "name": "DIDControllerChanged",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "identity",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "controller",
//         "type": "address"
//       }
//     ],
//     "name": "addController",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "walletAddress",
//         "type": "address"
//       }
//     ],
//     "name": "generateDID",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "pure",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "identity",
//         "type": "address"
//       }
//     ],
//     "name": "getDIDDocument",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "identity",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "controller",
//         "type": "address"
//       }
//     ],
//     "name": "removeController",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "identity",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes",
//         "name": "name",
//         "type": "bytes"
//       }
//     ],
//     "name": "revokeAttribute",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "identity",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes",
//         "name": "name",
//         "type": "bytes"
//       },
//       {
//         "internalType": "bytes",
//         "name": "value",
//         "type": "bytes"
//       },
//       {
//         "internalType": "uint256",
//         "name": "validity",
//         "type": "uint256"
//       }
//     ],
//     "name": "setAttribute",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ]

// const contract = new ethers.Contract(contractAddress, abi, wallet);

// async function main() {

//   // const tx = await contract.generateDID('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4');
//   // console.log(tx);
//   // const controller_added = await contract.addController('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4','0x67ff09c184d8e9e7B90C5187ED04cbFbDba741C8',{ gasLimit: '1000000' });
//   // //const trial = await contract.identityController('0x67ff09c184d8e9e7B90C5187ED04cbFbDba741C8');
//   // console.log(controller_added);
//   // const controller_removed=await contract.removeController('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4','0x67ff09c184d8e9e7B90C5187ED04cbFbDba741C8',{ gasLimit: '1000000' });
//   // console.log(controller_removed);
//   // const name = ethers.utils.formatBytes32String("email");
//   // const value = ethers.utils.formatBytes32String("user@example.com");
//   // const validity=3600;
//   // const attribute = await contract.setAttribute('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4',name,value,validity,{ gasLimit: '1000000' });
//   // console.log(attribute);
//   const did_document = await contract.getDIDDocument('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4');
//   console.log(did_document);
//   //const controllers = await contract.changeController('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4', '0xaC6DF62364e0A8359E5687AfB743f92750c25aD0', { gasLimit: '1000000' })

// }

// main();