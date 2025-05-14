import { SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import SignInPage from "./sign-in/[[...sign-in]]/page";
import DashboardPage from "./dashboard/page";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CloudUpload, FolderIcon, ShieldIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Icons } from "@/components/magicui/IconBase";
import HeroSection from "@/components/HeroSection";
import { IconFileUpload } from "@tabler/icons-react";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-between mt-5 ml-6 mr-6">
        <h1 className="text-4xl text-green-400 cursor-pointer">Collide</h1>
        <div className="flex items-center gap-6">
          <Link href="/dashboard">
            <Button className="bg-green-400 text-2xl p-6 cursor-pointer">
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      </div>
      <Separator className="my-4 bg-white/50" orientation="horizontal" />

      {/*hero section*/}
      <HeroSection/>

      {/*writing section*/}
      <h1 className="text-5xl text-center mb-20 mt-10">what you get ?</h1>
      <div className="grid grid-cols-3 gap-5 p-10">
        <div className="grid items-center justify-center border px-2 py-15 rounded-2xl">
          <CloudUpload className="ml-15 text-green-400 h-15 w-15"/>
          <p className="text-center text-2xl">Quick Uploads</p>
          <p className="text-2xl">Drag, drop, done.</p>
        </div>
        <div className="grid items-center justify-center border px-2 py-10 rounded-2xl">
          <FolderIcon className="ml-26 text-green-400 h-15 w-15"/>
          <p className="text-center text-2xl">Smart Organization</p>
          <p className="text-2xl">keep it tidy, find it easy.</p>
        </div>
        <div className="grid items-center justify-center border px-2 py-10 rounded-2xl">
          <ShieldIcon className="ml-30 text-green-400 h-15 w-15"/>
          <p className="text-center text-2xl">Locked Down</p>
          <p className="text-2xl">Your images, your eyes only.</p>
        </div>
      </div>

      {/*footer section */}
      <footer className="bg-default-50 border-t border-default-200 py-4 md:py-6 mt-5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Collide</h2>
            </div>
            <p className="text-default-500 text-sm">
              &copy; {new Date().getFullYear()} Collide
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}