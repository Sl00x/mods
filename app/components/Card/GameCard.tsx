import { Plateform } from "@/interfaces/plateform.interface";

interface GameCardProps {
  title: string;
  description: string;
  image?: string;
  plateforms: Plateform[];
  onClick?: () => void;
}

export const GameCard = (props: GameCardProps) => {
  return (
    <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      {props.image && (
        <img
          className="object-fit w-full h-40"
          src={props.image}
          alt="Article"
        />
      )}

      <div className="p-6">
        <div>
          <div className="flex flex-row space-x-2 text-xs font-bold uppercase text-primary">
            {props.plateforms.map((platform) => (
              <span
                className="bg-dark text-light px-1 rounded-sm"
                key={platform.id}
              >
                {platform.name}
              </span>
            ))}
          </div>
          <a
            href="#"
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
            role="link"
          >
            {props.title}
          </a>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};
