"use client"

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

interface NavbarProps {
    userId: string
}

export default function Navbar({ userId }: NavbarProps) {

    const { isSignedIn, isLoaded, user } = useUser();

    if (!isSignedIn || !isLoaded) {
        return null;
    }

    console.log(user);

    return (
        <>
            <nav>
                <div className="flex mt-5 p-6 border-b-1">
                    <div className="h-full w-full flex items-center gap-5">
                        <Image src="/collide_icon.svg" alt="collide-icon" width={50} height={50} />
                        <h1 className="text-4xl">Collide</h1>
                    </div>
                    <div className="flex items-center gap-5 w-100">
                        <Image src={user.imageUrl} alt="user Image" height={50} width={50} className="rounded-full"/>
                        <h1 className="text-2xl">{user?.fullName}</h1>
                    </div>
                </div>
            </nav>
        </>
    )
}