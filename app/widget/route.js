export async function GET() {
  const js = `
(function () {
  try {
    if (window.__VISITOR_WIDGET_LOADED__) return;
    window.__VISITOR_WIDGET_LOADED__ = true;

    const scriptEl = document.currentScript;
    const domainName = scriptEl.getAttribute("data-domain") || window.location.hostname;
    const style = scriptEl.getAttribute("data-style") || "bubble-1";
    const scriptUrl = new URL(scriptEl.src);
    const host = scriptUrl.origin;

    // Inject CSS
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = host + "/styles/" + style + ".css";
    css.crossOrigin = "anonymous";
    css.onerror = () => console.warn("[Visitor Widget] Failed to load style:", css.href);
    document.head.appendChild(css);

    // Create widget container
    const container = document.createElement("div");
    container.id = "visitor-widget-container";
    container.setAttribute("aria-live", "polite");

    // Get icon based on style
    function getIcon(styleId) {
      if (styleId === 'retro') {
        return '<circle cx="12" cy="12" r="5" fill="#22c55e" />';
      } else if (styleId === 'cyber') {
        return '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />';
      } else if (styleId === 'bubble-1') {
        return '<circle cx="12" cy="12" r="10" />';
      } else {
        return '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />';
      }
    }

    // Format count based on style
    function formatCount(count, styleId) {
      if (styleId === 'retro') {
        return count.toString().padStart(6, '0');
      }
      return new Intl.NumberFormat('en-US').format(count);
    }

    // Build HTML
    const alignItems = style === 'bubble-1' ? 'center' : 'flex-start';
    const marginLeft = style === 'bubble-1' ? '0' : '0.125rem';

    container.innerHTML = \`
      <div class="oc-widget-\${style}">
        <span class="oc-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            \${getIcon(style)}
          </svg>
        </span>
        <div class="oc-content" style="display: flex; flex-direction: column; align-items: \${alignItems}; line-height: 1; margin-left: \${marginLeft};">
          <span class="count">…</span>
          <span style="font-size: 0.55em; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; margin-top: 0.125rem;">Visitors</span>
        </div>
      </div>
    \`;
    document.body.appendChild(container);

    // Track visit
    fetch(host + "/api/trackVisit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domainName: domainName,
        url: window.location.href,
        referrer: document.referrer || null,
        timestamp: Date.now()
      })
    }).catch((err) => {
      console.warn("[Visitor Widget] Tracking failed:", err);
    });

    // Fetch and update stats
    function updateStats() {
      fetch(host + "/api/getVisitor?domainName=" + encodeURIComponent(domainName))
        .then((r) => {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then((res) => {
          const el = container.querySelector(".count");
          if (el) el.textContent = formatCount(res.totalVisitors ?? 0, style);
        })
        .catch((err) => {
          console.warn("[Visitor Widget] Stats fetch failed:", err);
          const el = container.querySelector(".count");
          if (el) el.textContent = "—";
        });
    }

    updateStats();

    const refresh = scriptEl.getAttribute("data-refresh");
    if (refresh !== "false") {
      const interval = parseInt(refresh) || 30000;
      setInterval(updateStats, interval);
    }
  } catch (err) {
    console.error("[Visitor Widget] Error:", err);
  }
})();
`;

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Access-Control-Allow-Origin": "*"
    }
  });
}