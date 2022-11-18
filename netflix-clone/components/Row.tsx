import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";

interface Props {
  title: string;
  movies: Movie[];
}
function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      //Depending on scrollTo direction, we will be scrolling -clientWidth or +clientWidth
      const scrollTo =
        direction === "string"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="group h-40 space-y-2 md:space-y-4">
      <h2
        className="w-60 cursor-pointer text-sm font-semibold text-[#dedddd]
      transition duration-200 group-hover:text-white md:text-2xl"
      >
        {title}
      </h2>
      <div className="relative">
        <ChevronLeftIcon
          className={`m-auto z-10 h-9 w-9 absolute left-2 top-0 bottom-0 group-hover:opacity-100 hover:scale-125`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide"
        >
          {movies.map((movie) => (
            <Thumbnail movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className={`m-auto z-10 h-9 w-9 top-0 bottom-0 right-2 absolute group-hover:opacity-100 hover:scale-125`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
