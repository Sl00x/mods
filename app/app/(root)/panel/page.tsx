"use client"
import { Button } from "@/components/Button/Button";
import { GameCard } from "@/components/Card/GameCard";
import { useRouter } from "next/navigation";
import path from "path";
import React from "react";

const HomePanelAdministration = () => {

    const router = useRouter();
    return(
        <div className="">
            <div className="relative isolate overflow-hidden bg-light h-full">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-black/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true">
                    <defs>
                    <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="100%" y="-1"
                        patternUnits="userSpaceOnUse">
                        <path d="M.5 200V.5H200" fill="none"></path>
                    </pattern>
                    </defs>
                    <svg x="50%" y="-1" className="overflow-visible fill-primary/20">
                    <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                        stroke-width="0"></path>
                    </svg>
                    <rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"></rect>
                </svg>
                <div className="mt-[-50px] flex h-[500px] items-center justify-center">
                    <div className="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
                    <h1 className="mt-10 text-5xl font-bold tracking-tight text-dark sm:text-6xl">
                        Welcome,
                        <span className="text-primary ml-2">Univex</span> you can manage
                        <span className="text-primary ml-2">UNVX Mods</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-dark/50">
                        This administration plateform is use to manage every sections of this website.
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-x-6">
                        <Button title="Manage mods"/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="p-4 px-20 flex flex-col space-y-4">
                <div className="grid grid-cols-4 gap-2">
                    <GameCard title={"Users"} description={"Manage Users."} plateform={"Moderator"} onClick={() => router.push('/panel/users')}/>
                    <GameCard title={"Mods"} description={"Manage Mods."} plateform={"Moderator"}/>
                    <GameCard title={"Tickets"} description={"Manage Tickets."} plateform={"Moderator"}/>
                    <GameCard title={"Games"} description={"Manage Games."} plateform={"Administrator"} onClick={() => router.push('/panel/games')}/>
                    <GameCard title={"Forum"} description={"Manage Forum."} plateform={"Administrator"}/>
                    <GameCard title={"Stats"} description={"Show UNVX Mods Stats"} plateform={"Administrator"}/>
                </div>
            </div>
        </div>
    )
}

export default HomePanelAdministration;