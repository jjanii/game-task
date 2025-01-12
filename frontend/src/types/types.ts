// File to hold all the types used in the frontend

export type LoginInfo = { username: string; password: string };

export type Filter = {
  name: string;
  providers: number[];
  groups: string[];
  cardsPerRow: number;
  sortOrder: SortOrderTypes;
};

export type Game = {
  id: number;
  name: string;
  provider: number;
  cover: string;
  coverLarge: string;
  date: string;
};

export type Provider = {
  id: number;
  name: string;
  logo: string;
};

export type Group = {
  id: number;
  name: string;
  games: number[];
};

export type GamesResponse = {
  games: Game[];
  providers: Provider[];
  groups: Group[];
};

export type SortOrderTypes = "A-Z" | "Z-A" | "Newest" | undefined;
