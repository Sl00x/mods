"use client";

import { GameCard } from "@/components/Card/GameCard";
import { useGetGamesQuery } from "@/features/api/root-api";

const Games = () => {
  const { data: games } = useGetGamesQuery();
  return (
    <div className="bg-white h-full overflow-auto">
      <div className="p-10 space-y-4 bg-light">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
          {games?.map((game) => (
            <GameCard
              key={game.id}
              title={game?.name}
              image={game?.image}
              description={game?.description}
              plateforms={game?.plateforms}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
