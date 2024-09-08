"use client"
import { useUserHook } from "@/features/hooks/user-hook";
import clsx from "clsx";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


interface SidebarItemProps {
    active?: boolean;
    label: string;
    goTo: string;
}

export const SidebarLink = (props: SidebarItemProps) => {
    return(
        <div className={clsx(["p-2", props.active && "border-l-2 border-primary"])}>
            <Link href={props.goTo}>{props.label}</Link>
        </div>
    );

}

export const Sidebar = () => {
    const [currentPage, setCurrentPage] = useState("");
    const pathName = usePathname();
    const { user } = useUserHook();

    useEffect(() => {
        const path = pathName.split('/');
        if(path.length > 1) {
            setCurrentPage(path[1]);
        } else {
            setCurrentPage(path[0]);
        }
    }, [pathName])
    return(
        <div className="w-full h-full bg-white flex flex-col justify-between space-y-2 p-6">
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row space-x-2 items-center">
                    <h1 className="text-2xl uppercase font-extrabold">UNVX MODS</h1>
                </div>
                
                <div className="mt-10 flex flex-col space-y-4">
                    <SidebarLink goTo={"/"} label="Home" active={currentPage === ""}/>
                    <SidebarLink goTo={"/games"} label="Games" active={currentPage === "games"}/>
                    <SidebarLink goTo={"/forum"} label="Forum" active={currentPage === "forum"}/>
                    <SidebarLink goTo={"/pricing"} label="Pricing" active={currentPage === "pricing"}/>
                </div>
            </div>
            <Link href={""} className="bg-primary/20 text-primary rounded-md py-2 px-4 font-semibold">Logout</Link>
        </div>
    )
}