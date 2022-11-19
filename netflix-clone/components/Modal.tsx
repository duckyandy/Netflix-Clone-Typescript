import MuiModal from "@mui/material/Modal";
import { elementAcceptingRef } from "@mui/utils";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import ReactPlayer from "react-player/lazy";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    // if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      ).then((response) => response.json());

      console.log(data);

      if (data.results) {
        const trailerIndex = data.results.findIndex(
          (element: any) =>
            (element.type === "Trailer" && element.official === true) ||
            element.type === "Trailer"
        );

        setTrailer(data.results[trailerIndex].key);
      }
    }

    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <div>
        <div className="pt-[60%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            playing
            width="100%"
            height="100%"
          />
        </div>
        <div>
          <div className="flex space-x-4">
            <h2>{`${movie!.vote_average * 10}%`}</h2>
            <h2>{movie?.release_date}</h2>
          </div>
        </div>
      </div>
    </MuiModal>
  );
}

export default Modal;
