import { Sidebar } from "@/components/Navigation/Sidebar";
import React from "react";
import { ReactElement } from "react";

interface RootLayoutProps {
    children: ReactElement | ReactElement[]
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return(
        <div className="h-full w-full bg-light flex flex-row">
            <div className="w-1/6 h-full overflow-y-auto">
                <Sidebar/>
            </div>
            <div className="w-5/6 h-full overflow-y-auto">
            {children}
            </div>
            
        </div>
    )
}

export default RootLayout;