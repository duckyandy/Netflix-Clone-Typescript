import MuiModal from "@mui/material/Modal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);

  //   const [movieLink];

  useEffect(() => {
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }/&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      console.log(`data: ${data.adult}`);
    }

    fetchMovie();
  }, [movie]);
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <div>
        <h1>Modal</h1>
      </div>
    </MuiModal>
  );
}

export default Modal;