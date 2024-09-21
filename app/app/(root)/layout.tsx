import { NavBar } from "@/components/Navigation/Navbar";
import { ReactElement } from "react";

interface RootLayoutProps {
  children: ReactElement | ReactElement[];
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="h-full w-full bg-light flex flex-col">
      <div className="">
        <NavBar />
      </div>
      <div className="h-full overflow-auto">{children}</div>
    </div>
  );
};

export default RootLayout;
