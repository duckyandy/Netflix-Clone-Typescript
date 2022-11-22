import Image from "next/image";
import { useEffect, useState } from "react";
import { baseURL } from "../constants/movie";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { RecoilState, useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  //Have to use useEffect hook otherwise get rehydration issues when trying to
  //directly put netflixOriginals.title below!
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="px-4 space-y-2 md:space-y-4 lg:space-y-6">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <Image
          src={`${baseURL}/${movie?.backdrop_path}`}
          alt="banner_movie_image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-extrabold md:text-4xl lg:text-6xl">
        {movie?.title}
      </h1>
      <p className="text-sm max-w-sm md:max-w-lg lg:max-w-2xl text-shadow-lg">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay />
          Play
        </button>
        <button
          className="bannerButton bg-gray-[.5]"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <InformationCircleIcon className="w-4 h-4" />
          More Info
        </button>
      </div>
    </div>
  );
}

export default Banner;
