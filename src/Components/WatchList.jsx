import { useMovieStore } from "@/Store/movieStore";
import React from "react";

function WatchList() {
  const { watchList } = useMovieStore();

  if (!watchList || watchList.length === 0) {
    return <div>Your watchlist is empty. Search for movies to add!</div>;
  }

  return (
    <div>
      {watchList.map((movie, index) => {
        return (
          <div key={index}>
            <h2>{movie.title}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default WatchList;
