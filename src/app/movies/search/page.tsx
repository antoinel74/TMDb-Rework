"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchSearchResults, Movie } from "@/utils/request";
import Card from "@/app/components/Card";

const SearchResultPage = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const queryParams = useSearchParams();

  useEffect(() => {
    const query = queryParams.get("query") || "";

    if (query) {
      fetchSearchResults(query)
        .then((data: Movie[]) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
        });
    }
  }, [queryParams]);

  return (
    <div className="mx-12 mt-12 py-12">
      <h2 className="text-xl mb-6 font-medium">Search results :</h2>
      <div className="flex sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1/2 overflow-x-auto w-full hide-scrollbar cursor-pointer mb-8 lg:mb-16">
        {searchResults.map((result) => (
          <Card key={result.id} {...result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
