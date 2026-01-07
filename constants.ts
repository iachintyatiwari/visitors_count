
import { WidgetStyle } from "./types";

export const CSS_BUBBLE_1 = `.oc-widget-bubble-1 {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  background-color: #18181b;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid #3f3f46;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  min-width: 90px;
  position: relative;
}
.oc-widget-bubble-1:hover {
  transform: translateY(-1px);
}
.oc-widget-bubble-1 .oc-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  fill: #f97316;
  color: #f97316;
}`;

export const CSS_BUBBLE_2 = `.oc-widget-bubble-2 {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  padding: 8px 16px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
}
.oc-widget-bubble-2:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.oc-icon {
  width: 16px;
  height: 16px;
  color: #2563eb;
}`;

export const CSS_RETRO = `.oc-widget-retro {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: #000000;
  color: #22c55e;
  padding: 6px 14px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 15px;
  font-weight: 700;
  border: 2px solid #333;
  border-bottom-color: #444;
  border-right-color: #444;
  box-shadow: inset 0 0 8px rgba(34, 197, 94, 0.15);
  letter-spacing: 1px;
}
.oc-widget-retro:hover {
  border-color: #444;
}
.oc-icon {
  width: 15px;
  height: 15px;
  color: #22c55e;
}`;

export const CSS_CYBER = `.oc-widget-cyber {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #09090b;
  color: #e879f9;
  padding: 8px 18px;
  border-radius: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid #c026d3;
  box-shadow: 0 0 15px rgba(192, 38, 211, 0.3), inset 0 0 10px rgba(192, 38, 211, 0.1);
  text-shadow: 0 0 5px rgba(232, 121, 249, 0.5);
  transition: all 0.3s ease;
}
.oc-widget-cyber:hover {
  box-shadow: 0 0 25px rgba(192, 38, 211, 0.5), inset 0 0 15px rgba(192, 38, 211, 0.2);
  border-color: #e879f9;
}
.oc-icon {
  width: 16px;
  height: 16px;
  color: #e879f9;
  filter: drop-shadow(0 0 2px currentColor);
}`;

export const CSS_PLANE_NUMBERS = `.oc-widget-plane-numbers {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: transparent;
  color: #ffffff; /* changed to white */
  font-family: 'Inter', sans-serif;
  font-size: 16px; /* increased number size */
  font-weight: 500;
}

.oc-widget-plane-numbers .count {
  font-variant-numeric: tabular-nums;
}

.oc-widget-plane-numbers .oc-icon {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}
}`


export const WIDGET_STYLES: WidgetStyle[] = [
    {
    id: "plane",
    name: "Plane Numbers",
    description: "Simple and clean with a focus on clarity. Works well on any background.",
    cssContent: CSS_PLANE_NUMBERS,
    className: "oc-widget-plane-numbers",
  },
  {
    id: "bubble-1",
    name: "Dark Badge",
    description: "High contrast, rounded pill shape. Great for light backgrounds.",
    cssContent: CSS_BUBBLE_1,
    className: "oc-widget-bubble-1",
  },
  // {
  //   id: "bubble-2",
  //   name: "Light Border",
  //   description: "Clean white pill with a subtle border. Fits anywhere.",
  //   cssContent: CSS_BUBBLE_2,
  //   className: "oc-widget-bubble-2",
  // },
  {
    id: "retro",
    name: "Retro Digital",
    description: "Old-school digital stopwatch look. Perfect for developer portfolios.",
    cssContent: CSS_RETRO,
    className: "oc-widget-retro",
  },
  {
    id: "cyber",
    name: "Cyber Pulse",
    description: "Futuristic neon glow with technical typography. Stands out on dark modes.",
    cssContent: CSS_CYBER,
    className: "oc-widget-cyber",
  },
];