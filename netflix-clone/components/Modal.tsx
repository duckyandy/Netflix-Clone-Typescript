import MuiModal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import ReactPlayer from "react-player/lazy";
import {
  HandThumbUpIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Genre } from "../typings";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    // if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const trailerIndex = data.videos.results.findIndex(
          (element: any) =>
            (element.type === "Trailer" && element.official === true) ||
            element.type === "Trailer"
        );
        setTrailer(data.videos?.results[trailerIndex]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
  };

  const handleSound = () => {
    setMuted(!muted);
  };

  const getMovieVoteAverage = (): number => {
    if (movie?.vote_average && movie?.vote_average > 0) {
      return movie.vote_average;
    } else {
      return 0;
    }
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="z-50 fixed top-7 left-0 right-0 mx-auto w-full overflow-hidden overflow-y-scroll"
    >
      <div>
        <button
          className="absolute top-5 right-16 !z-40 modalButton h-9 w-9"
          onClick={handleClose}
        >
          <XCircleIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            playing
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            muted={muted}
          />
          <div className="absolute bottom-0.5 flex w-full items-center justify-between px-10">
            <div className="z-90 flex space-x-2">
              <button className=" ml-4 gap-x-4 px-4 flex text-xl text-black font-bold items-center bg-white hover:bg-black hover:text-white rounded-md">
                <PlayIcon className="h-12 w-12" />
                Play
              </button>
              <div className="flex absolute right-5">
                <button className="z-90 modalButton">
                  <PlusCircleIcon className="h-7 w-7" />
                </button>
                <button className="z-90 modalButton">
                  <HandThumbUpIcon className="h-7 w-7" />
                </button>
                <button className="z-90 modalButton" onClick={handleSound}>
                  {muted ? (
                    <FaVolumeMute className="h-6 w-6" />
                  ) : (
                    <FaVolumeUp className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-black/70 h-[40vh]">
          <div className="flex space-x-4 ml-10 pt-5">
            <p className="text-green-400 font-bold">{`${Math.round(
              getMovieVoteAverage() * 10
            )}%`}</p>
            <p>{movie?.release_date}</p>
            <div className="border-2 rounded-md border-white/40">
              <p className="text-xs">HD</p>
            </div>
          </div>
          <div className="px-10 text-md">
            <p>{movie?.overview}</p>
          </div>
          <div className="px-10 text-sm flex-col">
            <div className="py-5">
              <span className="text-[gray]">Genres: </span>
              <p>{genres.map((genre) => genre.name).join(", ")}</p>
            </div>
            <div>
              <span className="text-[gray] text-sm">Original Language: </span>
              <p>{movie?.original_language}</p>
            </div>
          </div>
        </div>
      </div>
    </MuiModal>
  );
}

export default Modal;
