import { useMemo, useState } from "react";
import { Filter, Game, GamesResponse } from "@/types/types";
import GameCard from "@/components/GameCard/GameCard";
import styles from "./Games.module.css";
import Filters from "../Filters/Filters";

type Props = {
  data: GamesResponse;
};

const Games = ({ data }: Props) => {
  const [filters, setFilters] = useState<Filter>({
    name: "",
    providers: [],
    groups: [],
    cardsPerRow: 4,
    sortOrder: undefined,
  });

  const providers = data?.providers ?? [];

  // Filter out games that are not in any group in the current filters
  const gamesWithGroups = useMemo((): Game[] => {
    if (!data) return [];
    return data.games.filter((game) => {
      return data.groups.some((group) => group.games.includes(game.id));
    });
  }, [data]);

  const filteredGames = useMemo(() => {
    if (!data) return [];
    const groups = data.groups;
    let result = gamesWithGroups;

    if (filters.name) {
      result = result.filter((game) =>
        game.name.toLowerCase().includes(filters.name.toLowerCase()),
      );
    }

    if (filters.providers.length > 0) {
      result = result.filter((game) =>
        filters.providers.includes(game.provider),
      );
    }

    if (filters.groups.length > 0) {
      const filteredGroups = groups.filter((group) =>
        filters.groups.includes(group.id.toString()),
      );

      // Get all the games associated with the selected groups
      const groupGames = filteredGroups.flatMap((group) => group.games);
      result = result.filter((game) => groupGames.includes(game.id));
    }

    switch (filters.sortOrder) {
      case undefined:
        break;
      case "A-Z":
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        result = result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Newest":
        result = result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
    }

    return result;
  }, [data, gamesWithGroups, filters]);

  return (
    <div className={styles.container}>
      <div
        className={styles.gamesCount}
        key={`games-${filteredGames.length}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${filters.cardsPerRow}, 1fr)`,
        }}
      >
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            useLarge={filters.cardsPerRow === 1}
          />
        ))}
      </div>
      <Filters
        onFilter={setFilters}
        providers={providers}
        groups={data?.groups ?? []}
        cardsPerRow={filters.cardsPerRow}
        gamesCount={filteredGames.length}
      />
    </div>
  );
};

export default Games;
