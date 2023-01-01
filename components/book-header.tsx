import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faArrowUpAZ,
  faArrowDownAZ,
  faCircleHalfStroke,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Lexicographical, toggle, Filter } from "../interfaces/book";

type Props = {
  filter: Filter;
  setFilter: any;
};

const BookHeader = ({ filter, setFilter }: Props) => {
  const setFilterOrder = (key: string, order: Lexicographical) => {
    setFilter((prev: Filter) => ({
      ...prev,
      [key]: order,
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

  const active = (key: Lexicographical) => {
    return `icon${key !== Lexicographical.None ? " active" : ""}`;
  };

  const titleSort = () => {
    const order = toggle(filter.title);
    setFilterOrder("title", order);
  };

  const authorSort = () => {
    const order = toggle(filter.author);
    setFilterOrder("author", order);
  };

  const yearSort = () => {
    const order = toggle(filter.yearSort);
    setFilterOrder("yearSort", order);
  };

  return (
    <div className="book-header">
      <span className={active(filter.yearSort)} onClick={yearSort}>
        year <FontAwesomeIcon icon={icon(filter.yearSort)} />
      </span>

      <span className={active(filter.title)} onClick={titleSort}>
        title <FontAwesomeIcon icon={icon(filter.title)} />
      </span>

      <span className={active(filter.author)} onClick={authorSort}>
        author <FontAwesomeIcon icon={icon(filter.author)} />
      </span>
    </div>
  );
};

export default BookHeader;
