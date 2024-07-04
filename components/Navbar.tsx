"use client"

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'


const Navbar = ({ user }: MobileNavProps) => {
    const pathName = usePathname()
    return (
        <div className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image src="/icons/hamburger.svg" alt='hamnburger' width={30} height={30} className='cursor-pointer' />
                </SheetTrigger>
                <SheetContent side={'left'} className='bg-white  border-none'>
                    <Link href={'/'} className='cursor-pointer flex items-center gap-1' >
                        <Image src="/icons/logo.svg" width={34} height={34} alt='applogo' />
                        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1 ml-3'>Bankify</h1>
                    </Link>
                    <div className='mobilenav-sheet'>
                        <SheetClose asChild>
                            <nav className='flex h-full flex-col text-white gap-6 pt-16 '>
                                {sidebarLinks.map((item) => {
                                    const isActive = pathName === item.route || pathName.startsWith(`${item.route}`)
                                    return (
                                        <SheetClose asChild>
                                        <Link href={item.route} key={item.label}
                                            className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}>
                                            
                                                <Image src={item.imgURL} alt={item.label} width={20} height={20} className={cn({ 'brightness-[3] invert-0': isActive })} />
                                            
                                            <p className={cn('text-16 font-semibold text-black-2', { 'text-white': isActive })}>{item.label}</p>
                                        </Link>
                                        </SheetClose>
                                    )
                                })}
                            </nav>
                        </SheetClose>

                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default Navbar