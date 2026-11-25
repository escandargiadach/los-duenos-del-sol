// Brasas de fondo (Libro III): chispas que suben y se apagan, en el lugar de la
// nieve del Libro II. Mismas reglas que nieve.js, que ya se probaron en el
// telefono: pocas particulas, se apaga con reduced-motion y con la pestaña
// oculta, y en telefono se detiene mientras suena el audio (16-sep, el canvas
// entrecortaba el sonido).
(() => {
  "use strict";
  const canvas = document.getElementById("brasas");
  if (!canvas || !canvas.getContext) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { canvas.remove(); return; }

  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, sparks = [], raf = 0, last = 0;

  function spark(anywhere) {
    const depth = Math.random();            // 0 lejos, 1 cerca
    const life = 5 + Math.random() * 7;     // segundos hasta apagarse
    return {
      x: Math.random() * w,
      y: anywhere ? h * (0.25 + Math.random() * 0.8) : h + 6,
      r: 0.6 + depth * 1.7,
      vy: 14 + depth * 34,                  // px por segundo, hacia arriba
      drift: 8 + Math.random() * 18,
      phase: Math.random() * Math.PI * 2,
      age: anywhere ? Math.random() * life : 0,
      life,
      depth
    };
  }

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const movil = w <= 900;
    const target = Math.round(Math.min(movil ? 26 : 70, (w * h) / (movil ? 28000 : 18000)));
    while (sparks.length < target) sparks.push(spark(true));
    sparks.length = target;
  }

  function frame(t) {
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    for (const s of sparks) {
      s.age += dt;
      s.phase += dt * 1.3;
      s.y -= s.vy * dt;
      s.x += Math.sin(s.phase) * s.drift * dt;
      if (s.age > s.life || s.y < -10) { Object.assign(s, spark(false)); continue; }
      if (s.x < -10) s.x = w + 10; else if (s.x > w + 10) s.x = -10;
      // nace ambar, se enfria a carmesi y se apaga; parpadea como una brasa
      const k = s.age / s.life;
      const fade = Math.min(1, s.age * 2) * (1 - k);
      const flicker = 0.75 + 0.25 * Math.sin(s.phase * 5.3);
      const a = (0.25 + s.depth * 0.55) * fade * flicker;
      const g = Math.round(170 - 120 * k), b = Math.round(70 - 50 * k);
      if (s.depth > 0.6) {                  // halo solo en las cercanas
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,${g},${b},${a * 0.18})`;
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,${g + 50},${b + 40},${a})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(frame);
  }

  function parar() { cancelAnimationFrame(raf); raf = 0; }
  function seguir() { if (!raf && !document.hidden && !suena()) { last = 0; raf = requestAnimationFrame(frame); } }
  // en telefono las brasas se detienen mientras suena el audio: primero se oye bien
  function suena() {
    const a = document.getElementById("audio");
    return window.innerWidth <= 900 && a && !a.paused;
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) parar(); else seguir();
  });
  const audio = document.getElementById("audio");
  if (audio) {
    audio.addEventListener("play", () => { if (suena()) { parar(); ctx.clearRect(0, 0, w, h); } });
    audio.addEventListener("pause", seguir);
    audio.addEventListener("ended", seguir);
  }
  window.addEventListener("resize", size, { passive: true });
  size();
  raf = requestAnimationFrame(frame);
})();
