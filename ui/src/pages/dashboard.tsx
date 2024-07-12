import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ethers } from "ethers";
import { getAsset } from "node:sea";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [did, setDID] = useState("");

  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ubitscan.io/');
  const signer = provider.getSigner();
  const wallet = new ethers.Wallet('76585d57ace9d6a5baa80855f462f470aceaeecf3b7999a076ea5b9b861d1370', provider)

  const contractAddress = '0xc87b9bEF7f65466c1Aa9ebcC1efB44DBAAFCc361';
  // testnet : 0x634c418B3510000c6Fffe7d5ACbcdC07c865267F
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

  const DIDregistry = new ethers.Contract(contractAddress, abi, wallet,);


  const handleSubmit = async () => {
    setName(name)


    const did = await DIDregistry.identityController(name);
    console.log(did);
    const did_method = 'did:ubit:' + did;
    setDID(did_method);
    // Write logic here
  }
  const trial = async () => {
    const did_controller = await DIDregistry.changeController(name, '0xaC6DF62364e0A8359E5687AfB743f92750c25aD0');
    console.log(did_controller);
    // const controllers = await DIDregistry.getcontrollers();
    // console.log(controllers);


  }

  return (
    <>
      <div className="flex flex-row w-full absolute pt-4 justify-center items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="h-screen flex items-center justify-center w-[72vw] mx-auto">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>UBID</CardTitle>
            <CardDescription>Create your UBID here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Wallet Address</Label>
                <Input
                  id="name"
                  placeholder="Wallet address"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Credit Card</Label>
                <Input
                  id="address"
                  placeholder="Your UBIT card address here"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email here"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={handleSubmit}>Deploy</Button>
            <Button className="w-full" onClick={trial}>Trial</Button>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">DID </Label>
              <Input
                id="address"
                placeholder="Your DID here"
                value={did}
              />
            </div>

          </CardFooter>

        </Card>
      </div>
    </>
  );
}
