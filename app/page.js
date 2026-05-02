import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
   <div className="grid grid-cols-4 justify-center items-center my-5 gap-5 w-full h-100 bg-gradient-to-r from-blue-500 via-pink-400 to-white py-10 px-6 rounded-xl shadow-lg">

    <h1 className="w-40"><b>Welcome to our Online Learning Platform </b></h1>
    <Button> Click me !</Button>
    <UserButton />
   </div>
  );
}
