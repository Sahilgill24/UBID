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

export default function Dashboard() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [data, setData] = useState(null);

  const handleSubmit = async () => {
    console.log(name, address, email);
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Wallet Address</Label>
                <Input
                  id="address"
                  placeholder="Your wallet address here"
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
            {data && (
              <div className="w-full bg-muted rounded-md px-3 py-2">hello</div>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
