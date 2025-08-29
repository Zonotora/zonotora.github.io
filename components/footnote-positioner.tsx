import { useEffect } from 'react';

export default function FootnotePositioner() {
  useEffect(() => {
    const positionFootnotes = () => {
      const footnoteContainers = document.querySelectorAll('.footnote-container');
      const footnoteSides = document.querySelectorAll('.footnote-sides');
      
      if (footnoteContainers.length === 0) return;
      
      // Reset all positions first
      footnoteSides.forEach(side => {
        (side as HTMLElement).style.top = '0px';
      });
      
      let currentBottom = 0;
      
      footnoteContainers.forEach((container, index) => {
        const sides = container.querySelector('.footnote-sides') as HTMLElement;
        if (!sides) return;
        
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        
        // Calculate the minimum top position to avoid overlap
        const minTop = Math.max(0, currentBottom - containerTop);
        
        // Set the position
        sides.style.top = `${minTop}px`;
        
        // Update currentBottom for next footnote
        const sidesRect = sides.getBoundingClientRect();
        currentBottom = containerTop + minTop + sidesRect.height + 8; // 8px margin
      });
    };
    
    // Position footnotes on load
    positionFootnotes();
    
    // Reposition on window resize
    const handleResize = () => {
      setTimeout(positionFootnotes, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Reposition on scroll (for dynamic content changes)
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setTimeout(positionFootnotes, 100);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Observer for content changes
    const observer = new MutationObserver(() => {
      setTimeout(positionFootnotes, 100);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);
  
  return null;
}