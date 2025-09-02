import { useEffect } from "react";

const CopyButtons = () => {
  useEffect(() => {
    // Create copy icon SVG
    const createCopyIcon = (size = "16") => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 512 512");
      svg.setAttribute("width", size);
      svg.setAttribute("height", size);
      svg.style.fill = "var(--color)";
      svg.style.cursor = "pointer";
      svg.innerHTML = `
        <path d="M224 0c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h224c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h224c35.3 0 64-28.7 64-64v-32H288v32c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32h32V160H64z"/>
      `;
      return svg;
    };

    // Find all KaTeX display math elements (block equations)
    const displayMathElements = document.querySelectorAll(".katex-display");

    displayMathElements.forEach((mathElement) => {
      // Skip if already processed
      if (mathElement.querySelector(".math-copy-btn")) {
        return;
      }

      // Create wrapper for relative positioning
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      wrapper.style.width = "100%";

      // Insert wrapper before math element and move math element inside
      mathElement.parentNode?.insertBefore(wrapper, mathElement);
      wrapper.appendChild(mathElement);

      // Create copy button
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn copy-btn-display";

      // Add copy icon to button
      copyBtn.appendChild(createCopyIcon());

      // Add button to wrapper
      wrapper.appendChild(copyBtn);

      // Show/hide button on hover
      wrapper.addEventListener("mouseenter", () => {
        copyBtn.style.opacity = "0.7";
      });

      wrapper.addEventListener("mouseleave", () => {
        copyBtn.style.opacity = "0";
      });

      // Copy functionality
      copyBtn.addEventListener("click", async () => {
        try {
          // Find the script tag with LaTeX source
          const scriptTag =
            mathElement.querySelector(
              'script[type="math/tex; mode=display"]'
            ) || mathElement.querySelector('script[type="math/tex"]');

          let latexSource = "";

          if (scriptTag) {
            // Get LaTeX from script tag
            latexSource = scriptTag.textContent || "";
          } else {
            // Fallback: try to extract from annotation
            const annotation = mathElement.querySelector(
              'annotation[encoding="application/x-tex"]'
            );
            if (annotation) {
              latexSource = annotation.textContent || "";
            }
          }

          // Clean up the LaTeX source
          latexSource = latexSource.trim();

          // For display math, wrap in $$ if not already wrapped
          if (latexSource && !latexSource.startsWith("$$")) {
            latexSource = `$$\n${latexSource}\n$$`;
          }

          if (latexSource) {
            await navigator.clipboard.writeText(latexSource);

            // Visual feedback
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = `
              <svg viewBox="0 0 512 512" width="16" height="16" style="fill: var(--primary);">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
              </svg>
            `;

            setTimeout(() => {
              copyBtn.innerHTML = originalIcon;
            }, 1500);
          }
        } catch (err) {
          console.error("Failed to copy LaTeX:", err);
        }
      });
    });

    // Also handle inline math elements
    const inlineMathElements = document.querySelectorAll(
      ".katex:not(.katex-display)"
    );

    inlineMathElements.forEach((mathElement) => {
      // Skip if already processed or if it's inside a display math
      if (
        mathElement.querySelector(".copy-btn") ||
        mathElement.closest(".katex-display")
      ) {
        return;
      }

      // Create wrapper for relative positioning
      const wrapper = document.createElement("span");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";

      // Insert wrapper before math element and move math element inside
      mathElement.parentNode?.insertBefore(wrapper, mathElement);
      wrapper.appendChild(mathElement);

      // Create copy button for inline math
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn copy-btn-inline";

      // Add smaller copy icon to button
      const smallIcon = createCopyIcon();
      smallIcon.setAttribute("width", "12");
      smallIcon.setAttribute("height", "12");
      copyBtn.appendChild(smallIcon);

      // Add button to wrapper
      wrapper.appendChild(copyBtn);

      // Show/hide button on hover
      wrapper.addEventListener("mouseenter", () => {
        copyBtn.style.opacity = "0.7";
      });

      wrapper.addEventListener("mouseleave", () => {
        copyBtn.style.opacity = "0";
      });

      // Copy functionality for inline math
      copyBtn.addEventListener("click", async () => {
        try {
          // Find the script tag with LaTeX source
          const scriptTag = mathElement.querySelector(
            'script[type="math/tex"]'
          );

          let latexSource = "";

          if (scriptTag) {
            // Get LaTeX from script tag
            latexSource = scriptTag.textContent || "";
          } else {
            // Fallback: try to extract from annotation
            const annotation = mathElement.querySelector(
              'annotation[encoding="application/x-tex"]'
            );
            if (annotation) {
              latexSource = annotation.textContent || "";
            }
          }

          // Clean up the LaTeX source
          latexSource = latexSource.trim();

          // For inline math, wrap in $ if not already wrapped
          if (latexSource && !latexSource.startsWith("$")) {
            latexSource = `$${latexSource}$`;
          }

          if (latexSource) {
            await navigator.clipboard.writeText(latexSource);

            // Visual feedback
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = `
              <svg viewBox="0 0 512 512" width="12" height="12" style="fill: var(--primary);">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
              </svg>
            `;

            setTimeout(() => {
              copyBtn.innerHTML = originalIcon;
            }, 1500);
          }
        } catch (err) {
          console.error("Failed to copy LaTeX:", err);
        }
      });
    });

    // Handle code blocks
    const codeBlocks = document.querySelectorAll("pre[class*='language-']");

    codeBlocks.forEach((codeBlock) => {
      // Skip if already processed
      if (codeBlock.querySelector(".copy-btn")) {
        return;
      }

      // Create wrapper for relative positioning
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "block";

      // Insert wrapper before code block and move code block inside
      codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
      wrapper.appendChild(codeBlock);

      // Create copy button for code blocks
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn copy-btn-code";

      // Add copy icon to button
      copyBtn.appendChild(createCopyIcon("14"));

      // Add button to wrapper
      wrapper.appendChild(copyBtn);

      // Show/hide button on hover
      wrapper.addEventListener("mouseenter", () => {
        copyBtn.style.opacity = "0.7";
      });

      wrapper.addEventListener("mouseleave", () => {
        copyBtn.style.opacity = "0";
      });

      // Copy functionality for code blocks
      copyBtn.addEventListener("click", async () => {
        try {
          // Get the code element inside the pre
          const codeElement = codeBlock.querySelector("code");
          let codeContent = "";

          if (codeElement) {
            // Get text content, preserving line breaks
            codeContent =
              codeElement.textContent || codeElement.innerText || "";
          } else {
            // Fallback to pre content
            codeContent = codeBlock.textContent || "";
          }

          // Clean up the code content
          codeContent = codeContent.trim();

          if (codeContent) {
            await navigator.clipboard.writeText(codeContent);

            // Visual feedback
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = `
              <svg viewBox="0 0 512 512" width="14" height="14" style="fill: var(--primary);">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
              </svg>
            `;

            setTimeout(() => {
              copyBtn.innerHTML = originalIcon;
            }, 1500);
          }
        } catch (err) {
          console.error("Failed to copy code:", err);
        }
      });
    });
  }, []);

  return null; // This component doesn't render anything visible
};

export default CopyButtons;
