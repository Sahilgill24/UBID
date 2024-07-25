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
import { getIcapAddress } from "ethers/lib/utils";
import {abi} from '../abi/abi';



export default function Dashboard() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [did, setDID] = useState("");
  const [time, settime] = useState('');
  const [Controller_address, setController_address] = useState('');
  const [remove_address, setremove_address] = useState('');
  const [c_address, setc_address] = useState('');
  const [attribute_name, setattribute_name] = useState('');
  const [attribute_value, setattribute_value] = useState('');

  const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.ubitscan.io/');
  // const signer = provider.getSigner('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4');
  const wallet = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider)

  const contractAddress = '0xc87b9bEF7f65466c1Aa9ebcC1efB44DBAAFCc361';
  
  // final contract address testnet: 0xf45DC743cb3122bfF9135c5C8FDc9EA88e74116D
  // testnet : 0x634c418B3510000c6Fffe7d5ACbcdC07c865267F
  // 0x35F72125fF89E35E009Def8d5ab3342ceF3de18d baseDID registry
  


  const DIDregistry = new ethers.Contract(contractAddress, abi, wallet);


  const handleSubmit = async () => {
    setName(name)
    const DID = await DIDregistry.generateDID(name);
    console.log(DID);
    setDID(DID);
    console.log(name)
    if (address || email) {
      const attribute_hash = ethers.utils.formatBytes32String(address);
      const email_hash = ethers.utils.formatBytes32String(email);

      const setattribute = await DIDregistry.setAttribute(name, attribute_hash, email_hash, time, { gasLimit: '1000000' });
      console.log(setattribute.hash);




    }
  }


  


  const printDIDDocument = async () => {
    const getDIDDocument = await DIDregistry.getDIDDocument(name);
    console.log(getDIDDocument);
  }
  const addController = async () => {
    const add_controller = await DIDregistry.addController(name, Controller_address,{ gasLimit: '1000000' });
    console.log(add_controller.hash);


  }
  const removecontroller = async () => {
    const remove_controller = await DIDregistry.removeController(name, remove_address,{ gasLimit: '1000000' });
    console.log(remove_controller.hash);

  }
  const get_attribute = async () => {
    const attribute_final = ethers.utils.formatBytes32String(attribute_name);
    const get_attribute = await DIDregistry.getAttribute(c_address, attribute_final,{ gasLimit: '1000000' });
    setattribute_value(get_attribute);
    console.log(get_attribute);
    console.log(ethers.utils.parseBytes32String(get_attribute));

    

  }


  return (
    <>
      <div className="flex flex-col w-full absolute pt-4 gap-7 justify-center items-center">
        <h1 className="text-8xl font-bold">UBID</h1>
        <h5 className="text-2xl underline">DID's for UBIT ecosystem</h5>
      </div>
      <div className="h-screen flex items-center justify-center w-full mx-auto gap-20">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>UBID</CardTitle>
            <CardDescription>Create your DID here for the UBIT ecosystem</CardDescription>
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
                <Label htmlFor="address">Attribute</Label>
                <Input
                  id="attribute"
                  placeholder="name of the attribute"
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Validity</Label>
                <Input
                  id="vaildity"
                  type="days"
                  placeholder="validity timeperiod for the attribute"
                  onChange={(e) => settime(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={handleSubmit}>Generate</Button>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">DID</Label>
              <Input
                id="address"
                placeholder="Your DID here"
                value={did}
              />
            </div>
            <Button className="w-full" onClick={printDIDDocument}>DID document</Button>

          </CardFooter>

        </Card>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Controllers</CardTitle>
            <CardDescription>Add controllers for your DID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Address</Label>
                <Input
                  id="name"
                  placeholder="Controller address"
                  onChange={(e) => setController_address(e.target.value)}
                />
              </div>


            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={addController}>ADD</Button>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Controller Address to Remove"
                onChange={(e) => setremove_address(e.target.value)}
              />
            </div>


            <Button className="w-full" onClick={removecontroller}>REMOVE</Button>

          </CardFooter>

        </Card>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>Example Of usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Wallet Address </Label>
                <Input
                  id="name"
                  placeholder="Wallet address of controller"
                  onChange={(e) => setc_address(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Attribute</Label>
                <Input
                  id="attribute"
                  placeholder="name of the attribute"
                  onChange={(e) => setattribute_name(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={get_attribute}>Get Attribute</Button>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Attribute value</Label>
              <Input
                id="address"
                placeholder="Your attributes value here"
                value={attribute_value}
              />
            </div>



          </CardFooter>

        </Card>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    </>
  );

}
