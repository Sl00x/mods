"use client";

import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "../Button/Button";

export default function HeroSection() {
  return (
    <div className="bg-white container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
      <div className="w-full lg:w-1/2">
        <div className="lg:max-w-lg">
          <h1 className="text-3xl font-extrabold tracking-wide uppercase text-gray-800 dark:text-white lg:text-4xl">
            EARN <b className="text-primary">MONEY</b> WITH YOUR{" "}
            <b className="text-primary">MODS</b>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            We work with the best remunated glasses dealers in US to find your
            new glasses.
          </p>
          <div className="grid gap-6 mt-8 sm:grid-cols-2">
            <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
              <svg
                className="w-5 h-5 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <span className="mx-3">All Plateforms</span>
            </div>

            <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
              <svg
                className="w-5 h-5 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <span className="mx-3">Lots of Games</span>
            </div>

            <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
              <svg
                className="w-5 h-5 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <span className="mx-3">License Key System</span>
            </div>

            <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
              <svg
                className="w-5 h-5 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <span className="mx-3">Earn Money</span>
            </div>

            <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
              <svg
                className="w-5 h-5 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <span className="mx-3">Create Community</span>
            </div>

            <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
              <svg
                className="w-5 h-5 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <span className="mx-3">Instant Delivery</span>
            </div>
          </div>
          <div className="w-full flex flex-row justify-end items-center mt-4 space-x-2">
            <Button title="Show more" icon={RiArrowRightLine} color="dark" />
            <Button title="Join us" color="primary" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
        <img
          className="object-cover w-full h-full max-w-2xl rounded-md"
          src="/hero.svg"
          alt="glasses photo"
        />
      </div>
    </div>
  );
}
