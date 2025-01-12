import { fetchGames } from "@/api/api";
import Games from "@/components/Games/Games";
import NavBar from "@/components/Navbar/Navbar";
import { GamesResponse } from "@/types/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const GamesPage = () => {
  const { data, error, isLoading }: UseQueryResult<GamesResponse, Error> =
    useQuery({
      queryKey: ["games"],
      queryFn: fetchGames,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <NavBar />
      {data && <Games data={data} />}
    </>
  );
};

export default GamesPage;
