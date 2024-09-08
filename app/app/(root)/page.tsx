import { GameCard } from "@/components/Card/GameCard";
import HeroSection from "@/components/HeroSection/Section";
import React from "react";

const Home = () => {
    return(
        <div className="">
            <HeroSection/>
            <div className="p-4 px-20 flex flex-col space-y-4">
                <div className="flex flex-col">
                    <h2 className="font-bold uppercase text-primary text-3xl">Last games</h2>
                    <p className="text-dark/75 text-md">Show list of last games added.</p>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    <GameCard title={"Grand Theft Auto V"} description={""} plateform={"PC"}/>
                    <GameCard title={"Grand Theft Auto V"} description={""} plateform={"PS5"}/>
                    <GameCard title={"Grand Theft Auto V"} description={""} plateform={"XBOX SERIE X"}/>
                    <GameCard title={"Grand Theft Auto V"} description={""} plateform={"PS4"}/>
                    <GameCard title={"Grand Theft Auto V"} description={""} plateform={"XBOX ONE"}/>
                </div>
            </div>
        </div>
    )
}

export default Home;