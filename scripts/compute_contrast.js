/**
 * Compute color contrast ratios for all visible text elements on the current slide.
 * Designed to be executed via Chrome DevTools MCP `evaluate_script` tool.
 *
 * Usage (in MCP evaluate_script):
 *   Copy this entire function body into the `function` parameter:
 *   () => { <paste content> }
 *
 * Or use it as a reference — the audit steering file describes how to call it inline.
 *
 * Returns: Array of objects with contrast analysis for each text element.
 */

// This is the function body to pass to evaluate_script:
// () => {
function computeContrastForSlide() {
  // --- Helpers ---
  function luminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  function contrastRatio(l1, l2) {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function parseColor(str) {
    if (!str) return null;
    // rgb(r, g, b) or rgba(r, g, b, a)
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (m) {
      return { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]), a: m[4] !== undefined ? parseFloat(m[4]) : 1 };
    }
    return null;
  }

  function blendOnWhite(color) {
    // Blend a semi-transparent color onto white background
    const a = color.a;
    return {
      r: Math.round(color.r * a + 255 * (1 - a)),
      g: Math.round(color.g * a + 255 * (1 - a)),
      b: Math.round(color.b * a + 255 * (1 - a)),
      a: 1,
    };
  }

  function getEffectiveBackground(el) {
    // Walk up the DOM to find an opaque background
    let current = el;
    const layers = [];

    while (current && current !== document.documentElement) {
      const style = window.getComputedStyle(current);
      const bg = parseColor(style.backgroundColor);
      if (bg && bg.a > 0) {
        layers.unshift(bg);
      }
      if (bg && bg.a === 1) break; // opaque, stop here
      current = current.parentElement;
    }

    // Start with white and blend layers on top
    let result = { r: 255, g: 255, b: 255, a: 1 };
    for (const layer of layers) {
      const a = layer.a;
      result = {
        r: Math.round(layer.r * a + result.r * (1 - a)),
        g: Math.round(layer.g * a + result.g * (1 - a)),
        b: Math.round(layer.b * a + result.b * (1 - a)),
        a: 1,
      };
    }
    return result;
  }

  // --- Main Logic ---
  const results = [];
  const seen = new Set();

  // Get the active slide content
  const slideEl = document.querySelector('.slidev-page[aria-current="true"]')
    || document.querySelector('[class*="slidev-page-"]');

  const root = slideEl || document.body;

  // Find all text-bearing elements
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.textContent.trim();
      if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const style = window.getComputedStyle(parent);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node;
  while ((node = walker.nextNode())) {
    const el = node.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);

    const style = window.getComputedStyle(el);
    const text = node.textContent.trim().substring(0, 50);
    const fgColor = parseColor(style.color);
    if (!fgColor) continue;

    // Apply element opacity to foreground
    const opacity = parseFloat(style.opacity) || 1;
    const effectiveFg = {
      r: fgColor.r,
      g: fgColor.g,
      b: fgColor.b,
      a: fgColor.a * opacity,
    };

    const bgColor = getEffectiveBackground(el);
    const blendedFg = blendOnWhite({ ...effectiveFg, r: effectiveFg.r, g: effectiveFg.g, b: effectiveFg.b, a: effectiveFg.a });

    // Blend fg onto resolved bg (not white)
    const finalFg = {
      r: Math.round(effectiveFg.r * effectiveFg.a + bgColor.r * (1 - effectiveFg.a)),
      g: Math.round(effectiveFg.g * effectiveFg.a + bgColor.g * (1 - effectiveFg.a)),
      b: Math.round(effectiveFg.b * effectiveFg.a + bgColor.b * (1 - effectiveFg.a)),
    };

    const fgLum = luminance(finalFg.r, finalFg.g, finalFg.b);
    const bgLum = luminance(bgColor.r, bgColor.g, bgColor.b);
    const ratio = contrastRatio(fgLum, bgLum);

    const fontSize = parseFloat(style.fontSize);
    const fontWeight = parseInt(style.fontWeight) || 400;
    const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);

    const passesAA = isLargeText ? ratio >= 3 : ratio >= 4.5;
    const passesAAA = isLargeText ? ratio >= 4.5 : ratio >= 7;

    // Only report items that fail or are borderline
    if (ratio < 7) {
      results.push({
        text,
        color: style.color,
        effectiveBg: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
        ratio: Math.round(ratio * 100) / 100,
        fontSize: `${fontSize}px`,
        fontWeight,
        isLargeText,
        passesAA,
        passesAAA,
        status: !passesAA ? 'FAIL' : !passesAAA ? 'AA only' : 'AAA',
      });
    }
  }

  // Sort by ratio ascending (worst first)
  results.sort((a, b) => a.ratio - b.ratio);

  return results.slice(0, 30);
}

// Export for use in evaluate_script
// return computeContrastForSlide();
// }

// For direct Node.js usage (testing):
if (typeof module !== 'undefined') {
  module.exports = { computeContrastForSlide };
}
