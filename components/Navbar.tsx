"use client"

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
    return (
        <>
            <nav>
                <div className="flex mt-5 p-10 border-b-2">
                    <div className="h-full w-full flex items-center gap-5">
                        <Image src="/collide_icon.svg" alt="collide-icon" width={50} height={50} />
                        <h1 className="text-4xl">Collide</h1>
                    </div>
                    <UserButton />
                </div>
            </nav>
        </>
    )
}