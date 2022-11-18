import { Movie } from "../typings";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Image from "next/image";
import { imageURLW500 } from "../constants/movie";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200
    ease-in md:h-36 md:min-w-[260px] md:hover:scale-120"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
        setTimeout(() => {
          console.log(currentMovie);
        }, 100);
      }}
    >
      <Image
        alt="thumbnail_image"
        src={`${imageURLW500}${movie.backdrop_path}`}
        layout="fill"
        objectFit="cover"
        className="rounded-sm md:rounded"
      />
    </div>
  );
}

export default Thumbnail;
