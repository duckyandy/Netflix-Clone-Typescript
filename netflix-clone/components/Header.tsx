import Image from "next/image";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function Header() {
  return (
    <header>
      <div className="px-4 py-4 md:flex">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="netflix-svg"
          width={100}
          height={100}
          className="cursor-pointer"
        />
        <ul className="px-8 lg:px-12 hidden md:flex space-x-4 lg:space-x-8">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex px-4 space-x-4 md:space-x-8">
        <MagnifyingGlassIcon className="h-6 w-6" />
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <Image
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            alt="image"
            width={24}
            height={24}
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
