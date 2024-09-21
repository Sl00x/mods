"use client";

import { GameCard } from "@/components/Card/GameCard";
import HeroSection from "@/components/HeroSection/Section";
import { useGetGamesQuery } from "@/features/api/root-api";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: games } = useGetGamesQuery();
  const router = useRouter();
  return (
    <div className="bg-white h-full overflow-auto">
      <HeroSection />
      <div className="p-10 space-y-4 bg-light">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-extrabold lg:text-4xl 2xl:text-4xl space-x-2">
            <span className="text-dark font-bold ">Top</span>
            <span className="text-primary underline font-bold ">Games</span>
          </h1>
          <button
            onClick={() => router.push("/games")}
            className="text-primary font-semibold underline cursor-pointer hover:opacity-50"
          >
            Show more
          </button>
        </div>
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

export default Home;
