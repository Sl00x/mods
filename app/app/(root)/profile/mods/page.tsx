"use client";

import { ProfilModCard } from "@/components/Card/ProfileModCard";
import { useGetMyModsQuery } from "@/features/api/root-api";

const Page = () => {
  const { data: mods } = useGetMyModsQuery();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 p-10">
      {mods && mods.map((mod) => <ProfilModCard key={mod.id} mod={mod} />)}
    </div>
  );
};

export default Page;
