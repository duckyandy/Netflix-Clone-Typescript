import type { NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";
import requests from "../utils/requests";
import { Movie } from "../typings";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Head from "next/head";
import Modal from "../components/Modal";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
}: Props) => {
  const showModal = useRecoilState(modalState);

  return (
    <div className="bg-gradient-to-b from-gray-900/10 to-black">
      <Head>Home - Netflix</Head>
      <Header />
      <main className="space-y-8">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="ml-3 md:space-y-20 md:ml-5">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Movies" movies={actionMovies} />
        </section>
      </main>
      {showModal && <Modal />}
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
