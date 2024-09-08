'use client'
import { Button } from '../Button/Button'


export default function HeroSection() {

  return (
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
                Earn
                <span className="text-primary ml-2">Money</span> with your
                <span className="text-primary ml-2">Mods</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-dark/50">
                Manage your mods license key and payment, and get stats about it !
            </p>
            <div className="mt-5 flex items-center justify-center gap-x-6">
                <Button title="Try now."/>
            </div>
            </div>
        </div>
    </div>
  )
}