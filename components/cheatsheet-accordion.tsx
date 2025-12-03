import { CheatSheetSection } from "../lib/types";

type Props = {
  section: CheatSheetSection;
  isOpen: boolean;
  onToggle: () => void;
};

const CheatSheetAccordion = ({ section, isOpen, onToggle }: Props) => {
  return (
    <div className="cheatsheet-section">
      <div className="cheatsheet-section-header" onClick={onToggle}>
        <span className="cheatsheet-section-arrow">{isOpen ? "▼" : "▶"}</span>
        <div className="cheatsheet-section-header-content">
          <h3 className="cheatsheet-section-title">{section.title}</h3>
          {section.description && (
            <p className="cheatsheet-section-description">
              {section.description}
            </p>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="cheatsheet-section-content">
          {section.subsections ? (
            // Render subsections
            section.subsections.map((subsection, subsectionIdx) => (
              <div key={subsectionIdx} className="cheatsheet-subsection">
                <h4 className="cheatsheet-subsection-title">
                  {subsection.title}
                </h4>
                <div className="cheatsheet-commands-grid">
                  {subsection.commands.map((cmd, idx) => (
                    <div key={idx} className="cheatsheet-command">
                      <div className="cheatsheet-command-text">
                        <code className="cheatsheet-command-code">
                          {cmd.command}
                        </code>
                      </div>
                      <div className="cheatsheet-command-description">
                        {cmd.description}
                      </div>
                      {cmd.example && (
                        <div className="cheatsheet-command-example">
                          Example: <code>{cmd.example}</code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Render commands directly if no subsections
            <div className="cheatsheet-commands-grid">
              {section.commands?.map((cmd, idx) => (
                <div key={idx} className="cheatsheet-command">
                  <div className="cheatsheet-command-text">
                    <code className="cheatsheet-command-code">
                      {cmd.command}
                    </code>
                  </div>
                  <div className="cheatsheet-command-description">
                    {cmd.description}
                  </div>
                  {cmd.example && (
                    <div className="cheatsheet-command-example">
                      Example: <code>{cmd.example}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheatSheetAccordion;
