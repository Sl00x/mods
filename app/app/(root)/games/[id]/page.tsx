'use client'
import { GameCard } from "@/components/Card/GameCard";
import HeroSection from "@/components/HeroSection/Section";
import { useParams } from "next/navigation";
import React from "react";

const ModList = () => {
    const {id} = useParams();
    return(
        <div className="">
            <HeroSection/>
            <div className="p-4 px-20 flex flex-col space-y-4">
                {id}
            </div>
        </div>
    )
}

export default ModList;