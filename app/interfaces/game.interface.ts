import { Plateform } from "./plateform.interface";

export interface Game {
  id?: string;
  name: string;
  description: string;
  plateforms: Plateform[];
  image: string;
}
