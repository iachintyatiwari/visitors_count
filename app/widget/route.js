export async function GET() {
  const js = `
(function () {
  try {
    if (window.__VISITOR_WIDGET_LOADED__) return;
    window.__VISITOR_WIDGET_LOADED__ = true;

    const scriptEl = document.currentScript;
    const Key = scriptEl.getAttribute("data-key") || window.location.hostname;
    const style = scriptEl.getAttribute("data-style") || "bubble-1";
    const position = scriptEl.getAttribute("data-position") || "top-right";

    // 🔥 NEW
    const mode = scriptEl.getAttribute("data-mode") || "floating";
    const targetId = scriptEl.getAttribute("data-target");

    const scriptUrl = new URL(scriptEl.src);
    const host = scriptUrl.origin;

    // Helper function to get cookie
    function getCookie(name) {
      const cookies = document.cookie ? document.cookie.split('; ') : [];
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    }

    // Helper function to set cookie (minutes)
    function setCookie(name, value, minutes) {
      const now = new Date();
      const expirationTime = now.getTime() + (minutes * 60 * 1000);
      const expirationDate = new Date(expirationTime);
      document.cookie = name + "=" + value + "; expires=" + expirationDate.toUTCString() + "; path=/";
    }

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

    /* ===========================
       📍 POSITION HANDLING
    ============================ */

    if (mode === "inline") {
      // INLINE MODE
      container.style.position = "relative";
      container.style.zIndex = "auto";

      let targetEl = null;

      if (targetId) {
        targetEl = document.getElementById(targetId);
      } else if (scriptEl.parentElement && scriptEl.parentElement !== document.body) {
        targetEl = scriptEl.parentElement;
      }

      if (!targetEl) {
        console.warn("[Visitor Widget] Inline target not found, falling back to floating");
      } else {
        targetEl.appendChild(container);
      }
    }

    if (mode === "floating" || !container.parentElement) {
      // FLOATING MODE (default)
      container.style.position = "fixed";
      container.style.zIndex = "99999";

      const [vertical, horizontal] = position.split('-');

      if (vertical === "top") {
        container.style.top = "20px";
      } else {
        container.style.bottom = "20px";
      }

      if (horizontal === "left") {
        container.style.left = "20px";
      } else {
        container.style.right = "20px";
      }

      document.body.appendChild(container);
    }

    function getIcon(styleId) {
      if (styleId === "retro") return '<circle cx="12" cy="12" r="5" fill="#22c55e" />';
      if (styleId === "cyber") return '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />';
      if (styleId === "bubble-1") return '<circle cx="12" cy="12" r="10" />';
      return '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" />';
    }

    function formatCount(count, styleId) {
      return styleId === "retro"
        ? count.toString().padStart(6, "0")
        : new Intl.NumberFormat("en-IN").format(count);
    }

    container.innerHTML = \`
      <div class="oc-widget-\${style}">
        <span class="oc-icon">
          <svg viewBox="0 0 24 24">\${getIcon(style)}</svg>
        </span>
        <div class="oc-content">
          <span class="count">…</span>
          <span class="label">Visitors</span>
        </div>
      </div>
    \`;

    const hasVisited = getCookie("visitor_tracked");

    if (!hasVisited) {
      fetch(host + "/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Key: Key,
          url: window.location.href,
          referrer: document.referrer || null,
          timestamp: Date.now()
        })
      })
      .then((response) => {
        if (response.ok) {
          // Set cookie for 10 minutes after successful tracking (adjust as needed)
          setCookie('visitor_tracked', 'true', 10);
        }
      })
      .catch((err) => {
        console.warn("[Visitor Widget] Tracking failed:", err);
      });
    }

    function updateStats() {
      fetch(host + "/api/getVisitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Key })
      })
        .then(r => r.json())
        .then(res => {
          const el = container.querySelector(".count");
          if (el) el.textContent = formatCount(res.totalVisitors ?? 0, style);
        })
        .catch(() => {
          const el = container.querySelector(".count");
          if (el) el.textContent = "—";
        });
    }

    updateStats();

    const refresh = scriptEl.getAttribute("data-refresh-time");
    if (refresh !== "false") {
      setInterval(updateStats, parseInt(refresh) || 300000);
    }
  } catch (err) {
    console.error("[Visitor Widget] Error:", err);
  }
})();
`;

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
