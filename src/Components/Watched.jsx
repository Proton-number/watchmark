import { useMovieStore } from "@/Store/movieStore";
import Image from "next/image";
import React from "react";

export default function Watched() {
  const { watchedMovies } = useMovieStore();
 if (!watchedMovies || watchedMovies.length === 0) {
   return <div>No watched movies yet. Start marking movies as watched!</div>;
 }


  return (
    <div>
      {watchedMovies.map((movie, index) => {
        return (
          <div key={index} style={{ textAlign: "center" }}>
            <h2>{movie.title}</h2>
          </div>
        );
      })}
    </div>
  );
}
