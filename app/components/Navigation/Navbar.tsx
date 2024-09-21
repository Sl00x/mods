"use client";
import { useUserHook } from "@/features/hooks/user-hook";
import {
  RiDashboard3Line,
  RiGamepadLine,
  RiUploadLine,
} from "@remixicon/react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";

interface LinkItemProps {
  label?: string;
  icon?: any;
  active?: boolean;
  href: string;
}

export const LinkItem = (props: LinkItemProps) => {
  const router = useRouter();

  return (
    <div
      className={clsx([
        props.active && "bg-dark text-light",
        "cursor-pointer flex flex-row items-center space-x-2 px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-200 hover:text-dark dark:hover:bg-gray-700",
      ])}
      onClick={() => router.push(props.href)}
    >
      {props.label && <span>{props.label}</span>}
      {props.icon && <props.icon size={16} />}
    </div>
  );
};

export const NavBar = () => {
  const [currentPage, setCurrentPage] = useState("");
  const [menuShow, setMenuShow] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const { user } = useUserHook();

  useEffect(() => {
    const path = pathName.split("/");
    if (path.length > 1) {
      setCurrentPage(path[1]);
    } else {
      setCurrentPage(path[0]);
    }
  }, [pathName]);

  return (
    <nav
      x-data="{ isOpen: false }"
      className="relative bg-white shadow dark:bg-gray-800"
    >
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <button onClick={() => router.push("/")}>
              <img className="w-auto h-8 sm:h-12" src="/logo_l.svg" alt="" />
            </button>

            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
                onClick={() => {
                  setMenuShow((prev) => !prev);
                }}
              >
                {!menuShow ? (
                  <svg
                    x-show="!isOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    x-show="isOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={clsx([
              menuShow ? "visible shadow-md" : "hidden",
              "absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center",
            ])}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <LinkItem
                label="Upload mods"
                icon={RiUploadLine}
                active
                href="/profile"
              />
              <LinkItem label="Games" icon={RiGamepadLine} href="/games" />
              {user && (
                <LinkItem
                  label="Dashboard"
                  icon={RiDashboard3Line}
                  href="/profile"
                />
              )}
            </div>

            <div className="flex space-x-2 items-center mt-4 lg:mt-0">
              {user ? (
                <button type="button" onClick={() => router.push("/profile")}>
                  <img
                    src={user?.avatar}
                    className="w-12 h-12 object-center rounded-full ring-2 ring-primary"
                  />
                </button>
              ) : (
                <>
                  <Button
                    title="Sign In"
                    color="primary"
                    onClick={() => router.push("/auth/sign-in")}
                  />

                  <Button
                    title={"Sign Up"}
                    color="dark"
                    onClick={() => router.push("/auth/sign-up")}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
