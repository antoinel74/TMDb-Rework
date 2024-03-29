"use client";
import { useEffect, useState } from "react";
import { Movie, fetchMovieByGender, fetchTrendingMovies } from "@/utils/request";
import Hero from "../components/Hero";
import { TrendingMovies } from "../components/TrendingMovies";
import { Loader } from "../components/Loader";
import { MoviesListByGender } from "../components/MoviesListByGender";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [documentaries, setDocumentaries] = useState<Movie[]>([]);
  const [scienceFiction, setScienceFiction] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchedMovies: Movie[] = await fetchTrendingMovies();
        const fetchedActionMovies: Movie[] = await fetchMovieByGender(28);
        const fetchedDocumentaries: Movie[] = await fetchMovieByGender(99);
        const fetchedScienceFiction: Movie[] = await fetchMovieByGender(878);

        setMovies(fetchedMovies);
        setActionMovies(fetchedActionMovies);
        setDocumentaries(fetchedDocumentaries);
        setScienceFiction(fetchedScienceFiction);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const randIndex = movies.length > 0 ? Math.floor(Math.random() * 20) : null;
  const randMovie = randIndex !== null ? movies[randIndex] : null;

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Hero {...movies[0]} />
          <TrendingMovies movies={movies} />
          <MoviesListByGender movies={actionMovies} divTitle="Action Movies" divID="actionMovies" />
          <div>{randMovie && <Hero {...randMovie} />}</div>
          <MoviesListByGender movies={scienceFiction} divTitle="Science-Fiction Movies" divID="SFMovies" />
          <MoviesListByGender movies={documentaries} divTitle="Documentaries" divID="docu" />
        </>
      )}
    </div>
  );
}
