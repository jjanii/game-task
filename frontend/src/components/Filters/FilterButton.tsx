import React from "react";
import styles from "./FilterButton.module.css";

type FilterButtonProps = {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  isSelected,
  onClick,
  children,
}) => {
  return (
    <button
      className={`${styles.filterButton} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FilterButton;
