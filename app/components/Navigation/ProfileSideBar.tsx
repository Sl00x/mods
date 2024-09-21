"use client";
import { useUserHook } from "@/features/hooks/user-hook";
import {
  RiComputerLine,
  RiDashboardLine,
  RiFoldersLine,
} from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SubItem {
  href?: string;
  action?: () => void;
  label: string;
}

interface LinkProps {
  icon: any;
  href?: string;
  children: string;
  items: SubItem[];
}

const modSubItems: SubItem[] = [
  { label: "Upload mod", href: "/profile/mods/new" },
];

const devSubItems: SubItem[] = [
  { label: "License Keys", href: "/profile/dev/license" },
];

const LinkProfile = (props: LinkProps) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="relative flex flex-row space-x-2 items-center origin-bottom cursor-pointer hover:bg-dark/20 transition-all duration-500 rounded-md"
    >
      <button
        className="flex flex-row space-x-2 p-2"
        onClick={() => router.push(props.href!)}
      >
        <props.icon size={24} />
        <span>{props.children}</span>
      </button>
      {show && (
        <div className="absolute z-50 top-full w-64 pt-4">
          <div className=" bg-white p-4  shadow-smflex flex-col justify-start items-start space-y-4 origin-bottom border broder-gray-200 border-t-white">
            {props.items.map((item) => (
              <button
                key={item.label}
                type="button"
                className="w-full text-left cursor-pointer text-dark/75 hover:text-dark"
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    router.push(item.href!);
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileNavBar = () => {
  const { logout } = useUserHook();
  const profileSubItem: SubItem[] = [{ label: "Logout", action: logout }];
  return (
    <nav className="w-full bg-white border-b border-gray-200 flex flex-row space-x-4 items-center p-4">
      <LinkProfile
        icon={RiDashboardLine}
        href="/profile"
        items={profileSubItem}
      >
        Profile
      </LinkProfile>
      <LinkProfile
        icon={RiFoldersLine}
        href="/profile/mods"
        items={modSubItems}
      >
        Mods
      </LinkProfile>
      <LinkProfile
        icon={RiComputerLine}
        href="/profile/dev"
        items={devSubItems}
      >
        Developpers
      </LinkProfile>
    </nav>
  );
};

export default ProfileNavBar;
