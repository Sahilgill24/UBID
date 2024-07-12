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

  const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.ubitscan.io/');
  const signer = provider.getSigner('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4');
  const wallet = new ethers.Wallet('6b99711d264ac83b798ec10389f34afe53e6f6c6fdbb821b139aba9fd4cf9f2c', provider)

  const contractAddress = '0x35F72125fF89E35E009Def8d5ab3342ceF3de18d';
  // testnet : 0x634c418B3510000c6Fffe7d5ACbcdC07c865267F
  // 0x35F72125fF89E35E009Def8d5ab3342ceF3de18d baseDID registry
  const abi = [
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

  const DIDregistry = new ethers.Contract(contractAddress, abi, wallet);


  const handleSubmit = async () => {
    setName(name)
    const DID = await DIDregistry.generateDID(name);
    console.log(DID);
    setDID(DID);
    console.log(name)
    if (address || email) {
      const credit_c = ethers.utils.formatBytes32String(address);
      const email_c = ethers.utils.formatBytes32String(email);
      const validity = 3600;
      const setattribute = await DIDregistry.setAttribute(name, credit_c, email_c, validity, { gasLimit: '1000000' });
      console.log(setattribute.hash);
      const getDIDDocument = await DIDregistry.getDIDDocument(name);
      console.log(getDIDDocument);




    }

    // Write logic here
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
