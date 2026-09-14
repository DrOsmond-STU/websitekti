/*
 * Hero background — constellation field.
 *
 * A lightweight Canvas 2D particle network: nodes drift slowly and draw a
 * connecting line to nearby neighbours, fading with distance. Pure vanilla
 * JS, no dependencies — sized to the hero section, capped device-pixel
 * ratio, paused off-screen tabs, and reduced to a single static frame for
 * prefers-reduced-motion.
 */
(function () {
  "use strict";

  var canvas = document.getElementById("heroConstellation");
  if (!canvas || !canvas.getContext) return;

  var hero = canvas.closest(".hero");
  if (!hero) return;

  var ctx = canvas.getContext("2d");
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var LINK_DIST = 130; // px, connection radius between nodes
  var NODE_COLOR = "245,166,35";   // accent gold (--c-accent-500)
  var LINE_COLOR = "46,138,239";   // primary blue (--c-primary-500)

  var particles = [];
  var cssWidth = 0;
  var cssHeight = 0;
  var rafId = null;
  var running = false;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function targetCount(w, h) {
    var area = Math.max(w * h, 0);
    var count = Math.round(area / 9000);
    return Math.max(24, Math.min(90, count));
  }

  function makeParticle(w, h) {
    var speed = reduceMotion ? 0 : rand(0.05, 0.22);
    var angle = rand(0, Math.PI * 2);
    return {
      x: rand(0, w),
      y: rand(0, h),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: rand(1.1, 2.4),
    };
  }

  function resize() {
    var rect = hero.getBoundingClientRect();
    cssWidth = Math.max(rect.width, 1);
    cssHeight = Math.max(rect.height, 1);

    canvas.width = Math.round(cssWidth * DPR);
    canvas.height = Math.round(cssHeight * DPR);
    canvas.style.width = cssWidth + "px";
    canvas.style.height = cssHeight + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    var want = targetCount(cssWidth, cssHeight);
    if (particles.length < want) {
      while (particles.length < want) {
        particles.push(makeParticle(cssWidth, cssHeight));
      }
    } else if (particles.length > want) {
      particles.length = want;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    if (!reduceMotion) {
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = cssWidth + 20;
        else if (p.x > cssWidth + 20) p.x = -20;
        if (p.y < -20) p.y = cssHeight + 20;
        else if (p.y > cssHeight + 20) p.y = -20;
      }
    }

    ctx.lineWidth = 1;
    for (var a = 0; a < particles.length; a++) {
      var pa = particles[a];
      for (var b = a + 1; b < particles.length; b++) {
        var pb = particles[b];
        var dx = pa.x - pb.x;
        var dy = pa.y - pb.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          var alpha = (1 - dist / LINK_DIST) * 0.35;
          ctx.strokeStyle = "rgba(" + LINE_COLOR + "," + alpha.toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < particles.length; k++) {
      var pn = particles[k];
      ctx.beginPath();
      ctx.fillStyle = "rgba(" + NODE_COLOR + ",0.85)";
      ctx.arc(pn.x, pn.y, pn.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    draw();
    if (running) rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  resize();
  draw();
  start();

  window.addEventListener(
    "resize",
    function () {
      resize();
      if (reduceMotion) draw();
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });
})();
