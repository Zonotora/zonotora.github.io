import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpAZ,
  faArrowDownAZ,
  faCircleHalfStroke,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import {
  Lexicographical,
  toggle,
  Filter,
  ValidPredicates,
  Predicate,
} from "../interfaces/book";
import { useState } from "react";

type Props = {
  filter: Filter;
  setFilter: any;
  validPredicates: ValidPredicates;
};

const BookHeader = ({ filter, setFilter, validPredicates }: Props) => {
  const [predicateOptions, setPredicateOptions] = useState<string[][]>([]);
  const [currentPredicate, setCurrentPredicate] = useState<string>("");

  const setFilterOrder = (key: string, order: Lexicographical) => {
    setFilter((prev: Filter) => ({
      ...prev,
      sort: {
        ...prev.sort,
        [key]: order,
      },
    }));
  };

  const setFilterPredicate = (key: string, value: string) => {
    if (!key) return;

    const prev = filter.predicate[key as keyof Predicate];
    if (prev === value) {
      value = "";
    }

    setFilter((prev: Filter) => ({
      ...prev,
      predicate: {
        ...prev.predicate,
        [key]: value,
      },
    }));
  };

  const icon = (key: Lexicographical) => {
    switch (key) {
      case Lexicographical.AZ:
        return faArrowDownAZ;
      case Lexicographical.ZA:
        return faArrowUpAZ;
      case Lexicographical.None:
        return faCircleHalfStroke;
    }
  };

  const activeSort = (key: Lexicographical) => {
    return `icon${key !== Lexicographical.None ? " active" : ""}`;
  };

  const activePredicate = (key: string) => {
    let name = "icon";
    if (key === currentPredicate)
      name += predicateOptions.length > 0 ? " active" : "";
    return name;
  };

  const activePredicateValue = (key: string, value: string) => {
    let name = "icon";
    if (value === filter.predicate[key as keyof Predicate]) name += " active";
    return name;
  };

  const titleSort = () => {
    const order = toggle(filter.sort.title);
    setFilterOrder("title", order);
  };

  const authorSort = () => {
    const order = toggle(filter.sort.author);
    setFilterOrder("author", order);
  };

  const yearSort = () => {
    const order = toggle(filter.sort.year);
    setFilterOrder("year", order);
  };

  const basePredicate = (key: string, values: Set<string>) => {
    if (currentPredicate !== key) {
      const tValues = Array.from(values);
      tValues.sort();
      setPredicateOptions(tValues.map((value) => [key, value]));
      setCurrentPredicate(key);
    } else {
      setPredicateOptions([]);
      setCurrentPredicate("");
    }
  };

  const yearPredicate = () => {
    basePredicate("year", validPredicates.year);
  };

  const tagPredicate = () => {
    basePredicate("tag", validPredicates.tags);
  };

  return (
    <div className="book-header">
      <div className="book-header-main">
        <span className={activeSort(filter.sort.year)} onClick={yearSort}>
          year <FontAwesomeIcon icon={icon(filter.sort.year)} />
        </span>
        <span className={activeSort(filter.sort.title)} onClick={titleSort}>
          title <FontAwesomeIcon icon={icon(filter.sort.title)} />
        </span>
        <span className={activeSort(filter.sort.author)} onClick={authorSort}>
          author <FontAwesomeIcon icon={icon(filter.sort.author)} />
        </span>
        |
        <span className={activePredicate("year")} onClick={yearPredicate}>
          year <FontAwesomeIcon icon={faFilter} />
        </span>
        <span className={activePredicate("tag")} onClick={tagPredicate}>
          tag <FontAwesomeIcon icon={faFilter} />
        </span>
      </div>
      {predicateOptions ? (
        <div className="book-header-secondary">
          {predicateOptions.map(([key, option]) => (
            <span
              key={option}
              className={activePredicateValue(key, option)}
              onClick={() => setFilterPredicate(key, option)}
            >
              {option}
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BookHeader;
