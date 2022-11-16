import Image from "next/image";
import { useEffect, useState } from "react";
import { baseURL } from "../constants/movie";
import { Movie } from "../typings";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

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
    </div>
  );
}

export default Banner;
