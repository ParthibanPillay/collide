import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { OrbitingCircles } from './magicui/orbiting-circles'
import { Icons } from './magicui/IconBase'

const HeroSection = () => {
    return (
        <div className="grid grid-cols-2 p-4">
            <div className="ml-3 mt-10">
                <h1 className='text-5xl'>Store your <span className='text-green-400'>images</span> with ease.</h1>
                <p className='text-2xl mt-5'>simple, secure, fast.</p>
                <Link href="/dashboard">
                    <Button className="bg-green-400 text-2xl p-6 cursor-pointer mt-5">
                        Dashboard
                    </Button>
                </Link>
            </div>
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                <OrbitingCircles iconSize={40}>
                    <Icons.googleDrive />
                    <Icons.facebook />
                    <Icons.gitHub />
                    <Icons.googleDrive />
                    <Icons.facebook />
                </OrbitingCircles>
                <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                    <Icons.gitHub />
                    <Icons.googleDrive />
                    <Icons.facebook />
                    <Icons.googleDrive />
                </OrbitingCircles>
            </div>
        </div>
    )
}

export default HeroSection
