import { Game } from "./game.interface";
import { Plateform } from "./plateform.interface";
import { User } from "./user.interface";

export interface CreateModDto {
  name: string;
  description: string;
  isFree: boolean;
  withLicenseKey: boolean;
  price: number;
  gameId: string;
  plateformId: string;
  version: number;
  file?: File;
  previews?: File[];
}

export interface Version {
  id: string;
  file: string;
  status: string;
  version: string;
  scan_link: string;
  mod: Mod;
  created_at: string;
  updated_at: string;
}

export interface Mod {
  id: string;
  name: string;
  slug: string;
  description: string;
  isFree: boolean;
  withLicenseKey: boolean;
  price: number;
  gameId: string;
  authorId: string;
  created_at: Date;
  plateform: Plateform;
  author: User;
  game: Game;
  versions: Version[];
}
