"use client"
import { Button } from "@/components/Button/Button";
import { useGetGamesQuery, useGetUsersQuery } from "@/features/api/root-api";
import { useUserHook } from "@/features/hooks/user-hook";
import { useRouter } from "next/navigation";
import path from "path";
import React from "react";

const GamesAdministration = () => {
    const {user} = useUserHook();
    const { data: games } = useGetGamesQuery();
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
                        Manage
                        <span className="text-primary ml-2">Games</span>
                    </h1>

                    <div className="mt-5 flex items-center justify-center gap-x-6">
                        <Button title="Go panel" onClick={() => router.push('/panel')}/>
                        <Button title="Create new" onClick={() => router.push('/panel/games/create')}/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="relative overflow-x-auto ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Plateform
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {games?.map((game) => (
                                <tr key={user?.id} className="odd:bg-white odd:dark:bg-dark even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-dark whitespace-nowrap dark:text-white">
                                        {game?.id} 
                                    </th>
                                    <td className="px-6 py-4">
                                        {game?.name} 
                                    </td>
                                    <td className="px-6 py-4">
                                        {game?.plateform} 
                                    </td>
                                    <td className="px-6 py-4">
                                        {game?.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button title="Edit"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default GamesAdministration;