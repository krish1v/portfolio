import { useEffect, useRef } from "react";

/**
 * HeroWaves — a calm, generative wavefield for the hero.
 *
 * A stack of horizontal ribbons that undulate through layered sine waves and
 * drift slowly sideways, like light moving over silk or a contour map breathing.
 * Rendered crisply enough to read as an intentional visual, not a faint texture.
 * Freezes to a single still frame under `prefers-reduced-motion`, and pauses
 * when the tab is hidden or the canvas scrolls offscreen.
 */

type HeroWavesProps = {
  className?: string;
  /** Base stroke colour as "r, g, b". */
  strokeRGB?: string;
};

export function HeroWaves({ className, strokeRGB = "17, 20, 28" }: HeroWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let t = 0;

    const SPACING = 24; // vertical distance between ribbons (px)
    const AMP = 20; // wave amplitude (px)
    const STEP = 8; // horizontal sampling resolution (px)

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const rows = Math.ceil(height / SPACING) + 2;
      for (let r = 0; r < rows; r++) {
        const baseY = r * SPACING - SPACING;
        // Depth: ribbons toward the vertical centre read a touch stronger.
        const centreBias = 1 - Math.abs(baseY - height / 2) / (height / 2 + 1);
        const alpha = 0.06 + 0.19 * Math.max(0, centreBias);

        ctx.beginPath();
        for (let x = -STEP; x <= width + STEP; x += STEP) {
          const n =
            Math.sin(x * 0.0055 + t + r * 0.34) * 1.0 +
            Math.sin(x * 0.0131 - t * 0.7 + r * 0.19) * 0.5 +
            Math.sin(x * 0.0223 + t * 0.42) * 0.22;
          const y = baseY + n * AMP;
          if (x <= -STEP) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${strokeRGB}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function frame() {
      if (!running) return;
      t += 0.006;
      draw();
      raf = requestAnimationFrame(frame);
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      draw();
    }

    function start() {
      if (reduceMotion || running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!reduceMotion) start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [strokeRGB]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
