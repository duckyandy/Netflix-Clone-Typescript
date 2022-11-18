import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}
function Row({ title, movies }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <ChevronLeftIcon />
      </div>
      <div>
        {movies.map((movie) => (
          <Thumbnail movie={movie} />
        ))}
      </div>
      <div>
        <ChevronRightIcon />
      </div>
    </div>
  );
}

export default Row;
