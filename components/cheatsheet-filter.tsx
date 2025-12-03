type Props = {
  filterText: string;
  onFilterChange: (text: string) => void;
  allCollapsed: boolean;
  onToggleAll: () => void;
};

const CheatSheetFilter = ({
  filterText,
  onFilterChange,
  allCollapsed,
  onToggleAll,
}: Props) => {
  return (
    <div className="cheatsheet-filter-wrapper">
      <div className="cheatsheet-filter-container">
        <input
          type="text"
          className="cheatsheet-filter-input"
          placeholder="Filter sections and commands..."
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
        />
        {filterText && (
          <button
            className="cheatsheet-filter-clear"
            onClick={() => onFilterChange("")}
            aria-label="Clear filter"
          >
            ✕
          </button>
        )}
      </div>
      <button
        className="cheatsheet-toggle-all"
        onClick={onToggleAll}
        aria-label={allCollapsed ? "Expand all sections" : "Collapse all sections"}
      >
        {allCollapsed ? "▶" : "▼"}
      </button>
    </div>
  );
};

export default CheatSheetFilter;
