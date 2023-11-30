import React from "react";
import { convertDateFormat } from "@/utils/convertDate";
import { Movie } from "@/utils/request";

function Hero({
  title,
  backdrop_path,
  overview,
  vote_average,
  release_date,
}: Movie) {
  const maskStyle = {
    WebkitMaskImage: `linear-gradient(
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 40%,
              rgba(0, 0, 0, 1) 60%,
              rgba(0, 0, 0, 0) 100%
            )`,
    maskImage: `linear-gradient(
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 40%,
              rgba(0, 0, 0, 1) 60%,
              rgba(0, 0, 0, 0) 100%
            )`,
  };
  return (
    <div className="relative">
      <figure className="relative aspect-video">
        <img
          className="absolute w-full h-full bg-cover bg-center object-cover opacity-60"
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          style={maskStyle}
        ></img>
      </figure>
      <div className="absolute top-1/3 left-4 transform -translate-y-1/3 ml-2">
        {" "}
        <h2 className="text-3xl lg:text-6xl font-bold mb-2">{title}</h2>
        <p className="font-semibold text-lime-600 mb-4">
          {(vote_average * 10).toFixed()}% Positive
          <span className="font-light ml-1 text-white">
            - {convertDateFormat(release_date)}
          </span>
        </p>
        <p className="w-4/6 mb-6 hidden lg:block ">{overview}</p>
        <button className="bg-white hover:bg-slate-200 text-black font-medium py-2 px-4 mr-2 rounded">
          Rate This
        </button>
        <button className="bg-slate-800 opacity-90 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded">
          + Add To Your List
        </button>
      </div>
    </div>
  );
}

export default Hero;
