import Image from "next/image"
import React from "react"
import {
  ChevronDownIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/solid"
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

function Header() {
  const { data: session, status } = useSession()

  return (
    <div className="sticky inset-x-0 top-0 z-50 flex items-center justify-between bg-white px-4 py-2 shadow-sm  ">
      {/* logo */}
      <div className="flex grow-0 basis-1/3 h-10 w-20 flex-shrink-0 cursor-pointer mr-16 md:justify-start justify-center ">
        <Link href={`/`}>
          {/* <Image
            src={`https://res.cloudinary.com/joeloff-dev/image/upload/v1656506700/Reddit_logo_new.svg_mxmb5x.png`}
            layout="fill"
            objectFit="contain"
          /> */}
          <a className="my-auto flex w-[140px] md:ml-0">
            <span className="bg-gradient-to-r from-pink-800 via-purple-600 to-indigo-800 bg-clip-text align-middle text-3xl font-black tracking-widest text-transparent ">
              RGreenit
            </span>
          </a>
        </Link>
        {/* Home */}
        <div className="hidden mx-7 md:flex md:ml-2 gap-2 items-center md:px-7">
          <HomeIcon className="h-5 w-5" />
          <p className="ml-2 hidden flex-1 lg:inline">Home</p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Search box */}
      <form className="hidden md:inline md:flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1 ">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Rgreenit"
          className="flex-1 bg-transparent outline-none"
        />
        <button type="submit" hidden></button>
      </form>
      {/* User Action icons */}
      <div className="hidden lg:inline-flex text-gray-500 space-x-2 items-center mx-5">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      {/* Menu mobile */}
      <div className="flex lg:hidden pl-4">
        <MenuIcon className="icon" />
      </div>

      {/* Sign in / Sign Out button */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
        >
          {/* wrap Image */}
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src={`https://res.cloudinary.com/joeloff-dev/image/upload/v1656522740/reddit-icon-robot_sell1a.png`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/* text signin */}
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
        >
          {/* wrap Image */}
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src={`https://res.cloudinary.com/joeloff-dev/image/upload/v1656522740/reddit-icon-robot_sell1a.png`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/* text signin */}
          <p className="text-gray-400">Sign in</p>
        </div>
      )}
    </div>
  )
}

export default Header
