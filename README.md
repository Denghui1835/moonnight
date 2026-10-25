# 月夜 · MOONNIGHT

> **DEAD BEAT：最后一拍**
>
> 午夜十二点，旧剧院的灯一盏盏亮起。镜子里有人朝你伸出手。
> 跟着她跳——跳错一拍，他们就会吃掉你的脑子。

参与 **WaytoAGI 1024 超能 Coding 周末 · 游戏赛道**

![标题画面](docs/screenshots/01-title.png)

## 在线试玩

| 入口 | 链接 |
|---|---|
| **国内镜像 A（推荐，大陆直连）** | <https://moonnight-c1n29gwia6s.qoder.zone/> |
| **国内镜像 B（备用）** | <https://moonnight-mirror-rvzkngbzcr9.qoder.website/> |
| **GitHub Pages（主站）** | <https://denghui1835.github.io/moonnight/> |
| 主题曲 | `public/music/dead-beat.mp3`（5:33 / 129.2 BPM，原创，AI 合成） |

- 三个入口是同一份代码的两个构建（Pages 用 `/moonnight/` 前缀，镜像用根路径），玩法一致；两个镜像域名分属两套 Qoder 账号凭证，每次重新构建后要各发一次。
- **当前版本（2026-10-24 夜）：** Pages 是 `index-D2UM6ZrH.js` + `index-DFthY50X.css`，含死亡前摇、失败归因、抬头「第 N 关 / 共 N 关」、镜脚那道血红安全出口灯。两个镜像还停在上一版构建（镜像 A `index-CaSHR2cu.js`、镜像 B `index-DKMki3oD.js`），**看最新版请走 GitHub Pages**；镜像重发要在 Qoder 里用 Sites 工具完成。GitHub Pages 在国内部分网络/代理下会打不开，届时先用镜像，玩法不受影响。
- 部署不是 push 到 `main` 就自动生效：Pages 走 `gh-pages` 分支，仓库里没有 workflow，改完要按 `docs/验证记录.md` 第 11.4 节把 `dist/` 推上 `gh-pages`。
- 手机扫码（左：镜像，右：GitHub Pages）：

  <img src="docs/screenshots/qr-moonnight-mirror.png" alt="镜像二维码" width="180"> <img src="docs/screenshots/qr-moonnight-pages.png" alt="GitHub Pages 二维码" width="180">

- 推荐桌面浏览器（Chrome / Edge）。摄像头模式需要授权；不方便开摄像头就选键盘模式，难度完全一致。
- 第一次进入摄像头模式会加载本地姿势模型（约 5.6 MB），之后走缓存。
- 本地兜底：`npm install` 后 `npm run dev`（<http://localhost:5173/>）；或 `npm run build && npm run preview`（<http://localhost:4173/moonnight/>）。Vite 的 base 是 `/moonnight/`，不要直接双击打开 `dist/index.html`。

## 这是什么

一个恐怖舞蹈游戏。你站在镜子前，镜子里有一个戴黑色礼帽的「人」在教你跳舞；
你身后的队尾站着一排东西——它们曾经也是来跳舞的人，跳错了，被吃掉了脑子，只剩怨魂留在这里。

它们一直在靠近。走到快要抓住你的时候，会像掉帧一样退回远处，再重来。
**你跳对了，这一晚就继续循环；你跳错了，这一晚就结束。**

| | |
|---|---|
| ![教学关](docs/screenshots/02-tutorial.png) | ![第五关](docs/screenshots/03-level5.png) |

## 玩法

- **摄像头模式**：跟着镜中人的动作跳，MediaPipe 实时识别你的身体，画面不上传。
- **键盘模式**：`↑ ↓ ← →`（或 `W A S D`）对应四个动作，难度与摄像头一致。
- **手机触控**：触屏设备自动显示底部四键舞蹈板，点按即可玩，无需外接键盘。
- **教学关**：第 0 关不会死，可「重看这个动作」「重看全部」，也可直接跳过。
- **肉鸽**：正式关跳错一次就结束，回到第 1 关。判错后有 0.45 秒预兆（音乐抽空、镜脚那道红灯亮起），不是突然扑脸。
- **死得明白**：结算页会写明死在哪一关、第几拍、该做什么、你做了什么。
- **六关**：动作数 8 → 18，全程 129.2 BPM 跟着主题曲走；编舞逐关加花。
- **终章**：跳完最后一支没教过的舞，队伍里第一个人的来历会被揭开。

## 操作

| 操作 | 键位 |
|---|---|
| 四个舞蹈动作 | `↑` `↓` `←` `→` 或 `W` `A` `S` `D` |
| 手机 / 平板 | 底部四键舞蹈板，点按即判定 |
| 静音 / 取消静音 | `M`，或点界面左上角的「♪ 声音」（手机上没有键盘时的唯一入口） |
| 重看教学 | 界面按钮 |

摄像头打不开、模型加载失败或拒绝授权时，游戏自动降级到键盘模式并恢复所有按钮，不会卡在加载页。

## 原创配乐

游戏内背景乐是 [`public/music/dead-beat.mp3`](public/music/dead-beat.mp3) —— **原创作品**，由我用 AI 音乐生成工具合成（旋律、编曲、鼓组均为我生成与挑选，没有翻唱、没有采样任何既有歌曲）。5 分 33 秒 / 129.2 BPM。

- 我用 librosa 做了真实的节拍与小节分析：breakdown 从第 564 拍开始，高潮段为第 598–680 拍，尾声从第 680 拍之后开始；
- **编舞表照着这首歌的真实段落写**：第 1–6 关逐关加花、密度递增；终章分 breakdown 与高潮两段，动作收回到「伸手、退步、转身、抬头」四个核心动作；
- 整首歌**全程只播一遍**，换关不重播；节拍直接锚在音轨实际播放位置上（`AudioContext.currentTime` 减起播时刻），音频被挂起时退回帧时钟、恢复后重新对齐。

早期还有一首**程序合成**的实验曲 [`docs/music/moonnight-metal.wav`](docs/music/moonnight-metal.wav)（65.66 秒 / 148 BPM，由 `src/metal.ts` + `src/metalRender.ts` 离线渲染）。它现在只作为兜底：音频文件缺失或加载失败时才启用，代码与音频完整保留。细节见 [docs/music/README.md](docs/music/README.md)。

## 技术

| 模块 | 选型 |
|---|---|
| 构建 | Vite + TypeScript（strict） |
| 渲染 | Three.js r170 实时 3D：程序化人偶、真实镜面反射、Bloom、体积光、菲涅尔轮廓光；WebGL 不可用时自动退回 Canvas 2D 剪影 |
| 音频 | 真实音轨 + 真实音效采样（门轴/脚步/乌鸦/惨叫/玻璃/尸群），任一文件缺失自动回退程序合成；节拍锚在音轨播放位置 |
| 体感 | MediaPipe PoseLandmarker (lite)，wasm 与模型全量本地化，不依赖外网 |
| 判定 | 10 个加权姿态特征；键盘模式共用同一套节拍窗口 |
| 备用音频 | 程序合成兜底：25ms 调度 / 120ms 前瞻，音频时钟带单调回退与恢复重锚 |
| 兼容 | 摄像头失败自动降级并关闭轨道；移动端 375px 无横向溢出，触屏自动出现四键舞蹈板 |

姿势模型与 wasm 运行时来自 [MediaPipe](https://github.com/google-ai-edge/mediapipe)（Apache-2.0），已随仓库本地化。

## 本地运行

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产出 dist/
npm run preview  # 预览生产构建
npm run qa       # 桌面 E2E（50 项，含 3D 回退/帧率/死亡前摇与归因；建议 QA_URL 指向 npm run build + vite preview 的生产构建）
npm run touchqa  # 手机触控 E2E（29 项，375×812 设备模拟；QA_LIVE=1 走线上 DOM 冒烟）
npm run mirror   # dist -> dist-mirror（国内镜像用的根路径版）
npm run qr       # 重新生成试玩二维码
npm run snapshot # 增量同步快照到 D:\MoonNight（排除依赖与验收临时目录）
```

## 目录

```
src/
  main.ts        入口、界面切换、输入、HUD
  game.ts        游戏状态机、关卡、判定、僵尸循环
  render3d.ts    Three.js 镜厅：人偶、镜面、体积光、后期
  stage.ts       Canvas 2D 兜底场景与剪影渲染
  rig.ts         正向运动学骨架与姿态匹配
  moves.ts       动作库与关卡编排
  pose.ts        MediaPipe 体感
  audio.ts       实时音乐与音效调度
  metal.ts       金属编曲引擎（实时 + 离线共用）
  metalRender.ts OfflineAudioContext 渲染并导出 WAV
public/
  wasm/          MediaPipe 运行时（本地化）
  models/        pose_landmarker_lite.task
docs/
  故事-最终版.md  完整剧本
  作品介绍.md     评审向介绍
  演示脚本.md     3 分钟分镜与录制步骤
  验证记录.md     修复与测试记录
  music/         原创金属配乐与说明
  screenshots/   截图
tools/
  qa.mjs         CDP 桌面 E2E 测试（50 项）
  touchqa.mjs    CDP 手机触控 E2E 测试（29 项）
```

## 设计文档

- [作品介绍](docs/作品介绍.md)
- [完整故事](docs/故事-最终版.md)
- [产品规划书](docs/产品规划书.md)（正式版，另有 `docs/产品规划书.docx`）
- [项目规划书](docs/规划书.md)（立项期草案）
- [故事设定](docs/故事设定.md)
- [验证记录](docs/验证记录.md)
- [演示脚本](docs/演示脚本.md)

## 原创性

- 代码、美术、音乐全部原创。
- 默认画面是程序化剪影，没有任何图片素材进入渲染链路。
- 主题曲与音效为原创素材（AI 生成 / 自行采样合成），没有第三方曲目或采样。
- `public/plates/` 里存有宣发用的剧照（血色版，与 `宣发/分镜图_写实版/` 同一张），只用于默认关闭的写实底板实验（`?plate=1`），不参与默认画面。
- 编舞为原创动作，未使用任何已有作品的编舞。
- 仅以《Thriller》的恐怖叙事氛围与《Beat It》的硬摇滚配器作为风格参考，未复制任何旋律、riff 或受版权保护的段落。

## 状态

WaytoAGI 1024 超能 Coding 周末参赛作品（2026-10-24 ~ 10-25）。
构建与浏览器端验证记录见 [docs/验证记录.md](docs/验证记录.md)。
