import React from "react";
import { Button } from "../Button/Button";

interface GameCardProps {
    title: string;
    description: string;
    plateform: string;
    onClick?: () => void;
}

export const GameCard = (props: GameCardProps) => {
    return(
        <div className="relative flex flex-col mt-6 text-dark/75 bg-white shadow-md bg-clip-border rounded-xl w-full">
            <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-dark">
                {props.title}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {props.description}
                </p>
                <span className="bg-dark rounded-md p-1 px-2 uppercase text-xs text-white font-bold">{props.plateform}</span>
            </div>
            <div className="p-6 pt-0">
                <Button title="Show more." onClick={props.onClick}/>
            </div>
        </div>
    )
}