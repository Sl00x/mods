"use client"
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Textarea } from "@/components/Input/Textarea";
import { useCreateGameMutation, useGetUsersQuery } from "@/features/api/root-api";
import { useUserHook } from "@/features/hooks/user-hook";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from 'react-select'

const options = [
    { value: 'PC', label: 'PC' },
    { value: 'PS3', label: 'PS3' },
    { value: 'PS4', label: 'PS4' },
    { value: 'PS5', label: 'PS5' },
    { value: 'Xbox 360', label: 'Xbox 360' },
    { value: 'Xbox One', label: 'Xbox One' },
    { value: 'Xbox Serie S', label: 'Xbox Serie S' },
    { value: 'Xbox Serie X', label: 'Xbox Serie X' },
  ]

const UserAdministration = () => {
    const {user} = useUserHook();
    const [ createGame ] = useCreateGameMutation();
    const router = useRouter();
    const [name, setName] = useState("");
    const [plateform, setPlateform] = useState("");
    const [description, setDescription] = useState("");

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
                        Create new
                        <span className="text-primary ml-2">Games</span>
                    </h1>

                    <div className="mt-5 flex items-center justify-center gap-x-6">
                        <Button title="Games List" onClick={() => router.push('/panel/games')}/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm w-1/2">
                <div className="space-y-6">
                    <Input label="Name" type='text' onTextChange={setName}/>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Plateform</label>
                        <Select options={options} onChange={(value) => value?.value && setPlateform(value?.value)}/>
                    </div>
                    <Textarea label="Description" type='text' onTextChange={setDescription}/>
                    <div className="w-full flex justify-end">
                        <Button title="Save" onClick={() => {
                            createGame({
                                name,
                                plateform,
                                description
                            }).unwrap().then((data) => console.log(data)).catch((e) => alert(e));
                        }}/>
                    </div>
                </div>
          </div>
        </div>
    )
}

export default UserAdministration;
