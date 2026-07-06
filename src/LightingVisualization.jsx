import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   LIGHTING SYSTEM 3D VISUALIZER
   Embedded Three.js scene — no Room Lights button (removed per spec).
   Canvas sized to container. Overlays use pointer-events:none so drag/zoom
   passes through to the canvas. Buttons have pointer-events:auto.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function LightingVisualization() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({
    scene: null, camera: null, renderer: null,
    fixtures: [], roomLights: [],
    drag: false, px: 0, py: 0, ax: 0.30, ay: 0.85, dist: 40,
    bw: null, lw: null, rw: null, floor: null,
  });
  const [mode, setMode] = useState("perf");
  const [threeLoaded, setThreeLoaded] = useState(false);

  // Load Three.js once
  useEffect(() => {
    if (window.THREE) {
      setThreeLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => setThreeLoaded(true);
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // Initialize scene when Three.js is ready and container exists
  useEffect(() => {
    if (!threeLoaded || !containerRef.current) return;
    const s = stateRef.current;
    if (s.scene) return;
    initThree(s, containerRef.current);
  }, [threeLoaded]);

  // Sync mode
  useEffect(() => {
    const s = stateRef.current;
    if (s.setMode) s.setMode(mode);
  }, [mode, threeLoaded]);

  function initThree(s, container) {
    const THREE = window.THREE;
    const M = (c, r) => new THREE.MeshStandardMaterial({ color: c, roughness: r });

    const W = container.clientWidth;
    const H = container.clientHeight || 500;

    // ─── Scene ───────────────────────────────────────────────────────
    s.scene = new THREE.Scene();
    s.scene.fog = new THREE.FogExp2(0x0a0807, 0.009);
    s.camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200);
    s.renderer = new THREE.WebGLRenderer({ antialias: true });
    s.renderer.setSize(W, H);
    s.renderer.setClearColor(0x0a0807);

    // Create a canvas wrapper div and append canvas to container
    const canvasEl = s.renderer.domElement;
    canvasEl.style.position = "absolute";
    canvasEl.style.top = "0";
    canvasEl.style.left = "0";
    canvasEl.style.width = "100%";
    canvasEl.style.height = "100%";
    canvasRef.current = canvasEl;
    container.appendChild(canvasEl);

    const cam = () => {
      s.camera.position.set(
        Math.sin(s.ay) * s.dist * Math.cos(s.ax),
        Math.sin(s.ax) * s.dist + 9,
        Math.cos(s.ay) * s.dist * Math.cos(s.ax) + 4
      );
      s.camera.lookAt(0, 7, -2);
    };

    // All drag/zoom events on the canvas element directly
    canvasEl.addEventListener("pointerdown", (e) => {
      s.drag = true;
      s.px = e.clientX;
      s.py = e.clientY;
    });
    canvasEl.addEventListener("pointerup", () => { s.drag = false; });
    canvasEl.addEventListener("pointerleave", () => { s.drag = false; });
    canvasEl.addEventListener("pointermove", (e) => {
      if (!s.drag) return;
      s.ay -= (e.clientX - s.px) * 0.005;
      s.ax = Math.max(0.05, Math.min(1.2, s.ax + (e.clientY - s.py) * 0.005));
      s.px = e.clientX; s.py = e.clientY;
      cam();
    });
    canvasEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      s.dist = Math.max(14, Math.min(70, s.dist + e.deltaY * 0.03));
      cam();
    }, { passive: false });

    // Resize observer
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      s.renderer.setSize(w, h);
      s.camera.aspect = w / h;
      s.camera.updateProjectionMatrix();
    });
    ro.observe(container);

    cam();

    // ─── Measurements ────────────────────────────────────────────────
    const ROOM_W = 18.5, ROOM_L = 24, ROOM_H = 30;
    const STAGE_W = 18.5, STAGE_D = 8.2, STAGE_H = 2;
    const BWZ = -ROOM_L / 2;
    const SFZ = BWZ + STAGE_D;
    const SZ = BWZ + STAGE_D / 2;
    const ROW_H = 11.3;
    const ROW_A_Z = SFZ;
    const ROW_B_Z = ROW_A_Z + 9.2;
    const RACK_LEN = 8.5, DZ = 10 / 12;
    const USABLE = RACK_LEN - DZ * 2;
    const CEIL_Y = ROOM_H - 1;

    // ─── Room geometry ───────────────────────────────────────────────
    s.floor = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_L), M(0x141414, 0.9));
    s.floor.rotation.x = -Math.PI / 2; s.scene.add(s.floor);
    s.bw = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_H), M(0x1f1c19, 0.95));
    s.bw.position.set(0, ROOM_H / 2, BWZ); s.scene.add(s.bw);
    s.lw = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_L, ROOM_H), M(0xb9b6b0, 0.95));
    s.lw.rotation.y = Math.PI / 2; s.lw.position.set(-ROOM_W / 2, ROOM_H / 2, 0); s.scene.add(s.lw);
    s.rw = s.lw.clone();
    s.rw.position.set(ROOM_W / 2, ROOM_H / 2, 0); s.rw.rotation.y = -Math.PI / 2; s.scene.add(s.rw);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_L), new THREE.MeshBasicMaterial({ color: 0x2a2a2a }));
    ceil.rotation.x = Math.PI / 2; ceil.position.set(0, ROOM_H - 0.05, 0); s.scene.add(ceil);
    const stage = new THREE.Mesh(new THREE.BoxGeometry(STAGE_W, STAGE_H, STAGE_D), M(0x2b2b2b, 0.8));
    stage.position.set(0, STAGE_H / 2, SZ); s.scene.add(stage);
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(7, 4), M(0x5c1f1f, 1));
    rug.rotation.x = -Math.PI / 2; rug.position.set(0.5, STAGE_H + 0.01, SZ + 0.5); s.scene.add(rug);
    const km = M(0x18181c, 0.5);
    const kick = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.85, 16), km);
    kick.rotation.z = Math.PI / 2; kick.position.set(0.5, STAGE_H + 1, SZ + 1.2); s.scene.add(kick);
    [[-2.4, SZ - 1.2], [3.2, SZ - 1.2]].forEach(([x, z]) => {
      const amp = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1), km);
      amp.position.set(x, STAGE_H + 0.7, z); s.scene.add(amp);
    });
    const mat = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), M(0x22252e, 1));
    mat.rotation.x = -Math.PI / 2; mat.position.set(-2, 0.02, 3); s.scene.add(mat);

    // ─── Truss rows ──────────────────────────────────────────────────
    const tm = M(0x555555, 0.35); tm.metalness = 0.7;
    const RED_ZONE = new THREE.MeshBasicMaterial({ color: 0xff5555 });
    function buildRow(z, len) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, len, 8), tm);
      bar.rotation.z = Math.PI / 2; bar.position.set(0, ROW_H, z); s.scene.add(bar);
      [-1, 1].forEach(sign => {
        const dz = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, DZ, 8), RED_ZONE);
        dz.rotation.z = Math.PI / 2;
        dz.position.set(sign * (len / 2 - DZ / 2), ROW_H, z); s.scene.add(dz);
      });
      [-len / 2 + 0.4, len / 2 - 0.4].forEach(x => {
        const h = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, ROOM_H - ROW_H, 6), new THREE.MeshBasicMaterial({ color: 0x444444 }));
        h.position.set(x, ROW_H + (ROOM_H - ROW_H) / 2, z); s.scene.add(h);
      });
    }
    buildRow(ROW_A_Z, RACK_LEN);
    buildRow(ROW_B_Z, RACK_LEN);
    s.scene.add(new THREE.AmbientLight(0x404040, 0.45));

    // ─── Fixture factory ─────────────────────────────────────────────
    const UP_NEG = new THREE.Vector3(0, -1, 0);
    s.fixtures = [];
    function fix(x, y, z, col, tx, ty, tz, fixtureMode, intensity, coneR, angle = Math.PI / 6, pen = 0.55, coneOp = 0.15) {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 14), new THREE.MeshBasicMaterial({ color: col }));
      body.position.set(x, y, z); s.scene.add(body);
      const house = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.45, 10), M(0x1a1a1a, 0.8));
      house.position.set(x, y + 0.28, z); s.scene.add(house);
      const light = new THREE.SpotLight(col, intensity, 45, angle, pen, 1.3);
      light.position.set(x, y, z); light.target.position.set(tx, ty, tz);
      s.scene.add(light); s.scene.add(light.target);
      const dir = new THREE.Vector3(tx - x, ty - y, tz - z);
      const dist2 = dir.length(); dir.normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(UP_NEG, dir);
      const cm = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: coneOp, side: THREE.DoubleSide, depthWrite: false });
      const cone = new THREE.Mesh(new THREE.ConeGeometry(coneR, dist2, 24, 1, true), cm);
      cone.quaternion.copy(q);
      cone.position.set(x + dir.x * dist2 / 2, y + dir.y * dist2 / 2, z + dir.z * dist2 / 2);
      s.scene.add(cone);
      const lm = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.85 });
      const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, y, z), new THREE.Vector3(tx, ty, tz)]);
      const beam = new THREE.Line(lg, lm);
      s.scene.add(beam);
      s.fixtures.push({ light, cone, beam, mode: fixtureMode });
    }

    const ha = USABLE / 2;
    fix(-ha, ROW_H, ROW_A_Z, 0xFF0044, -ha * 0.35, 1.2, BWZ + 2, 'perf', 3.4, 2.0);
    fix(ha, ROW_H, ROW_A_Z, 0xFF0044, ha * 0.35, 1.2, BWZ + 2, 'perf', 3.4, 2.0);
    fix(0, ROW_H, ROW_A_Z, 0x00A8C8, 0, 1.3, SZ + 0.5, 'perf', 2.2, 1.8);
    const gap = USABLE / 2;
    [-gap, 0, gap].forEach(x => {
      fix(x, ROW_H, ROW_B_Z, 0xFFE9CE, x, 0.2, ROW_B_Z + 1, 'class', 2.6, 4.4, Math.PI / 3.2, 0.95, 0.075);
    });
    [-3.5, 3.5].forEach(x => {
      fix(x, 0.3, BWZ + 0.6, 0xc084fc, x, 14, BWZ + 0.3, 'perf', 1.7, 1.2);
    });

    // Ceiling room lights
    [-5.5, -1.8, 1.8, 5.5].forEach(x => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 2.1), new THREE.MeshBasicMaterial({ color: 0xfff7e8, transparent: true, opacity: 0.9 }));
      panel.position.set(x, ROOM_H - 1.1, 2); s.scene.add(panel);
      const rl = new THREE.PointLight(0xfff2dd, 0.8, 18, 1.5);
      rl.position.set(x, ROOM_H - 1.2, 2); s.scene.add(rl);
    });

    // Logo backdrop — self-illuminating branded sign
    const logoLoader = new THREE.TextureLoader();
    logoLoader.load(
      "https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png",
      (tex) => {
        const asp = tex.image.width / tex.image.height;
        const lh = 4.2, lw = lh * asp;
        const lmat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
        const lp = new THREE.Mesh(new THREE.PlaneGeometry(lw, lh), lmat);
        lp.position.set(0, 9, BWZ + 0.06); s.scene.add(lp);
        const halo = new THREE.Mesh(
          new THREE.PlaneGeometry(lw * 1.6, lh * 1.6),
          new THREE.MeshBasicMaterial({ color: 0xfff4e0, transparent: true, opacity: 0.15, side: THREE.DoubleSide, depthWrite: false })
        );
        halo.position.set(0, 9, BWZ + 0.04); s.scene.add(halo);
      },
      undefined,
      () => {
        // Fallback if Cloudinary fails
        try {
          const fallbackLoader = new THREE.TextureLoader();
          fallbackLoader.load(
            "https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png",
            (tex) => {
              const asp = tex.image.width / tex.image.height;
              const lh = 4.2, lw = lh * asp;
              const lmat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
              const lp = new THREE.Mesh(new THREE.PlaneGeometry(lw, lh), lmat);
              lp.position.set(0, 9, BWZ + 0.06); s.scene.add(lp);
              const halo = new THREE.Mesh(
                new THREE.PlaneGeometry(lw * 1.6, lh * 1.6),
                new THREE.MeshBasicMaterial({ color: 0xfff4e0, transparent: true, opacity: 0.15, side: THREE.DoubleSide, depthWrite: false })
              );
              halo.position.set(0, 9, BWZ + 0.04); s.scene.add(halo);
            }
          );
        } catch (e) { /* silent */ }
      }
    );

    // ─── Wiring visualisation ────────────────────────────────────────
    const DL = new THREE.LineBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.88 });
    const PL = new THREE.LineBasicMaterial({ color: 0xffd400, transparent: true, opacity: 0.88 });
    function ln(mat, pts) {
      const g = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(...p)));
      s.scene.add(new THREE.Line(g, mat));
    }
    function clip(x, y, z) {
      const c = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.04, 6, 12), M(0x888888, 0.4));
      c.position.set(x, y, z); c.rotation.x = Math.PI / 2; s.scene.add(c);
    }
    const rackX = ROOM_W / 2 - 0.35, rackZ = SZ - 1;
    const dOff = 0.45, pOff = -0.45;
    ln(DL, [[rackX, 0.2, rackZ], [rackX, CEIL_Y + dOff, rackZ]]);
    ln(PL, [[rackX, 0.2, rackZ], [rackX, CEIL_Y + pOff, rackZ]]);
    [3, 7, 11, 16, 20, 24, 27].forEach(h => clip(rackX, h, rackZ));
    const ahX = RACK_LEN / 2 - 0.45;
    ln(DL, [[rackX, CEIL_Y + dOff, rackZ], [rackX, CEIL_Y + dOff, ROW_A_Z], [ahX, CEIL_Y + dOff, ROW_A_Z]]);
    ln(PL, [[rackX, CEIL_Y + pOff, rackZ], [rackX, CEIL_Y + pOff, ROW_A_Z], [ahX, CEIL_Y + pOff, ROW_A_Z]]);
    ln(DL, [[ahX, CEIL_Y + dOff, ROW_A_Z], [ahX, ROW_H + dOff, ROW_A_Z]]);
    ln(PL, [[ahX, CEIL_Y + pOff, ROW_A_Z], [ahX, ROW_H + pOff, ROW_A_Z]]);
    clip(ahX, (CEIL_Y + ROW_H) / 2, ROW_A_Z);
    const raX = [-ha, 0, ha];
    ln(DL, [[ahX, ROW_H + dOff, ROW_A_Z], [raX[2] + 0.2, ROW_H + dOff, ROW_A_Z]]);
    ln(PL, [[ahX, ROW_H + pOff, ROW_A_Z], [raX[0], ROW_H + pOff, ROW_A_Z]]);
    raX.forEach((x, i) => {
      [new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0x00ff88 })),
       new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff5555 }))
      ].forEach((m, j) => { m.position.set(x + (j ? -0.2 : 0.2), ROW_H + dOff, ROW_A_Z); s.scene.add(m); });
      if (i > 0) ln(DL, [[raX[i - 1] - 0.2, ROW_H + dOff, ROW_A_Z], [x + 0.2, ROW_H + dOff, ROW_A_Z]]);
      if (i > 0) ln(PL, [[raX[i - 1], ROW_H + pOff, ROW_A_Z], [x, ROW_H + pOff, ROW_A_Z]]);
    });
    const ta = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.44, 8), M(0x111111, 0.8));
    ta.rotation.z = Math.PI / 2; ta.position.set(raX[0] - 0.25 - 0.26, ROW_H + dOff, ROW_A_Z); s.scene.add(ta);
    ln(DL, [[rackX, CEIL_Y + dOff, ROW_A_Z], [rackX, CEIL_Y + dOff, ROW_B_Z], [ahX, CEIL_Y + dOff, ROW_B_Z]]);
    ln(PL, [[rackX, CEIL_Y + pOff, ROW_A_Z], [rackX, CEIL_Y + pOff, ROW_B_Z], [ahX, CEIL_Y + pOff, ROW_B_Z]]);
    ln(DL, [[ahX, CEIL_Y + dOff, ROW_B_Z], [ahX, ROW_H + dOff, ROW_B_Z]]);
    ln(PL, [[ahX, CEIL_Y + pOff, ROW_B_Z], [ahX, ROW_H + pOff, ROW_B_Z]]);
    clip(ahX, (CEIL_Y + ROW_H) / 2, ROW_B_Z);
    const rbX = [-gap, 0, gap];
    ln(DL, [[ahX, ROW_H + dOff, ROW_B_Z], [rbX[2] + 0.2, ROW_H + dOff, ROW_B_Z]]);
    ln(PL, [[ahX, ROW_H + pOff, ROW_B_Z], [rbX[0], ROW_H + pOff, ROW_B_Z]]);
    rbX.forEach((x, i) => {
      [new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0x00ff88 })),
       new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff5555 }))
      ].forEach((m, j) => { m.position.set(x + (j ? -0.2 : 0.2), ROW_H + dOff, ROW_B_Z); s.scene.add(m); });
      if (i > 0) ln(DL, [[rbX[i - 1] - 0.2, ROW_H + dOff, ROW_B_Z], [x + 0.2, ROW_H + dOff, ROW_B_Z]]);
      if (i > 0) ln(PL, [[rbX[i - 1], ROW_H + pOff, ROW_B_Z], [x, ROW_H + pOff, ROW_B_Z]]);
    });
    const tb = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.44, 8), M(0x111111, 0.8));
    tb.rotation.z = Math.PI / 2; tb.position.set(rbX[0] - 0.2 - 0.26, ROW_H + dOff, ROW_B_Z); s.scene.add(tb);
    const bdy = 0.42, bpy = 0.24;
    ln(DL, [[rackX, bdy, rackZ], [rackX, bdy, BWZ + 0.6], [-3.5 + 0.2, bdy, BWZ + 0.6]]);
    ln(PL, [[rackX, bpy, rackZ], [rackX, bpy, BWZ + 0.6], [-3.5, bpy, BWZ + 0.6]]);
    ln(DL, [[-3.5 - 0.2, bdy, BWZ + 0.6], [3.5 + 0.2, bdy, BWZ + 0.6]]);
    ln(PL, [[-3.5, bpy, BWZ + 0.6], [3.5, bpy, BWZ + 0.6]]);
    const rack = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.8, 0.75), M(0x111111, 0.8));
    rack.position.set(rackX, 1.4, rackZ); s.scene.add(rack);
    const ew = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.2, 0.1), M(0xe8e4da, 0.8));
    ew.position.set(-ROOM_W / 2 + 0.65, 4.0, 8); s.scene.add(ew);
    [0.3, 0.02, -0.26].forEach(dy => {
      const btn = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.16, 0.05), M(0x333333, 0.7));
      btn.position.set(-ROOM_W / 2 + 0.65, 4.0 + dy, 8.08); s.scene.add(btn);
    });

    function label(txt, x, y, z, col, sc) {
      const cv = document.createElement("canvas");
      cv.width = 300; cv.height = 64;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = "rgba(13,11,10,.85)"; ctx.fillRect(0, 0, 300, 64);
      ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.strokeRect(2, 2, 296, 60);
      ctx.fillStyle = col; ctx.font = "bold 27px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(txt, 150, 33);
      const t = new THREE.CanvasTexture(cv);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true }));
      sp.scale.set(sc * 2.5, sc * 0.55, 1); sp.position.set(x, y, z); s.scene.add(sp);
    }
    label("ROW A DROP", ahX + 1.2, (CEIL_Y + ROW_H) / 2, ROW_A_Z, "#00ff88", 0.9);
    label("ROW B DROP", ahX + 1.2, (CEIL_Y + ROW_H) / 2, ROW_B_Z, "#00ff88", 0.9);
    label("120Ω TERM", raX[0] - 0.7, ROW_H + dOff + 0.65, ROW_A_Z, "#ff5555", 0.88);
    label("120Ω TERM", rbX[0] - 0.7, ROW_H + dOff + 0.65, ROW_B_Z, "#ff5555", 0.88);
    label("DMX CTRL + POWER", rackX, 3.6, rackZ, "#FFDA00", 1.1);
    label("WALL PANEL + SWITCH", -ROOM_W / 2 + 0.65, 5.4, 8, "#00ff88", 1.0);

    // ─── Mode setter ─────────────────────────────────────────────────
    s.setMode = (modeVal) => {
      s.fixtures.forEach(f => {
        const on = f.mode === modeVal;
        f.light.visible = on; f.cone.visible = on; f.beam.visible = on;
      });
      s.scene.fog.color.set(modeVal === "perf" ? 0x0a0807 : 0x100e0c);
      s.bw.material.color.set(modeVal === "perf" ? 0x141214 : 0x3d3830);
      s.lw.material.color.set(modeVal === "perf" ? 0xb9b6b0 : 0xd0cbbd);
      s.rw.material.color.set(modeVal === "perf" ? 0xb9b6b0 : 0xd0cbbd);
      s.floor.material.color.set(modeVal === "perf" ? 0x141414 : 0x252320);
      s.scene.children.filter(o => o.isAmbientLight).forEach(o => o.intensity = modeVal === "perf" ? 0.22 : 0.80);
    };
    s.setMode("perf");

    (function animate() { requestAnimationFrame(animate); s.renderer.render(s.scene, s.camera); })();
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
        minHeight: 500,
        background: "#0d0b0a",
        borderRadius: 16,
        overflow: "hidden",
        marginTop: 24,
      }}
    >
      {/* Canvas is injected here by Three.js */}

      {/* UI overlay */}
      <div style={{
        position: "absolute", top: 16, left: 16, zIndex: 10,
        background: "rgba(26,19,15,.9)", border: "1px solid #FFDA00",
        borderRadius: 10, padding: "14px 18px", color: "#F6F3EE",
        maxWidth: 310, backdropFilter: "blur(4px)",
        fontFamily: "'DM Sans', sans-serif", pointerEvents: "none",
      }}>
        <h1 style={{ fontSize: 13, margin: "0 0 7px", color: "#FFDA00", letterSpacing: ".5px", fontWeight: 600 }}>
          HEADLINER — FULL LIGHTING SYSTEM
        </h1>
        <p style={{ fontSize: 11, lineHeight: 1.5, margin: "5px 0", opacity: 0.85 }}>
          {mode === "perf"
            ? "Performance Mode: Row A (3 fixtures, 41in spacing, 11.3ft AFF) aimed upstage at the band. Floor uplights on. Row B off."
            : "Class Mode: Row B (3× 18×18W fanless, 41in spacing) fires warm, wide, overlapping wash over the audience/class floor. Row A and floor uplights off."}
        </p>
        <div style={{ display: "flex", gap: 7, marginTop: 9, pointerEvents: "auto" }}>
          <button onClick={() => setMode("perf")} style={{
            flex: 1, padding: "8px 5px", borderRadius: 6,
            border: mode === "perf" ? "1px solid #FF0044" : "1px solid #444",
            background: mode === "perf" ? "#FF0044" : "#1a130f",
            color: mode === "perf" ? "#fff" : "#F6F3EE",
            fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all .2s",
          }}>Performance</button>
          <button onClick={() => setMode("class")} style={{
            flex: 1, padding: "8px 5px", borderRadius: 6,
            border: mode === "class" ? "1px solid #FF0044" : "1px solid #444",
            background: mode === "class" ? "#FF0044" : "#1a130f",
            color: mode === "class" ? "#fff" : "#F6F3EE",
            fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all .2s",
          }}>Class</button>
        </div>
      </div>

      {/* Wiring note */}
      <div style={{
        position: "absolute", bottom: 14, right: 16, zIndex: 10,
        background: "rgba(26,19,15,.9)", border: "1px solid #00A8C8",
        borderRadius: 10, padding: "9px 13px", color: "#F6F3EE",
        fontSize: 10, maxWidth: 270, lineHeight: 1.5, pointerEvents: "none",
      }}>
        <strong>Wiring:</strong> trunk climbs the wall to the 30ft ceiling, runs along the ceiling structure, then drops straight down alongside each row's existing hanger cable. Floor uplights run along the baseboard only. Nothing spans open air.
      </div>

      {/* Hint */}
      <div style={{
        position: "absolute", bottom: 14, left: 16, zIndex: 10,
        color: "#F6F3EE", fontSize: 10, opacity: 0.45, pointerEvents: "none",
      }}>
        drag to rotate · scroll to zoom
      </div>
    </div>
  );
}