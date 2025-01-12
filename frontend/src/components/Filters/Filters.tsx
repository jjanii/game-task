import { Group, Provider, SortOrderTypes } from "@/types/types";
import { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import FilterButton from "./FilterButton";

type Props = {
  onFilter: (filters: {
    name: string;
    providers: number[];
    groups: string[];
    cardsPerRow: number;
    sortOrder: SortOrderTypes;
  }) => void;
  providers: Provider[];
  groups: Group[];
  cardsPerRow: number;
  gamesCount?: number;
};

const Filters = ({ onFilter, providers, groups, gamesCount }: Props) => {
  const [name, setName] = useState<string>("");
  const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [cardsPerRow, setCardsPerRow] = useState<number>(2);
  const [sortOrder, setSortOrder] = useState<SortOrderTypes>(undefined);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 428);

  const [isVisible, setIsVisible] = useState(!isMobile);

  window.onresize = function () {
    console.log(window.innerWidth);
    if (window.innerWidth <= 428) {
      setCardsPerRow(2);
      setIsMobile(true);
    } else if (isMobile === true && window.innerWidth > 428) {
      setIsMobile(false);
      setIsVisible(true);
    }
  };

  useEffect(() => {
    onFilter({
      name,
      providers: selectedProviders,
      groups: selectedGroups,
      cardsPerRow,
      sortOrder,
    });
  }, [
    cardsPerRow,
    name,
    selectedGroups,
    selectedProviders,
    sortOrder,
    onFilter,
  ]);

  const handleReset = () => {
    setName("");
    setSelectedGroups([]);
    setSelectedProviders([]);
    setCardsPerRow(4);
    setSortOrder(undefined);
    onFilter({
      name: "",
      providers: [],
      groups: [],
      cardsPerRow: 4,
      sortOrder: undefined,
    });
  };

  const toggleProvider = (id: number) => {
    const updated = selectedProviders.includes(id)
      ? selectedProviders.filter((providerId) => providerId !== id)
      : [...selectedProviders, id];
    setSelectedProviders(updated);
  };

  const toggleGroup = (id: string) => {
    const updated = selectedGroups.includes(id)
      ? selectedGroups.filter((groupId) => groupId !== id)
      : [...selectedGroups, id];
    setSelectedGroups(updated);
  };

  const handleSortOrderChange = (order: SortOrderTypes) => {
    if (order === sortOrder) {
      setSortOrder(undefined);
      return;
    }
    setSortOrder(order);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {isVisible && (
        <>
          <span className={styles.filterTitle}>Providers</span>
          <div className={styles.filterOptions}>
            {providers.map((provider) => (
              <FilterButton
                key={provider.id}
                isSelected={selectedProviders.includes(provider.id)}
                onClick={() => toggleProvider(provider.id)}
              >
                {provider.name}
              </FilterButton>
            ))}
          </div>
          <span className={styles.filterTitle}>Game groups</span>
          <div className={styles.filterOptions}>
            {groups.map((group) => (
              <FilterButton
                key={group.id}
                isSelected={selectedGroups.includes(group.id.toString())}
                onClick={() => toggleGroup(group.id.toString())}
              >
                {group.name}
              </FilterButton>
            ))}
          </div>

          <span className={styles.filterTitle}>Sorting</span>
          <div className={styles.filterOptions}>
            <FilterButton
              isSelected={sortOrder === "A-Z"}
              onClick={() => handleSortOrderChange("A-Z")}
            >
              A-Z
            </FilterButton>
            <FilterButton
              isSelected={sortOrder === "Z-A"}
              onClick={() => handleSortOrderChange("Z-A")}
            >
              Z-A
            </FilterButton>
            <FilterButton
              isSelected={sortOrder === "Newest"}
              onClick={() => handleSortOrderChange("Newest")}
            >
              Newest
            </FilterButton>
          </div>

          {!isMobile ? (
            <input
              type="range"
              min="1"
              max={"4"}
              value={cardsPerRow}
              className="slider"
              id="cardsPerRowRange"
              onChange={(e) => setCardsPerRow(Number(e.target.value))}
            />
          ) : undefined}

          <div className={styles.footer}>
            {gamesCount && (
              <label className={styles.footerText}>
                Games amount: {gamesCount}
              </label>
            )}
            <button className={styles.resetButton} onClick={handleReset}>
              Reset
            </button>
          </div>
        </>
      )}

      {isMobile && (
        <div
          onClick={() => setIsVisible((prev) => !prev)}
          className={styles.showFiltersText}
        >
          {isVisible ? "Hide filters" : "Show filters"}
        </div>
      )}
    </div>
  );
};

export default Filters;
