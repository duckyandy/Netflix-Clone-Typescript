import type { NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";
import requests from "../utils/requests";
import { Movie } from "../typings";
import Banner from "../components/Banner";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
}

const Home = ({ netflixOriginals }: Props) => {
  return (
    <div>
      <p></p>
      <Header />
      <Banner netflixOriginals={netflixOriginals} />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [netflixOriginals, trendingNow, topRated, actionMovies] =
    await Promise.all([
      fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
      fetch(requests.fetchTrending).then((res) => res.json()),
      fetch(requests.fetchTopRated).then((res) => res.json()),
      fetch(requests.fetchActionMovies).then((res) => res.json()),
    ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
    },
  };
};
