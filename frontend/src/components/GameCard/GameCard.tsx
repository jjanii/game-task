import React from "react";
import Image from "next/image";
import { Game } from "@/types/types";

type Props = {
  game: Game;
  useLarge?: boolean;
};

const GameCard = ({ game, useLarge }: Props) => {
  return (
    <Image
      src={useLarge ? game.coverLarge : game.cover}
      alt={game.name}
      layout="responsive" // Maintain aspect ratio 16:9
      width={16}
      height={9}
      style={{ borderRadius: "8px" }}
      objectFit="cover"
    />
  );
};

export default GameCard;
