import { useState, useMemo } from "react";
import Page from "../components/page";
import CheatSheetAccordion from "../components/cheatsheet-accordion";
import CheatSheetFilter from "../components/cheatsheet-filter";
import { cheatsheetData } from "../data/cheatsheet-data";
import { CheatSheetSection, CheatSheetSubsection } from "../lib/types";

const CheatSheet = () => {
  const [filterText, setFilterText] = useState("");
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Initialize all sections as open
  useMemo(() => {
    const initialState: { [key: string]: boolean } = {};
    cheatsheetData.forEach((section) => {
      if (!(section.id in openSections)) {
        initialState[section.id] = true;
      }
    });
    if (Object.keys(initialState).length > 0) {
      setOpenSections((prev) => ({ ...initialState, ...prev }));
    }
  }, []);

  // Check if all sections are collapsed
  const allCollapsed = useMemo(() => {
    return Object.values(openSections).every((isOpen) => !isOpen);
  }, [openSections]);

  // Toggle all sections
  const toggleAll = () => {
    const newState: { [key: string]: boolean } = {};
    const targetState = allCollapsed; // If all collapsed, expand all; otherwise collapse all
    cheatsheetData.forEach((section) => {
      newState[section.id] = targetState;
    });
    setOpenSections(newState);
  };

  // Toggle individual section
  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Filter sections and commands based on search text
  const filteredSections = useMemo(() => {
    if (!filterText.trim()) {
      return cheatsheetData;
    }

    const searchText = filterText.toLowerCase();
    return cheatsheetData
      .map((section) => {
        // Check if section title matches
        const titleMatches = section.title.toLowerCase().includes(searchText);

        if (section.subsections) {
          // Filter subsections that match
          const matchingSubsections = section.subsections
            .map((subsection) => {
              // Check if subsection title matches
              const subsectionTitleMatches = subsection.title
                .toLowerCase()
                .includes(searchText);

              // Filter commands that match
              const matchingCommands = subsection.commands.filter(
                (cmd) =>
                  cmd.command.toLowerCase().includes(searchText) ||
                  cmd.description.toLowerCase().includes(searchText) ||
                  (cmd.example &&
                    cmd.example.toLowerCase().includes(searchText))
              );

              // Include subsection if title matches OR if any commands match
              if (
                titleMatches ||
                subsectionTitleMatches ||
                matchingCommands.length > 0
              ) {
                return {
                  ...subsection,
                  commands:
                    titleMatches || subsectionTitleMatches
                      ? subsection.commands
                      : matchingCommands,
                };
              }
              return null;
            })
            .filter(
              (subsection): subsection is CheatSheetSubsection =>
                subsection !== null
            );

          if (matchingSubsections.length > 0) {
            return {
              ...section,
              subsections: matchingSubsections,
            };
          }
        } else if (section.commands) {
          // Filter commands that match
          const matchingCommands = section.commands.filter(
            (cmd) =>
              cmd.command.toLowerCase().includes(searchText) ||
              cmd.description.toLowerCase().includes(searchText) ||
              (cmd.example && cmd.example.toLowerCase().includes(searchText))
          );

          // Include section if title matches OR if any commands match
          if (titleMatches || matchingCommands.length > 0) {
            return {
              ...section,
              commands: titleMatches ? section.commands : matchingCommands,
            };
          }
        }
        return null;
      })
      .filter((section) => section !== null) as CheatSheetSection[];
  }, [filterText]);

  return (
    <Page active="cheatsheet">
      <div className="cheatsheet-container">
        <CheatSheetFilter
          filterText={filterText}
          onFilterChange={setFilterText}
          allCollapsed={allCollapsed}
          onToggleAll={toggleAll}
        />
        <div className="cheatsheet-sections">
          {filteredSections.map(
            (section) =>
              section && (
                <CheatSheetAccordion
                  key={section.id}
                  section={section}
                  isOpen={openSections[section.id] ?? true}
                  onToggle={() => toggleSection(section.id)}
                />
              )
          )}
        </div>
        {filteredSections.length === 0 && (
          <div className="cheatsheet-no-results">
            No results found for "{filterText}"
          </div>
        )}
      </div>
    </Page>
  );
};

export default CheatSheet;
