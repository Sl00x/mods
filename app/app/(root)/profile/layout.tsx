"use client";
import ProfileNavBar from "@/components/Navigation/ProfileSideBar";
import { useAppSelector } from "@/features/hooks/root-hook";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

interface RootLayoutProps {
  children: ReactElement | ReactElement[];
}

const ProfileRootLayout = ({ children }: RootLayoutProps) => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  return (
    <div className="h-full w-full bg-light">
      <div className="w-full bg-light">
        <ProfileNavBar />
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default ProfileRootLayout;
