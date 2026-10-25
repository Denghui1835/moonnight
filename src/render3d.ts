import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { BODY_HEIGHT, Pose, SEG } from "./rig";
import { Figure, Scene } from "./stage";

export interface SceneRenderer {
  render(scene: Scene, w: number, h: number): void;
  resize(w: number, h: number): void;
}

const UP = new THREE.Vector3(0, 1, 0);
const CAM_POS = new THREE.Vector3(0, 1.72, 6.5);
const CAM_LOOK = new THREE.Vector3(0, 1.3, -1.6);
const FOV = 39;
const MIRROR_Z = -6.5;
const MIRROR_W = 8.6;
const MIRROR_H = 4.7;
const ROOM_HALF = 4.95;

/** 写实底板：宣发海报那张剧照。有人物剪影就够了——海报里的舞者本来就是剪影。 */
const PLATE_URL = `${import.meta.env.BASE_URL}plates/theater_wide.png`;

const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ---------------- canvas textures ---------------- */

function makeTex(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  draw(g);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function nightTexture(): THREE.CanvasTexture {
  return makeTex(1024, 1024, (g) => {
    const sky = g.createLinearGradient(0, 0, 0, 1024);
    sky.addColorStop(0, "#060d11");
    sky.addColorStop(0.34, "#10262a");
    sky.addColorStop(0.62, "#2f5a56");
    sky.addColorStop(0.8, "#7ba49b");
    sky.addColorStop(0.92, "#12211f");
    sky.addColorStop(1, "#050a0b");
    g.fillStyle = sky;
    g.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < 190; i++) {
      const x = rnd(i * 2.3) * 1024;
      const y = rnd(i * 5.7) * 560;
      const r = 0.6 + rnd(i * 8.1) * 1.5;
      g.fillStyle = `rgba(226, 245, 238, ${0.18 + rnd(i * 3.3) * 0.6})`;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }

    const mx = 690;
    const my = 300;
    const mr = 108;
    const halo = g.createRadialGradient(mx, my, mr * 0.4, mx, my, mr * 5.2);
    halo.addColorStop(0, "rgba(232, 253, 246, 0.55)");
    halo.addColorStop(0.18, "rgba(206, 240, 232, 0.2)");
    halo.addColorStop(1, "rgba(190, 226, 218, 0)");
    g.fillStyle = halo;
    g.fillRect(0, 0, 1024, 1024);

    const disc = g.createRadialGradient(mx - mr * 0.32, my - mr * 0.3, mr * 0.12, mx, my, mr);
    disc.addColorStop(0, "#fdfffc");
    disc.addColorStop(0.68, "#e6f6ee");
    disc.addColorStop(1, "#b9d6cc");
    g.fillStyle = disc;
    g.beginPath();
    g.arc(mx, my, mr, 0, Math.PI * 2);
    g.fill();

    g.fillStyle = "rgba(120, 155, 148, 0.26)";
    for (let i = 0; i < 7; i++) {
      const a = rnd(i * 4.1) * Math.PI * 2;
      const d = rnd(i * 7.3) * mr * 0.62;
      g.beginPath();
      g.arc(mx + Math.cos(a) * d, my + Math.sin(a) * d, mr * (0.07 + rnd(i * 2.3) * 0.15), 0, Math.PI * 2);
      g.fill();
    }

    // 树影：从画面左下伸出去，枝条挡在月亮前面
    g.strokeStyle = "rgba(3, 7, 8, 0.94)";
    g.lineCap = "round";
    const branch = (x: number, y: number, ang: number, len: number, w: number, depth: number, seed: number) => {
      if (depth <= 0 || len < 8) return;
      const x2 = x + Math.cos(ang) * len;
      const y2 = y + Math.sin(ang) * len;
      g.lineWidth = w;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x2, y2);
      g.stroke();
      for (let i = 0; i < 2; i++) {
        branch(
          x2,
          y2,
          ang + (rnd(seed + i * 3.1) - 0.5) * 1.25,
          len * (0.6 + rnd(seed + i * 7.7) * 0.2),
          Math.max(1.2, w * 0.6),
          depth - 1,
          seed + i * 11 + 1,
        );
      }
    };
    branch(40, 1030, -Math.PI / 2 - 0.16, 300, 34, 6, 5);
    branch(250, 1030, -Math.PI / 2 + 0.04, 210, 20, 5, 13);

    // 树梢上的乌鸦与褪色的红绳
    g.fillStyle = "rgba(2, 5, 6, 0.98)";
    g.beginPath();
    g.ellipse(404, 386, 17, 9, -0.32, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.arc(421, 377, 6, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.moveTo(427, 375);
    g.lineTo(436, 379);
    g.lineTo(427, 381);
    g.closePath();
    g.fill();
    g.beginPath();
    g.moveTo(390, 386);
    g.lineTo(372, 396);
    g.lineTo(390, 393);
    g.closePath();
    g.fill();
    g.strokeStyle = "rgba(150, 44, 40, 0.85)";
    g.lineWidth = 2.4;
    g.beginPath();
    g.moveTo(414, 392);
    g.bezierCurveTo(410, 410, 424, 420, 418, 442);
    g.stroke();

    // 远处的地平线
    g.fillStyle = "rgba(3, 8, 9, 0.9)";
    g.beginPath();
    g.moveTo(0, 900);
    for (let x = 0; x <= 1024; x += 64) {
      g.lineTo(x, 878 - rnd(x) * 46);
    }
    g.lineTo(1024, 1024);
    g.lineTo(0, 1024);
    g.closePath();
    g.fill();
  });
}

function boardTexture(): THREE.CanvasTexture {
  return makeTex(1024, 1024, (g) => {
    g.fillStyle = "#10181a";
    g.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 8; i++) {
      const y = (i * 1024) / 8;
      g.fillStyle = i % 2 ? "#0d1517" : "#121b1d";
      g.fillRect(0, y, 1024, 1024 / 8 - 3);
      g.strokeStyle = "rgba(160, 190, 183, 0.07)";
      g.lineWidth = 2;
      for (let k = 0; k < 26; k++) {
        const yy = y + rnd(i * 31 + k) * (1024 / 8 - 6);
        g.beginPath();
        g.moveTo(rnd(i * 7 + k) * 300, yy);
        g.lineTo(400 + rnd(i * 13 + k) * 624, yy + (rnd(k) - 0.5) * 5);
        g.stroke();
      }
      g.fillStyle = "rgba(0, 0, 0, 0.55)";
      g.fillRect(0, y + 1024 / 8 - 3, 1024, 3);
    }
  });
}

function playbillTexture(): THREE.CanvasTexture {
  return makeTex(512, 700, (g) => {
    const paper = g.createLinearGradient(0, 0, 512, 700);
    paper.addColorStop(0, "#d8cfb6");
    paper.addColorStop(0.5, "#bdb298");
    paper.addColorStop(1, "#8d836e");
    g.fillStyle = paper;
    g.fillRect(0, 0, 512, 700);

    g.strokeStyle = "rgba(48, 40, 30, 0.55)";
    g.lineWidth = 6;
    g.strokeRect(26, 26, 460, 648);

    g.fillStyle = "#2b2620";
    g.textAlign = "center";
    g.font = '600 58px "Noto Serif SC", serif';
    g.fillText("月  夜", 256, 150);
    g.font = '400 22px "Noto Sans SC", sans-serif';
    g.fillText("M O O N N I G H T", 256, 194);
    g.strokeStyle = "rgba(48, 40, 30, 0.4)";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(80, 226);
    g.lineTo(432, 226);
    g.stroke();

    g.font = '400 26px "Noto Serif SC", serif';
    g.fillStyle = "rgba(43, 38, 32, 0.85)";
    g.fillText("舞　者", 256, 300);
    g.fillText("舞　者", 256, 430);

    // 第一个名字被火烧掉
    g.save();
    g.translate(256, 350);
    const burn = g.createRadialGradient(0, 0, 10, 0, 0, 128);
    burn.addColorStop(0, "rgba(22, 10, 4, 0.98)");
    burn.addColorStop(0.55, "rgba(48, 20, 8, 0.9)");
    burn.addColorStop(0.82, "rgba(92, 44, 14, 0.55)");
    burn.addColorStop(1, "rgba(120, 70, 30, 0)");
    g.fillStyle = burn;
    g.beginPath();
    g.ellipse(0, 0, 138, 46, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();

    // 第二个名字只剩最后一个字
    g.fillStyle = "rgba(43, 38, 32, 0.75)";
    g.font = '400 34px "Noto Serif SC", serif';
    g.fillText("＿ ＿", 214, 480);
    g.fillStyle = "rgba(30, 26, 20, 0.95)";
    g.font = '600 42px "Noto Serif SC", serif';
    g.fillText("安", 300, 482);

    g.font = '400 20px "Noto Sans SC", sans-serif';
    g.fillStyle = "rgba(43, 38, 32, 0.6)";
    g.fillText("满月之夜 · 无观众演出", 256, 586);
    g.fillText("请从第一关重新开始", 256, 620);
  });
}

function beamTexture(): THREE.CanvasTexture {
  return makeTex(256, 256, (g) => {
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(226, 248, 240, 0.95)");
    grad.addColorStop(0.4, "rgba(198, 232, 222, 0.35)");
    grad.addColorStop(1, "rgba(180, 220, 212, 0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
  });
}

function dustTexture(): THREE.CanvasTexture {
  return makeTex(64, 64, (g) => {
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(240, 255, 250, 1)");
    grad.addColorStop(0.35, "rgba(220, 245, 238, 0.55)");
    grad.addColorStop(1, "rgba(200, 235, 228, 0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
  });
}

function shaftTexture(): THREE.CanvasTexture {
  return makeTex(128, 512, (g) => {
    const along = g.createLinearGradient(0, 0, 0, 512);
    along.addColorStop(0, "rgba(214, 242, 234, 0.55)");
    along.addColorStop(0.5, "rgba(202, 236, 226, 0.2)");
    along.addColorStop(1, "rgba(192, 228, 218, 0)");
    g.fillStyle = along;
    g.fillRect(0, 0, 128, 512);
    const across = g.createLinearGradient(0, 0, 128, 0);
    across.addColorStop(0, "rgba(0,0,0,1)");
    across.addColorStop(0.24, "rgba(0,0,0,0)");
    across.addColorStop(0.76, "rgba(0,0,0,0)");
    across.addColorStop(1, "rgba(0,0,0,1)");
    g.globalCompositeOperation = "destination-out";
    g.fillStyle = across;
    g.fillRect(0, 0, 128, 512);
  });
}

/* ---------------- figure ---------------- */

const BONE_DEFS: { a: keyof Pose; b: keyof Pose; r: number; kind: "limb" | "leg" }[] = [
  { a: "lShoulder", b: "lElbow", r: 0.072, kind: "limb" },
  { a: "lElbow", b: "lWrist", r: 0.056, kind: "limb" },
  { a: "rShoulder", b: "rElbow", r: 0.072, kind: "limb" },
  { a: "rElbow", b: "rWrist", r: 0.056, kind: "limb" },
  { a: "lHip", b: "lKnee", r: 0.092, kind: "leg" },
  { a: "lKnee", b: "lAnkle", r: 0.068, kind: "leg" },
  { a: "rHip", b: "rKnee", r: 0.092, kind: "leg" },
  { a: "rKnee", b: "rAnkle", r: 0.068, kind: "leg" },
];

const UNIT_CYL = new THREE.CylinderGeometry(1, 1, 1, 12, 1, false);
const SPHERE = new THREE.SphereGeometry(1, 20, 14);

/** 黑色人偶只靠光打边不够，补一层菲涅尔轮廓，暗处才读得出来 */
function addRim(mat: THREE.MeshStandardMaterial, strength: number, color = "0.42, 0.78, 0.71"): void {
  const s = strength.toFixed(2);
  mat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        float rimF = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 5.0);
        totalEmissiveRadiance += vec3(${color}) * rimF * ${s};`,
      );
  };
  mat.customProgramCacheKey = () => "rim" + s + color;
}

class FigureView {
  readonly group = new THREE.Group();
  private body: THREE.MeshStandardMaterial;
  private cloth: THREE.MeshStandardMaterial;
  private eyeMat: THREE.MeshStandardMaterial;
  private bones: { mesh: THREE.Mesh; a: keyof Pose; b: keyof Pose; r: number; kind: "limb" | "leg" }[] = [];
  private joints: { mesh: THREE.Mesh; key: keyof Pose; side: "l" | "r"; r: number }[] = [];
  private torso: THREE.Mesh;
  private neck: THREE.Mesh;
  private head: THREE.Mesh;
  private brim: THREE.Mesh;
  private crown: THREE.Mesh;
  private skirt: THREE.Mesh;
  private handL: THREE.Mesh;
  private handR: THREE.Mesh;
  private footL: THREE.Mesh;
  private footR: THREE.Mesh;
  private eyeL: THREE.Mesh;
  private eyeR: THREE.Mesh;

  constructor(dancer: boolean) {
    this.body = new THREE.MeshStandardMaterial({
      color: dancer ? 0x03050a : 0x05080b,
      roughness: dancer ? 0.34 : 0.62,
      metalness: 0.18,
      transparent: true,
      envMapIntensity: 0.55,
    });
    this.cloth = new THREE.MeshStandardMaterial({
      color: 0x05070c,
      roughness: 0.55,
      metalness: 0.2,
      transparent: true,
      side: THREE.DoubleSide,
      envMapIntensity: 0.6,
    });
    this.eyeMat = new THREE.MeshStandardMaterial({
      color: 0xe9fff6,
      emissive: 0xcfffea,
      emissiveIntensity: 2.4,
      transparent: true,
      opacity: 0,
      toneMapped: false,
    });

    // 老师用暖色轮廓，僵尸用冷青色，暗场里一眼分得清谁在示范
    const rimColor = dancer ? "1.0, 0.78, 0.46" : "0.42, 0.78, 0.71";
    addRim(this.body, dancer ? 0.34 : 0.22, rimColor);
    addRim(this.cloth, dancer ? 0.28 : 0.18, rimColor);

    for (const d of BONE_DEFS) {
      const m = new THREE.Mesh(UNIT_CYL, this.body);
      m.castShadow = true;
      this.group.add(m);
      this.bones.push({ mesh: m, ...d });
    }

    // 关节球，避免手肘/膝盖在剪影上出现断口
    for (const key of ["lElbow", "rElbow", "lKnee", "rKnee"] as const) {
      const m = new THREE.Mesh(SPHERE, this.body);
      m.castShadow = true;
      this.group.add(m);
      this.joints.push({ mesh: m, key, side: key[0] as "l" | "r", r: key.includes("Elbow") ? 0.062 : 0.078 });
    }

    this.torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.235, 1, 18, 1), this.body);
    this.torso.castShadow = true;
    this.group.add(this.torso);

    this.neck = new THREE.Mesh(UNIT_CYL, this.body);
    this.neck.castShadow = true;
    this.group.add(this.neck);

    this.head = new THREE.Mesh(SPHERE, this.body);
    this.head.scale.set(SEG.headR * 0.94, SEG.headR * 1.12, SEG.headR * 0.97);
    this.head.castShadow = true;
    this.group.add(this.head);

    this.brim = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.016, 26), this.cloth);
    this.brim.castShadow = true;
    this.group.add(this.brim);

    this.crown = new THREE.Mesh(new THREE.CylinderGeometry(0.168, 0.18, 0.26, 22), this.cloth);
    this.crown.castShadow = true;
    this.group.add(this.crown);

    this.skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.38, 0.6, 22, 1, true), this.cloth);
    this.group.add(this.skirt);

    this.handL = new THREE.Mesh(SPHERE, this.body);
    this.handL.scale.setScalar(0.072);
    this.group.add(this.handL);
    this.handR = new THREE.Mesh(SPHERE, this.body);
    this.handR.scale.setScalar(0.072);
    this.group.add(this.handR);

    this.footL = new THREE.Mesh(SPHERE, this.body);
    this.footL.scale.set(0.075, 0.05, 0.12);
    this.group.add(this.footL);
    this.footR = new THREE.Mesh(SPHERE, this.body);
    this.footR.scale.set(0.075, 0.05, 0.12);
    this.group.add(this.footR);

    this.eyeL = new THREE.Mesh(SPHERE, this.eyeMat);
    this.eyeR = new THREE.Mesh(SPHERE, this.eyeMat);
    this.eyeL.scale.setScalar(0.019);
    this.eyeR.scale.setScalar(0.019);
    this.group.add(this.eyeL, this.eyeR);

    this.skirt.visible = false;
    this.brim.visible = false;
    this.crown.visible = false;
    this.group.visible = false;
  }

  update(f: Figure, time: number, scale: number, x: number, z: number): void {
    const p = f.pose;
    const variant = f.variant ?? 0;
    const alpha = f.alpha;
    this.group.visible = alpha > 0.02;
    if (!this.group.visible) return;

    this.group.scale.setScalar(scale);
    this.group.position.set(x, (SEG.thigh + SEG.shin) * scale, z);
    if (variant === 4) this.group.position.y -= 0.42 * scale;
    this.group.rotation.z = f.sway ?? 0;

    this.body.opacity = alpha;
    this.cloth.opacity = alpha;
    this.body.transparent = alpha < 0.999;
    this.cloth.transparent = alpha < 0.999;

    const zL = 0.045;
    const zR = -0.045;

    for (const b of this.bones) {
      const A = p[b.a];
      const B = p[b.b];
      let bx = B.x;
      let by = B.y;
      if (variant === 2 && b.a === "lElbow") {
        bx = A.x + (B.x - A.x) * 0.55;
        by = A.y + (B.y - A.y) * 0.55;
      }
      const dx = bx - A.x;
      const dy = by - A.y;
      const len = Math.hypot(dx, dy) || 1e-4;
      b.mesh.position.set((A.x + bx) / 2, (A.y + by) / 2, b.a.includes("l") ? zL : zR);
      b.mesh.quaternion.setFromUnitVectors(UP, new THREE.Vector3(dx / len, dy / len, 0));
      b.mesh.scale.set(b.r, len, b.r);
      b.mesh.visible = !(variant === 4 && b.kind === "leg");
    }

    for (const j of this.joints) {
      const v = p[j.key];
      j.mesh.position.set(v.x, v.y, j.side === "l" ? zL : zR);
      j.mesh.scale.setScalar(j.r);
      j.mesh.visible = !(variant === 4 && j.key.includes("Knee"));
    }

    const sc = p.shoulderCenter;
    const pelvis = p.pelvis;
    const tx = sc.x - pelvis.x;
    const ty = sc.y - pelvis.y;
    const tlen = Math.hypot(tx, ty) || 1e-4;
    this.torso.position.set((sc.x + pelvis.x) / 2, (sc.y + pelvis.y) / 2, 0);
    this.torso.quaternion.setFromUnitVectors(UP, new THREE.Vector3(tx / tlen, ty / tlen, 0));
    this.torso.scale.set(1, tlen * 1.04, 0.62);

    const headPos = { x: p.head.x, y: p.head.y, z: 0 };
    if (variant === 1) {
      headPos.x = p.lHip.x + 0.16;
      headPos.y = p.lHip.y + 0.02;
      this.head.position.set(headPos.x, headPos.y, 0.1);
      this.neck.visible = false;
    } else if (variant === 3) {
      this.head.position.set(headPos.x + 0.12, headPos.y - 0.08, 0);
      this.head.rotation.z = 0.9;
      this.neck.visible = true;
      this.neck.position.set(
        (sc.x + headPos.x) / 2 + 0.03,
        (sc.y + headPos.y) / 2 - 0.04,
        0,
      );
      this.neck.quaternion.setFromUnitVectors(UP, new THREE.Vector3(0.1, 1, 0).normalize());
      this.neck.scale.set(0.09, Math.abs(sc.y - headPos.y) * 0.9, 0.09);
    } else {
      this.neck.visible = true;
      this.neck.position.set((sc.x + headPos.x) / 2, (sc.y + headPos.y) / 2, 0);
      this.neck.quaternion.setFromUnitVectors(UP, new THREE.Vector3(headPos.x - sc.x, headPos.y - sc.y, 0).normalize());
      this.neck.scale.set(0.09, Math.hypot(headPos.x - sc.x, headPos.y - sc.y) * 1.1, 0.09);
      this.head.position.set(headPos.x, headPos.y, 0);
      this.head.rotation.z = 0;
    }
    this.head.visible = variant !== 1;

    const hatOn = !!f.hat && variant === 0;
    this.brim.visible = hatOn;
    this.crown.visible = hatOn;
    if (hatOn) {
      this.brim.position.set(headPos.x, headPos.y + SEG.headR * 0.56, 0);
      this.crown.position.set(headPos.x, headPos.y + SEG.headR * 0.56 + 0.13, 0);
      this.brim.rotation.z = 0.03;
      this.crown.rotation.z = 0.03;
    }

    this.skirt.visible = !!f.skirt && variant !== 4;
    if (this.skirt.visible) {
      this.skirt.position.set(pelvis.x, pelvis.y - 0.3, 0);
    }

    this.handL.position.set(p.lWrist.x, p.lWrist.y, zL);
    this.handR.position.set(p.rWrist.x, p.rWrist.y, zR);
    this.handL.visible = variant !== 2;
    this.footL.position.set(p.lAnkle.x, p.lAnkle.y - 0.02, 0.05);
    this.footR.position.set(p.rAnkle.x, p.rAnkle.y - 0.02, -0.05);
    this.footL.visible = this.footR.visible = variant !== 4;

    const stare = f.stare;
    const showEyes = stare > 0.02 && variant !== 1;
    this.eyeL.visible = this.eyeR.visible = showEyes;
    if (showEyes) {
      const breathe = 1 + Math.sin(time * 3.1) * 0.06;
      this.eyeMat.opacity = alpha * Math.min(1, stare * 1.25);
      this.eyeMat.emissiveIntensity = 1.6 + stare * 3.4 * breathe;
      this.eyeL.position.set(headPos.x - 0.052, headPos.y + 0.012, 0.135);
      this.eyeR.position.set(headPos.x + 0.052, headPos.y + 0.012, 0.135);
    }
  }

  hide(): void {
    this.group.visible = false;
  }
}

/* ---------------- player wire ---------------- */

const WIRE_BONES: [keyof Pose, keyof Pose][] = [
  ["lShoulder", "lElbow"],
  ["lElbow", "lWrist"],
  ["rShoulder", "rElbow"],
  ["rElbow", "rWrist"],
  ["lHip", "lKnee"],
  ["lKnee", "lAnkle"],
  ["rHip", "rKnee"],
  ["rKnee", "rAnkle"],
  ["lShoulder", "lHip"],
  ["rShoulder", "rHip"],
  ["lHip", "rHip"],
  ["lShoulder", "rShoulder"],
  ["shoulderCenter", "pelvis"],
  ["shoulderCenter", "head"],
];

const RING = 14;

class WireView {
  readonly line: THREE.LineSegments;
  private geo: THREE.BufferGeometry;
  private positions: Float32Array;

  constructor() {
    const verts = (WIRE_BONES.length + RING) * 2;
    this.positions = new Float32Array(verts * 3);
    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.line = new THREE.LineSegments(
      this.geo,
      new THREE.LineBasicMaterial({
        color: 0x9fe8d6,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    this.line.visible = false;
  }

  update(f: Figure | null, scale: number, x: number, z: number): void {
    if (!f) {
      this.line.visible = false;
      return;
    }
    this.line.visible = true;
    this.line.position.set(x, (SEG.thigh + SEG.shin) * scale, z);
    this.line.scale.setScalar(scale);
    const p = f.pose;
    const arr = this.positions;
    let o = 0;
    const put = (vx: number, vy: number, vz: number) => {
      arr[o++] = vx;
      arr[o++] = vy;
      arr[o++] = vz;
    };
    for (const [a, b] of WIRE_BONES) {
      put(p[a].x, p[a].y, 0);
      put(p[b].x, p[b].y, 0);
    }
    const h = p.head;
    for (let i = 0; i < RING; i++) {
      const a0 = (i / RING) * Math.PI * 2;
      const a1 = ((i + 1) / RING) * Math.PI * 2;
      put(h.x + Math.cos(a0) * SEG.headR, h.y + Math.sin(a0) * SEG.headR, 0);
      put(h.x + Math.cos(a1) * SEG.headR, h.y + Math.sin(a1) * SEG.headR, 0);
    }
    (this.geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
  }
}

/* ---------------- post grade ---------------- */

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uBlood: { value: 0 },
    uGlitch: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uBlood;
    uniform float uGlitch;
    uniform vec2 uRes;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      float row = floor(uv.y * 42.0);
      float slice = step(0.7, hash(vec2(row, floor(uTime * 16.0)))) * uGlitch;
      uv.x += (hash(vec2(row, floor(uTime * 23.0))) - 0.5) * 0.07 * slice;

      float ca = 0.0011 + uGlitch * 0.005;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + vec2(ca, 0.0)).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - vec2(ca, 0.0)).b;

      float n = hash(uv * uRes + fract(uTime) * 97.3);
      col += (n - 0.5) * 0.05;

      vec2 d = uv - 0.5;
      float dist = length(d) * 1.26;
      float vig = 1.0 - smoothstep(0.42, 1.02, dist);
      col *= mix(0.34, 1.0, vig);

      float edge = smoothstep(0.22, 0.86, length(d) * 1.45);
      // 环境底色的一点血红：照宣发分镜的调色走，红只压在边缘，画面中间不脏
      col = mix(col, vec3(col.r * 1.28 + 0.012, col.g * 0.62, col.b * 0.6), edge * 0.16);
      col = mix(col, vec3(col.r * 1.45 + 0.035, col.g * 0.24, col.b * 0.2), uBlood * edge * 0.9);

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

/* ---------------- stage ---------------- */

export class Stage3D implements SceneRenderer {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private composer: EffectComposer;
  private grade: ShaderPass;
  private bloom: UnrealBloomPass;
  private moon!: THREE.DirectionalLight;

  private pool: FigureView[] = [];
  private wire = new WireView();

  private dust: THREE.Points;
  private dustBase: Float32Array;
  private dustMat: THREE.PointsMaterial;

  private cracks: THREE.LineSegments;
  private crackMat: THREE.LineBasicMaterial;

  private bottles: THREE.Group;
  private playbill: THREE.Mesh;
  private redString: THREE.Mesh;

  private doors: THREE.Group;
  private doorL!: THREE.Mesh;
  private doorR!: THREE.Mesh;

  private shell: THREE.Mesh[] = [];
  private floorPool: THREE.Mesh;
  private propLight: THREE.PointLight;
  private instLight!: THREE.PointLight;
  /** 镜脚的安全出口灯：厅堂里唯一的一点血红 */
  private exitGlow!: THREE.PointLight;

  private w = 1;
  private h = 1;
  private slim = false;
  private camDist = CAM_POS.z;

  constructor(canvas: HTMLCanvasElement, w: number, h: number) {
    this.slim = window.innerWidth < 900;
    this.camDist = w / h < 0.8 ? 8.8 : CAM_POS.z;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 900 ? 1.5 : 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.88;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.camera = new THREE.PerspectiveCamera(FOV, w / h, 0.1, 120);
    this.camera.position.copy(CAM_POS);
    this.camera.lookAt(CAM_LOOK);

    this.scene.fog = new THREE.FogExp2(0x0c0a0a, 0.028);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
    this.scene.environmentIntensity = 0.16;
    pmrem.dispose();

    this.buildRoom();
    this.buildLights();
    this.applyPlate();

    this.wire.line.renderOrder = 5;
    this.scene.add(this.wire.line);

    const dustCount = this.slim ? 320 : 560;
    this.dustBase = new Float32Array(dustCount * 3);
    const dustGeo = new THREE.BufferGeometry();
    for (let i = 0; i < dustCount; i++) {
      this.dustBase[i * 3] = (rnd(i * 3.1) - 0.5) * 11;
      this.dustBase[i * 3 + 1] = rnd(i * 7.7) * 4.4;
      this.dustBase[i * 3 + 2] = -6.2 + rnd(i * 5.3) * 12;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(this.dustBase.slice(), 3));
    this.dustMat = new THREE.PointsMaterial({
      size: 0.028,
      map: dustTexture(),
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xd9f4ec,
      toneMapped: false,
    });
    this.dust = new THREE.Points(dustGeo, this.dustMat);
    this.scene.add(this.dust);

    const crackPos: number[] = [];
    for (let i = 0; i < 22; i++) {
      let x = (rnd(i * 3.7) - 0.5) * MIRROR_W * 0.92;
      let y = 0.2 + rnd(i * 9.1) * (MIRROR_H - 0.5);
      let a = rnd(i * 11.3) * Math.PI * 2;
      for (let k = 0; k < 5; k++) {
        const nx = x + Math.cos(a) * (0.18 + rnd(i * 5 + k) * 0.5);
        const ny = y + Math.sin(a) * (0.18 + rnd(i * 7 + k) * 0.5);
        crackPos.push(x, y, 0, nx, ny, 0);
        x = nx;
        y = ny;
        a += (rnd(i * 13 + k) - 0.5) * 1.7;
      }
    }
    const crackGeo = new THREE.BufferGeometry();
    crackGeo.setAttribute("position", new THREE.Float32BufferAttribute(crackPos, 3));
    this.crackMat = new THREE.LineBasicMaterial({
      color: 0xdff7ef,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    this.cracks = new THREE.LineSegments(crackGeo, this.crackMat);
    this.cracks.position.set(0, 0, MIRROR_Z + 0.03);
    this.scene.add(this.cracks);

    this.bottles = this.buildBottles();
    this.playbill = this.buildPlaybill();
    this.redString = this.buildRedString();
    this.doors = this.buildDoors();

    this.floorPool = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 9),
      new THREE.MeshBasicMaterial({
        map: beamTexture(),
        transparent: true,
        opacity: 0.055,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    this.floorPool.rotation.x = -Math.PI / 2;
    this.floorPool.position.set(-1.8, 0.012, -2.4);
    this.scene.add(this.floorPool);

    // 结局揭幕：镜子前两瓶汽水与演出单的一小盏暖光
    this.propLight = new THREE.PointLight(0xffd9a8, 0, 4.5, 2);
    this.propLight.position.set(-1.2, 0.9, -5.1);
    this.scene.add(this.propLight);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.38, 0.45, 0.86);
    this.composer.addPass(this.bloom);
    this.grade = new ShaderPass(GradeShader);
    this.composer.addPass(this.grade);
    this.composer.addPass(new OutputPass());

    this.resize(w, h);
  }

  /**
   * 写实底板。海报那种画质靠的是图不是代码：一张剧场剧照当背景，
   * 人物继续用剪影贴在前面，观感就跟海报一致了。
   * 底板缺失（或 ?plate=0）时什么也不做，回到原来纯程序化的厅。
   */
  private applyPlate(): void {
    // 默认关闭：粗拼一版看过，底板和现有取景/地面还没对齐，先留开关等美术定稿。
    // 打开方式：?plate=1
    if (new URLSearchParams(location.search).get("plate") !== "1") return;
    new THREE.TextureLoader().load(
      PLATE_URL,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        this.scene.background = tex;
        // 底板已经把厅堂画黑了；程序化的墙和吊顶再挡在前面就是一块黑幕
        for (const m of this.shell) m.visible = false;
      },
      undefined,
      () => console.warn("[3d] 底板缺失，退回纯程序化厅堂"),
    );
  }

  private buildRoom(): void {
    const board = boardTexture();
    board.wrapS = board.wrapT = THREE.RepeatWrapping;
    board.repeat.set(4, 4);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(26, 26),
      new THREE.MeshStandardMaterial({
        map: board,
        color: 0xffffff,
        roughness: 0.52,
        metalness: 0.2,
        envMapIntensity: 0.3,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0a1011,
      roughness: 0.92,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(26, 6), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-ROOM_HALF, 3, -1);
    this.scene.add(leftWall);
    this.shell.push(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(26, 6), wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(ROOM_HALF, 3, -1);
    this.scene.add(rightWall);
    this.shell.push(rightWall);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.MeshStandardMaterial({ color: 0x05090a, roughness: 1 }));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5.2;
    this.scene.add(ceiling);
    this.shell.push(ceiling);

    // 镜子：整面墙，故事里的那面
    const mirror = new Reflector(new THREE.PlaneGeometry(MIRROR_W, MIRROR_H), {
      clipBias: 0.003,
      textureWidth: this.slim ? 512 : 1024,
      textureHeight: this.slim ? 512 : 1024,
      color: 0x647a72,
    });
    mirror.position.set(0, MIRROR_H / 2 + 0.02, MIRROR_Z);
    this.scene.add(mirror);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x141714, roughness: 0.42, metalness: 0.65 });
    const mk = (gw: number, gh: number, gd: number, x: number, y: number, z: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(gw, gh, gd), frameMat);
      m.position.set(x, y, z);
      m.castShadow = true;
      this.scene.add(m);
    };
    mk(MIRROR_W + 0.62, 0.26, 0.34, 0, MIRROR_H + 0.14, MIRROR_Z + 0.02);
    mk(MIRROR_W + 0.62, 0.3, 0.4, 0, -0.1, MIRROR_Z + 0.02);
    mk(0.3, MIRROR_H + 0.5, 0.38, -MIRROR_W / 2 - 0.16, MIRROR_H / 2, MIRROR_Z + 0.02);
    mk(0.3, MIRROR_H + 0.5, 0.38, MIRROR_W / 2 + 0.16, MIRROR_H / 2, MIRROR_Z + 0.02);

    // 镜框内沿的一道冷光，不然整面镜子会糊成一块亮墙
    const trimMat = new THREE.MeshBasicMaterial({ color: 0x8aa69c, transparent: true, opacity: 0.34, toneMapped: false });
    const trim = (gw: number, gh: number, x: number, y: number) => {
      const t = new THREE.Mesh(new THREE.PlaneGeometry(gw, gh), trimMat);
      t.position.set(x, y, MIRROR_Z + 0.26);
      this.scene.add(t);
    };
    trim(MIRROR_W - 0.06, 0.02, 0, MIRROR_H - 0.04);
    trim(MIRROR_W - 0.06, 0.02, 0, 0.04);
    trim(0.02, MIRROR_H - 0.06, -MIRROR_W / 2 + 0.04, MIRROR_H / 2);
    trim(0.02, MIRROR_H - 0.06, MIRROR_W / 2 - 0.04, MIRROR_H / 2);

    // 左边那扇碎窗：月亮、老树、乌鸦和红绳都在窗外
    const sky = new THREE.Mesh(
      new THREE.PlaneGeometry(4.3, 3.7),
      new THREE.MeshBasicMaterial({ map: nightTexture(), toneMapped: false }),
    );
    sky.position.set(-ROOM_HALF + 0.03, 2.55, -1.6);
    sky.rotation.y = Math.PI / 2;
    this.scene.add(sky);

    const mullionMat = new THREE.MeshStandardMaterial({ color: 0x04080a, roughness: 0.75, metalness: 0.3 });
    for (let i = 1; i <= 3; i++) {
      const z = -1.6 - 2.15 + (4.3 * i) / 4;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.09, 3.7, 0.11), mullionMat);
      bar.position.set(-ROOM_HALF + 0.09, 2.55, z);
      this.scene.add(bar);
    }
    for (let i = 1; i <= 2; i++) {
      const y = 2.55 - 1.85 + (3.7 * i) / 3;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.11, 4.3), mullionMat);
      bar.position.set(-ROOM_HALF + 0.09, y, -1.6);
      this.scene.add(bar);
    }
    // 柱子，给空间一点纵深
    const pilasterMat = new THREE.MeshStandardMaterial({ color: 0x0b1112, roughness: 0.8, metalness: 0.12 });
    for (const side of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.36, 5.2, 0.36), pilasterMat);
        p.position.set(side * (ROOM_HALF - 0.2), 2.6, 1.6 - i * 2.9);
        p.castShadow = true;
        this.scene.add(p);
      }
    }

    // 从碎窗斜切进来的几道光柱
    const shaftMat = new THREE.MeshBasicMaterial({
      map: shaftTexture(),
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    const shafts = [
      { x: -2.55, y: 1.95, z: 0.7, w: 1.15, len: 4.9, rot: 0.74 },
      { x: -2.7, y: 1.85, z: -1.3, w: 1.6, len: 5.2, rot: 0.7 },
      { x: -2.4, y: 2.05, z: -3.1, w: 0.95, len: 4.6, rot: 0.78 },
    ];
    for (const s of shafts) {
      const q = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.len), shaftMat);
      q.position.set(s.x, s.y, s.z);
      q.rotation.z = s.rot;
      this.scene.add(q);
    }
  }

  private buildLights(): void {
    const hemi = new THREE.HemisphereLight(0x9fc7bd, 0x04070a, 0.2);
    this.scene.add(hemi);

    // 月光从左边窗子斜切进来
    this.moon = new THREE.DirectionalLight(0xc3e8dc, 1.25);
    this.moon.position.set(-7.5, 5.5, 2.4);
    this.moon.target.position.set(0.4, 0.9, -2.6);
    this.moon.castShadow = true;
    this.moon.shadow.mapSize.set(this.slim ? 1024 : 2048, this.slim ? 1024 : 2048);
    this.moon.shadow.camera.left = -8;
    this.moon.shadow.camera.right = 8;
    this.moon.shadow.camera.top = 8;
    this.moon.shadow.camera.bottom = -8;
    this.moon.shadow.camera.near = 0.5;
    this.moon.shadow.camera.far = 30;
    this.moon.shadow.bias = -0.0012;
    this.scene.add(this.moon, this.moon.target);

    // 镜面方向的冷边光，让黑色人偶有轮廓
    const rim = new THREE.DirectionalLight(0xd6fff4, 1.05);
    rim.position.set(1.5, 4.2, -8);
    rim.target.position.set(0, 1.2, 1);
    this.scene.add(rim, rim.target);

    const fill = new THREE.DirectionalLight(0x6d9c95, 0.3);
    fill.position.set(0, 2, 7);
    this.scene.add(fill);

    const windowGlow = new THREE.PointLight(0xa9ded0, 4, 12, 2);
    windowGlow.position.set(-ROOM_HALF + 0.6, 2.6, -1.6);
    this.scene.add(windowGlow);

    // 跟着示范老师的一盏暖光：暗场里动作必须读得出来
    this.instLight = new THREE.PointLight(0xffcf96, 2.4, 5, 2);
    this.scene.add(this.instLight);

    // 镜脚那道血红：整间厅堂只有这一处红。
    // 挂在吊顶或侧墙都不进画面，只有贴地放在镜前，红光才会落到地板上、从背后勾住人偶。
    this.exitGlow = new THREE.PointLight(0xff2a1e, 9, 7.5, 2);
    this.exitGlow.position.set(0, 0.95, MIRROR_Z + 0.55);
    this.scene.add(this.exitGlow);

    // 灯管本体：一条极细的红线，让「红光是从哪来的」说得通
    const exitPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(MIRROR_W * 0.94, 0.045),
      new THREE.MeshBasicMaterial({ color: 0xff3a26, transparent: true, opacity: 0.72, toneMapped: false }),
    );
    exitPanel.position.set(0, 0.035, MIRROR_Z + 0.42);
    exitPanel.rotation.x = -Math.PI / 2;
    this.scene.add(exitPanel);
  }

  private buildBottles(): THREE.Group {
    const g = new THREE.Group();
    const glass = new THREE.MeshStandardMaterial({
      color: 0x22483c,
      roughness: 0.08,
      metalness: 0.2,
      transparent: true,
      opacity: 0.55,
      envMapIntensity: 1.6,
    });
    const capMat = new THREE.MeshStandardMaterial({ color: 0x8a8f88, roughness: 0.35, metalness: 0.8 });
    const labelMat = new THREE.MeshStandardMaterial({ color: 0xb9b3a0, roughness: 0.85 });

    const make = (x: number, z: number, ry: number, empty: boolean) => {
      const b = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.46, 18), glass);
      body.position.y = 0.23;
      const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.085, 0.12, 18), glass);
      shoulder.position.y = 0.52;
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.042, 0.15, 16), glass);
      neck.position.y = 0.65;
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.035, 16), capMat);
      cap.position.y = 0.74;
      const label = new THREE.Mesh(new THREE.CylinderGeometry(0.096, 0.096, 0.16, 18, 1, true), labelMat);
      label.position.y = 0.26;
      b.add(body, shoulder, neck, cap, label);
      if (!empty) {
        const liquid = new THREE.Mesh(
          new THREE.CylinderGeometry(0.072, 0.082, 0.36, 16),
          new THREE.MeshStandardMaterial({ color: 0x6b3a12, roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.85 }),
        );
        liquid.position.y = 0.19;
        b.add(liquid);
      }
      b.position.set(x, 0, z);
      b.rotation.y = ry;
      b.traverse((o) => {
        o.castShadow = true;
      });
      g.add(b);
    };

    make(-1.55, -5.5, 0.4, true);
    make(-0.98, -5.62, -0.5, false);
    g.visible = false;
    this.scene.add(g);
    return g;
  }

  private buildPlaybill(): THREE.Mesh {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(0.62, 0.85),
      new THREE.MeshStandardMaterial({ map: playbillTexture(), roughness: 0.92, metalness: 0, side: THREE.DoubleSide }),
    );
    m.position.set(1.35, 0.42, -6.24);
    m.rotation.set(-0.12, -0.24, 0.05);
    m.visible = false;
    this.scene.add(m);
    return m;
  }

  private buildRedString(): THREE.Mesh {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push(new THREE.Vector3(-ROOM_HALF + 0.1, 2.95 - t * 0.55, -2.05 + Math.sin(t * Math.PI) * 0.06));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const m = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 22, 0.021, 6, false),
      new THREE.MeshBasicMaterial({ color: 0xc94b3e, transparent: true, opacity: 0.85, toneMapped: false }),
    );
    m.visible = false;
    this.scene.add(m);
    return m;
  }

  private buildDoors(): THREE.Group {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    this.doorL = new THREE.Mesh(new THREE.BoxGeometry(5.4, 8, 0.2), mat);
    this.doorR = new THREE.Mesh(new THREE.BoxGeometry(5.4, 8, 0.2), mat);
    g.add(this.doorL, this.doorR);
    g.position.z = 2.4;
    this.scene.add(g);
    return g;
  }

  resize(w: number, h: number): void {
    this.w = w;
    this.h = h;
    this.camDist = w / h < 0.8 ? 8.8 : CAM_POS.z;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.grade.uniforms.uRes.value.set(w, h);
  }

  render(scene: Scene, w: number, h: number): void {
    if (w !== this.w || h !== this.h) this.resize(w, h);

    const distZ = this.camDist;
    const portrait = w / h < 0.8;
    const visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * distZ;
    const wpp = (visibleH * (w / h)) / w;
    // 竖屏太窄，人物按屏幕高度算会占满整幅，压小一点留出舞台
    const sizeK = portrait ? 0.72 : 1;
    const scaleFor = (px: number, min = 0.5, max = 0.92) =>
      Math.min(max, Math.max(min, ((px * wpp) / BODY_HEIGHT) * sizeK));
    const toX = (px: number) => (px - w / 2) * wpp;
    const toZ = (px: number, height: number) => {
      const footY = px + (SEG.thigh + SEG.shin) * (height / BODY_HEIGHT);
      return (footY - h * 0.93) * wpp * 1.25;
    };

    let i = 0;
    const take = (dancer: boolean) => {
      if (!this.pool[i]) {
        const v = new FigureView(dancer);
        this.scene.add(v.group);
        this.pool[i] = v;
      }
      return this.pool[i++];
    };

    const instZ = toZ(scene.instructor.y, scene.instructor.height);
    for (const z of scene.zombies) {
      const view = take(false);
      // 僵尸压到示范老师身后，避免手臂挡住动作
      const zPos = Math.min(toZ(z.y, z.height), instZ - 0.4);
      const zX = toX(z.x) * (portrait ? 1.14 : 1);
      view.update(z, scene.time, scaleFor(z.height, 0.42, 0.85), zX + (z.lag ?? 0) * wpp, zPos);
    }

    const inst = take(true);
    const instScale = scaleFor(scene.instructor.height, 0.6, 0.95);
    inst.update(scene.instructor, scene.time, instScale, toX(scene.instructor.x), instZ);
    this.instLight.position.set(toX(scene.instructor.x) - 0.85, 1.9, instZ + 1.4);

    for (let k = i; k < this.pool.length; k++) this.pool[k].hide();

    const rf = scene.reflection;
    if (rf) {
      // 「你」只出现在镜面里：贴在镜子前面，而不是投影到镜头前
      this.wire.update(rf, 2.3 / BODY_HEIGHT, toX(rf.x) * 0.2, MIRROR_Z + 0.22);
    } else {
      this.wire.update(null, 1, 0, 0);
    }

    // 镜子裂纹 / 血
    this.crackMat.opacity = Math.min(0.95, scene.crack * 0.9);
    this.cracks.visible = scene.crack > 0.02;

    // 故事道具
    const endingT = scene.ending ?? 0;
    this.bottles.visible = endingT > 0.6;
    this.playbill.visible = endingT > 1.8;
    this.propLight.intensity = endingT > 0.4 ? Math.min(1, (endingT - 0.4) / 1.4) * 2.2 : 0;
    this.redString.visible = (scene.level ?? 0) >= 3 || endingT > 0;
    if (this.redString.visible) {
      const glow = 0.55 + Math.sin(scene.time * 2.2) * 0.25;
      (this.redString.material as THREE.MeshBasicMaterial).opacity = glow;
    }

    // 尘埃
    const pos = this.dust.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let d = 0; d < arr.length; d += 3) {
      arr[d] = this.dustBase[d] + Math.sin(scene.time * 0.22 + d) * 0.12;
      arr[d + 1] = 0.2 + ((this.dustBase[d + 1] + scene.time * 0.055) % 4.4);
      arr[d + 2] = this.dustBase[d + 2] + Math.cos(scene.time * 0.17 + d) * 0.1;
    }
    pos.needsUpdate = true;

    // 开场双开门
    const intro = scene.intro ?? 1;
    this.doors.visible = intro < 1;
    if (this.doors.visible) {
      const open = Math.max(0, Math.min(1, (intro - 0.22) / 0.58));
      this.doorL.position.x = -(2.7 + open * 4.2);
      this.doorR.position.x = 2.7 + open * 4.2;
    }

    // 镜头抖动 + 轻微呼吸
    const sh = scene.shake;
    const sx = (rnd(scene.time * 31) - 0.5) * sh * 0.34;
    const sy = (rnd(scene.time * 47) - 0.5) * sh * 0.28;
    const breathe = Math.sin(scene.time * 0.7) * 0.012;
    this.camera.position.set(CAM_POS.x + sx, CAM_POS.y + sy + breathe, this.camDist);
    this.camera.lookAt(CAM_LOOK);

    this.bloom.strength = 0.38 + (scene.crack > 0.4 ? 0.2 : 0) + sh * 0.16;

    // 出口灯偶尔接触不良地闪一下；死亡时（blood 上升）红光跟着漫开，
    // 前摇那 0.45 秒里玩家看到的就是"红灯亮起来了"
    const dying = scene.blood;
    const stutter = rnd(Math.floor(scene.time * 6)) > 0.94 ? 0.45 : 1;
    this.exitGlow.intensity = (9 + dying * 9) * stutter;

    this.grade.uniforms.uTime.value = scene.time;
    this.grade.uniforms.uBlood.value = scene.blood;
    this.grade.uniforms.uGlitch.value = scene.glitch;

    this.dustMat.opacity = 0.16 + (1 - scene.dark) * 0.08;
    (this.floorPool.material as THREE.MeshBasicMaterial).opacity = 0.045 + Math.sin(scene.time * 0.8) * 0.01;

    this.composer.render();
  }
}

export function createStage3D(canvas: HTMLCanvasElement, w: number, h: number): Stage3D | null {
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") || probe.getContext("webgl");
    if (!gl) return null;
    return new Stage3D(canvas, w, h);
  } catch {
    return null;
  }
}
