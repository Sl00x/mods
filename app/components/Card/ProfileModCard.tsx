import { Mod } from "@/interfaces/mod.interface";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";

interface Props {
  mod: Mod;
}

export const ProfilModCard = (props: Props) => {
  const router = useRouter();
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.mod.name}
      </h5>
      <div className="flex flex-row space-x-2 mb-2 items-center">
        <span className="bg-secondary rounded-md text-light font-semibold text-xs uppercase p-1 px-2">
          {props.mod.game.name}
        </span>
        {props.mod.plateform && (
          <span className="bg-primary rounded-md text-light font-semibold text-xs uppercase p-1 px-2">
            {props.mod.plateform.name}
          </span>
        )}
      </div>
      <hr />
      <div className="flex flex-col my-2 space-y-2">
        <div className="flex flex-row justify-between items-center">
          <span className="italic text-xs text-dark/85">Created at</span>
          <span className="font-semibold text-xs text-dark">
            {new Date(props.mod.created_at).toDateString()}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="italic text-xs text-dark/85">Last version</span>
          <span className="font-semibold text-xs text-dark">
            {props.mod.versions[props.mod.versions.length - 1].version}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="italic text-xs text-dark/85">
            Last version status
          </span>
          <span className="font-semibold text-xs text-dark">
            {props.mod.versions[props.mod.versions.length - 1].status}
          </span>
        </div>
      </div>
      <Button
        title="Show more"
        color="dark"
        onClick={() => router.push(`/mods/${props.mod.slug}`)}
      />
    </div>
  );
};
