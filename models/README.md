# Tripo 模型放这里

从 Studio 导出的 GLB 按下面的名字丢进来就行，**代码会自动替换掉程序化剪影**，不用改任何代码。

| 文件名 | 对应资产 | 需要骨骼 |
|---|---|---|
| `dancer_f.glb` | A1 女舞者 | 是 |
| `dancer_m.glb` | A2 男舞者 | 是 |
| `zombie_base.glb` | A3 僵尸基础型 | 是 |
| `zombie_lead.glb` | A4 僵尸领舞型 | 是 |
| `zombie_squat.glb` | A12 僵尸矮壮型 | 是 |
| `zombie_gown.glb` | A13 僵尸长裙型 | 是 |
| `candelabra.glb` | A5 三头烛台 | 否 |
| `chandelier.glb` | A6 铁环吊灯 | 否 |
| `mirror_frame.glb` | A7 碎镜立框 | 否 |
| `raven.glb` | A8 乌鸦 | 否 |
| `gramophone.glb` | A9 留声机 | 否 |
| `pew.glb` | A10 教堂长椅 | 否 |
| `soda.glb` | A11 汽水瓶 | 否 |
| `altar.glb` | A14 教堂祭坛 | 否 |
| `angel.glb` | A15 石雕天使 | 否 |
| `window_frame.glb` | A16 彩窗铁框 | 否 |
| `roof_truss.glb` | A17 屋顶木架 | 否 |

## 现在的状态

**一个都没有。** 这不是错误 —— 加载失败会静默回落到程序化剪影，游戏照常能玩。

目前只有 `dancer_f.glb`、`zombie_base.glb` 和 `dancer_m.glb` 已经被代码接上了；
道具类（A5–A17）**还没接**，等有模型了再逐个挂进 `scene.ts`。

## 模型要求

- GLB，Y 轴向上，脚底在原点，身高 1.7–1.8 m，T-pose
- 角色必须跑过 Auto-Rig（没骨骼的模型会被跳过，不报错）
- 贴图 1024 以内即可 —— 渲染只用轮廓，贴图不参与

## 注意

这些文件是构建产物的一部分，会被打包进 `dist/models/`。
单个 GLB 建议控制在 5 MB 以内，否则手机上首次加载会明显卡。
