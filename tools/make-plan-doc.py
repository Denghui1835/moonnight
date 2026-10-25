# -*- coding: utf-8 -*-
"""生成《月夜》产品规划书：同时产出 docs/产品规划书.md 与公文格式 .docx。

格式规格照 D:\\计协 整改报告 v6：仿宋三号 / 行距固定 28 磅 / 首行缩进 2 字；
表头黑体四号、表体仿宋四号；页脚“— 页码 —”；目录用 outlineLvl + TOC 域。
"""
import io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

import docx
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT_MD = r"D:\MoonNight\docs\产品规划书.md"
OUT_DOCX = r"D:\MoonNight\docs\产品规划书.docx"

# ------------------------------------------------------------------ 内容
C = []
def T(t):   C.append(("title", t))
def ST(t):  C.append(("sub", t))
def H1(t):  C.append(("h1", t))
def H2(t):  C.append(("h2", t))
def H3(t):  C.append(("h3", t))
def P(t):   C.append(("p", t))
def CAP(t): C.append(("cap", t))
def TB(w, rows): C.append(("table", w, rows))
def FIG(path, cap, width): C.append(("fig", path, cap, width))

T("月夜 MoonNight 产品规划书")
ST("——体感节奏恐怖游戏《月夜》产品规划")
P("项目名称：月夜（MoonNight），主题曲《dead beat》")
P("产品形态：零安装网页游戏，摄像头体感与键盘双模式")
P("适用赛事：WaytoAGI 1024 超能 Coding 周末 · 游戏赛道")
P("编制日期：2026 年 10 月 24 日")

H1("一、产品概述")
H2("（一）产品定义")
P("《月夜》是一款运行在浏览器里的体感节奏恐怖游戏。玩家站在一面镜子前，跟着镜中那个戴黑色礼帽的人逐拍跳舞；跳错一拍，身后排队的怨魂就会扑上来，这一晚就此结束。")
P("核心体验是一句话：跟着她跳，别跳错。产品不需要安装、不需要手柄，打开网页、点一下授权就能玩；不方便开摄像头时，方向键与手机四键舞蹈板提供完全等价的替代方案。")

H2("（二）目标用户")
P("一是十八至三十岁、在短视频平台消费恐怖与解谜内容的轻度玩家。他们不装客户端、不接受长教学，通常靠一条十几秒的视频决定要不要点开，因此产品把“第一次打开到看懂怎么玩”压缩到二十秒以内。")
P("二是直播与短视频创作者。单局一分半到三分半、失败画面有强情绪反馈、横竖屏都可读，天然适合做切片与二创。")
P("三是线下展台与社团活动场景。摄像头模式不需要键盘鼠标，人站上去就能玩，适合摆摊与路演。")

H2("（三）差异化定位")
P("市面上的舞蹈游戏解决的是“跳得像不像”，恐怖游戏解决的是“逃不逃得掉”。《月夜》把两者接在一起：跳错不是扣分，而是死。这一条把节奏游戏的容错压力换成了恐怖片的生存压力，也是产品最核心的差异。")
CAP("表 1  同类产品对比")
TB([2.6, 5.2, 6.4], [
 ["类别", "典型做法", "《月夜》的做法"],
 ["舞蹈游戏", "跟跳、打分、鼓励重复", "跟跳但失败即死，错误直接进入叙事"],
 ["恐怖追逐", "跳跃惊吓、血腥、追逐跑", "无血腥、无跳跃惊吓，压力来自怨魂一步步靠近的循环"],
 ["体感小游戏", "演示性质，玩完即走", "有六关递进与终章叙事，可反复挑战"],
])

H1("二、玩法设计")
H2("（一）核心循环")
P("推门开场（五秒，可跳过）进入教学关；教学关只教四个核心动作，不判定、不死亡、可无限重看。教学结束后进入正式关，共六关，逐关加花。六关通过后进入终章，分收束与高潮两段，结尾揭晓队伍里第一个人的来历，随后可立即重开。")
P("单局时长约一分四十秒至三分三十秒。失败不设惩罚性读条，死亡前有零点四五秒的预兆，随后约两秒半回到结算页，点一下即可从第一关重来，保证情绪曲线不被等待打断。")

H2("（二）动作库与编舞")
P("全片共十四个动作，全部由一套正向运动学骨架以关节角度参数化描述，不依赖任何动画文件与外部模型。核心四动作贯穿全场，也是终章唯一保留的动作。")
CAP("表 2  核心四动作")
TB([2.4, 2.2, 4.0, 6.2], [
 ["动作", "键位", "身体语义", "在叙事中的作用"],
 ["伸手", "↑", "向镜中伸出手", "开场与终章的第一拍"],
 ["退步", "↓", "后退半步，重心后坐", "面对逼近时的本能反应"],
 ["转身", "←", "侧身拧腰", "镜中人的标志动作"],
 ["抬头", "→", "仰头看月", "终章最后一拍"],
])
P("编舞不做随机生成。六关的动作序列、每个动作占几拍，全部写成固定表，并照主题曲的真实段落排布。因此每一关的舞、每一次重开都完全一致，玩家的进步能被自己感知；这也是节奏类产品手感可信的前提。")

H2("（三）关卡难度曲线")
P("难度由动作数量与单动作拍数共同控制：前四关每动作四拍，第四至六关收紧到三拍，动作数从八个逐步加到十八个。全程速度固定为 129.2 BPM，与主题曲一致，不随关卡变化，避免“换关换手感”。")
CAP("表 3  关卡难度曲线")
TB([2.6, 1.9, 2.3, 7.2], [
 ["关卡", "动作数", "每动作拍数", "新增变量"],
 ["教学关", "4", "4", "只教核心四动作，不判定不死亡"],
 ["第 1 关", "8", "4", "只有最基础的组合"],
 ["第 2 关", "10", "4", "加入侧倾与单膝"],
 ["第 3 关", "12", "4", "加入抓握与双臂上举"],
 ["第 4 关", "14", "3", "拍数收紧，密度上升"],
 ["第 5 关", "16", "3", "以迈步打断连续节奏"],
 ["第 6 关", "18", "3", "全动作库混排"],
 ["终章收束", "8", "4", "回到核心四动作，音乐进入收束段"],
 ["终章高潮", "20", "4", "核心四动作循环，密度全场最高"],
])

H2("（四）判定与容错")
P("判定是这类产品的生死线。产品采用两组并列的判定：摄像头模式取十组关节角度的加权误差，与玩家身高体型无关；键盘模式按判定窗口内的按键时间判定。两种模式的难度完全一致，不因设备差异区别对待。")
CAP("表 4  判定参数")
TB([3.4, 6.2, 4.6], [
 ["项", "设计", "理由"],
 ["摄像头判定", "十组关节角度加权误差，取窗口内最接近的一帧", "与身高体型无关"],
 ["通过阈值", "偏宽松", "一次错误即结束，必须给足容错"],
 ["防误判", "连续若干帧不达标才判错", "摄像头抖动不致命"],
 ["键盘判定", "窗口内按对即过", "与摄像头等价，不降难度"],
 ["掉帧补判", "一帧跨过判定窗口时，先补判上一个动作再换动作", "低帧率或截屏卡顿不会静默吞掉动作"],
 ["自动降级", "摄像头不可用、光线不足、检测丢失超过两秒时切键盘", "不卡在加载页，本局继续"],
])

H2("（五）失败体验与安全感")
P("这类产品的挫败感不来自“死”，而来自“不知道为什么死、下一遍还是不知道”。判错即终局这条内核不改，但在死亡前后各加一层交代，压力就从失控变成可应对。")
P("第一层是前摇：判错的瞬间不立刻扑脸，音乐先抽空、厅堂里那盏红色的安全出口灯先亮起来、怨魂先抬头，零点四五秒之后才撞上玻璃。这一下不是剧透，是把“被吓一跳”换成“我知道我错了”。")
P("第二层是归因：结算页除了一句话的叙事，还多一行小字，写明死在哪一关、第几拍、该做什么、你做了什么。摄像头模式写“身体没有到那个位置”，键盘模式写具体按错的方向。")
P("第三层是进度：抬头显示“第 N 关”，下面一行小字“共 6 关”，玩家知道自己离终点还有多远，恐惧才会转成专注。")
CAP("表 5  失败体验的三层保底")
TB([2.8, 6.0, 5.8], [
 ["层次", "做法", "解决什么"],
 ["前摇", "判错后停顿零点四五秒：音乐抽空、红光加深、怨魂抬头，然后才扑", "把“被吓”换成“我知道我错了”"],
 ["归因", "结算写明关卡、第几拍、该做的动作与键位、实际按下的键", "把“不知道错在哪”换成“下一遍知道改什么”"],
 ["进度", "抬头显示第 N 关 / 共 6 关", "知道终点在哪，压力从焦虑转成专注"],
])
P("这三层都不降低难度，一击必死的内核原样保留。明确不做的三件事是：血条与理智值、双人救援、怪物谐星化。一旦“跳错只扣血”，镜子后面的东西会吃掉你的脑子这件事就塌了。")

H2("（六）终章与叙事收束")
P("第 6 关结束后进入终章，分两段。第一段对应主题曲的收束段（第 564 至 598 拍），动作收回到核心四动作，字幕只留一句“收回来”，把玩家的注意力从“跳对”拉回“在看什么”。第二段对应高潮（第 598 至 680 拍），核心四动作循环，密度回到全场最高。")
P("结尾不解释、不圆满：最后一拍她放下手，镜子空了，队伍的最后多了一个人，第二天镜子前放着两瓶汽水。恐怖感与情感同时收口，同时为续作留出接口。")

H1("三、内容与美术")
H2("（一）画面语言")
P("主画面使用 Three.js 实时渲染，包含程序化人偶、真实镜面反射、爆炸光晕、体积光、菲涅尔轮廓光与指数雾。全片统一极简剪影：纯黑身体、圆形头、细长四肢，没有五官与衣纹。恐怖来自看不清，而不是建模精度。")
P("色调以冷绿月光为主，整间厅堂只留一处血红：镜脚那道安全出口的灯。它平时只是镜框下沿一条极细的红线，红光贴着地面漫开；被判错时这盏灯会亮起来，血色沿着地面与画面边缘涨上来——环境色调本身就是死亡预兆的一部分。")
P("WebGL 不可用时自动退回 Canvas 2D 剪影场景，玩法与判定完全不变，保证低端设备与老旧浏览器也能进入游戏。")
P("下面四张为实际运行截图，不是效果图：标题画面、教学关、第五关与终章结尾。")
FIG("docs/screenshots/01-title.png", "图 1  标题画面", 13.0)
FIG("docs/screenshots/02-tutorial.png", "图 2  教学关：镜中人示范，玩家跟做", 13.0)
FIG("docs/screenshots/03-level5.png", "图 3  第五关：怨魂逼近，动作密度上升", 13.0)
FIG("docs/screenshots/05-ending.png", "图 4  终章结尾：镜子空了，队伍最后多了一个人", 13.0)

H2("（二）音频设计")
P("主题曲《dead beat》为原创 AI 合成作品，时长五分三十三秒，一百二十九点二 BPM，旋律、编曲与鼓组均为自制，无翻唱、无采样。节拍与小节由 librosa 实地分析得出，段落划分不靠估算。")
P("整首只播一遍，换关不重播；游戏节拍直接锚在音轨的实际播放位置上，音频被浏览器挂起时退回帧时钟、恢复后重新对齐，因此不会出现“切后台回来拍子乱了”。六类音效（门轴、脚步、乌鸦、惨叫、玻璃、尸群）使用真实采样，任一文件缺失自动回退到程序合成。")

H2("（三）美术资产策略")
P("程序化建模无法达到宣发海报那样的写实质感，差距在材质资产而不在渲染管线。因此产品采用分层策略：远景使用写实底板，角色继续使用程序化剪影。海报中的舞者本身即为剪影，这一层不需要写实；真正需要写实化的是背景与怨魂。")
P("底板不重新生成整张海报，而是以现有海报做局部重绘得到“空场版”，保证光影与配色一致；地面倒影继续由实时反射计算，比画在图里更活。")

H1("四、技术方案")
H2("（一）技术架构")
CAP("表 6  技术架构")
TB([2.9, 5.3, 6.0], [
 ["模块", "选型", "说明"],
 ["构建", "Vite + TypeScript（strict）", "静态产物，直接部署到任意静态托管"],
 ["渲染", "Three.js r170 实时 3D", "镜面反射、泛光、体积光；WebGL 不可用时退回 Canvas 2D"],
 ["体感", "MediaPipe PoseLandmarker（lite）", "模型与运行时全量本地化，不依赖外网"],
 ["音频", "Web Audio + 真实音轨与采样", "逐项回退到程序合成，缺素材也能跑"],
 ["判定", "十组关节角度加权误差", "摄像头与键盘共用同一套节拍窗口"],
])

H2("（二）关键工程问题与解法")
P("产品在两天内完成，绝大部分时间花在把“看着能跑”变成“每次都一样”上。下表是已定位并修复的五个核心问题。")
CAP("表 7  关键问题与解法")
TB([3.4, 5.2, 5.6], [
 ["问题", "现象", "解法"],
 ["判定窗口被跨过", "低帧率或截屏卡顿时偶发少算一次判定，且不报错", "换动作前补判上一动作，最后一个动作同样处理"],
 ["音频挂起后跳拍", "切后台回来拍子整体前跳", "音频未运行时退回帧时钟，恢复后重新锚定本关起点"],
 ["素材缺失", "无音频文件时游戏静音但仍可玩", "按项回退到程序合成，不阻断流程"],
 ["摄像头失败", "页面卡在加载态", "自动降级到键盘模式并关闭轨道，恢复全部按钮"],
 ["资源路径写死绝对地址", "部署到子路径后音效与配乐全部 404，静默退回程序合成，不报错也听不到原曲", "所有资源路径改用站点基址前缀，开发与镜像不受影响"],
])

H2("（三）性能与兼容")
P("构建产物约七百五十千字节，经压缩后约二百千字节；桌面端一千二百八十乘八百分辨率下稳定六十帧；手机端三百七十五像素宽度无横向溢出，触屏设备自动出现底部四键舞蹈板。")

H1("五、进度与验证")
H2("（一）里程碑")
CAP("表 8  已完成里程碑")
TB([3.0, 4.2, 6.8], [
 ["时间", "阶段", "产出"],
 ["10 月 23 日", "立项与玩法验证", "判定方案、骨架模型、教学关流程"],
 ["10 月 24 日白天", "完整可玩", "六关、终章、体感与键盘双模式、3D 渲染与 2D 兜底"],
 ["10 月 24 日夜间", "内容升级", "真实音轨与六类音效、固定编舞表、终章两段、节拍锚定"],
 ["10 月 25 日", "发布与传播", "多镜像部署、演示脚本、截图与二维码"],
])

H2("（二）质量验证")
P("项目自带两套端到端测试，通过浏览器调试协议驱动真实页面运行，不依赖人工点测。桌面端五十项、手机触控端二十九项，当前全部通过；全流程自动通关可稳定得到一百零六次判定，与编舞表的动作总数逐一对齐。")
CAP("表 9  质量验证结果")
TB([5.6, 3.6, 5.0], [
 ["检查项", "结果", "说明"],
 ["桌面端端到端", "50/50", "含 3D 回退、帧率、静音、判定计数、死亡前摇与归因"],
 ["手机触控端端到端", "29/29", "375×812 设备模拟"],
 ["全流程判定数", "106 次", "与六关加终章的动作总数一致"],
 ["类型检查与构建", "零错误", "TypeScript strict，构建通过"],
])

H2("（三）已知限制")
P("一是摄像头在极暗环境下识别率下降，产品以自动降级兜底，但体感体验会转为键盘操作。二是移动端暂不开放摄像头体感，仅提供触控与键盘。三是写实底板尚未接入默认画面，当前画面仍为程序化剪影。")

H1("六、发布与传播")
H2("（一）发布渠道")
CAP("表 10  发布渠道")
TB([4.2, 4.6, 5.4], [
 ["渠道", "地址性质", "说明"],
 ["GitHub Pages", "主站", "国内部分网络与代理下不可达"],
 ["国内镜像 A", "推荐入口", "大陆直连，与主站同一份代码"],
 ["国内镜像 B", "备用入口", "另一套凭证，用于分流与容灾"],
])
P("三个入口为同一份代码的两次构建，玩法完全一致。每次重新构建后需同时发布到主站与镜像，避免版本漂移。")

H2("（二）传播素材")
P("一条三分钟演示脚本，覆盖标题、教学、第五关、终章与结尾；一组竖屏十五秒切片，抓取“跳错即死”的强情绪画面；一套桌面与手机截图，用于作品页与社交媒体首图。传播话术统一为一句：“跟着她跳，跳错一拍，他们就会吃掉你的脑子。”")

H2("（三）赛后迭代路线")
CAP("表 11  赛后迭代路线")
TB([2.2, 6.2, 2.6, 4.4], [
 ["阶段", "内容", "周期", "目标"],
 ["V1.1", "接入写实底板，重排镜头、地平线与地面材质", "一周", "画面接近宣发海报"],
 ["V1.2", "分层前景座椅、地面反射与景深", "两周", "拉开纵深，画面有层次"],
 ["V1.3", "怨魂角色写实化（外部资产与烘焙光照）", "一至两月", "角色质感与背景统一"],
 ["V2.0", "关卡编辑器与自定义曲目", "两至三月", "由单曲产品转为内容平台"],
])

H1("七、风险与对策")
CAP("表 12  风险与对策")
TB([4.0, 4.6, 5.6], [
 ["风险", "影响", "对策"],
 ["现场或环境光线不足", "体感识别不稳定", "宽松阈值、连续帧防抖、一键切键盘"],
 ["低端设备掉帧", "判定被跨过", "换动作前补判，保证计数与动作数一致"],
 ["素材版权", "作品下架", "音乐、音效、美术全部原创或自制，不使用第三方素材"],
 ["恐怖题材受限", "传播渠道限流", "不做血腥、不做跳跃惊吓，以氛围与叙事承担恐怖"],
 ["单人开发的进度风险", "交付不完整", "固定编舞表、零外部依赖、两套自动化测试守门"],
])

H1("八、资源与成本")
CAP("表 13  资源与成本")
TB([3.6, 5.2, 5.4], [
 ["项", "投入", "说明"],
 ["人力", "一人", "策划、程序、美术、音频全包"],
 ["开发周期", "两天", "10 月 24 日至 10 月 25 日"],
 ["素材成本", "零元", "音乐与音效自制，美术程序化生成"],
 ["部署成本", "零元", "静态托管，无服务器与数据库"],
 ["外部依赖", "免费开源", "Three.js、MediaPipe、Vite 均为开源项目"],
])

# ------------------------------------------------------------------ Markdown
md = []
for item in C:
    k = item[0]
    if k == "title": md.append("# " + item[1] + "\n")
    elif k == "sub": md.append("**" + item[1] + "**\n")
    elif k == "h1": md.append("\n## " + item[1] + "\n")
    elif k == "h2": md.append("\n### " + item[1] + "\n")
    elif k == "h3": md.append("\n#### " + item[1] + "\n")
    elif k == "p": md.append(item[1] + "\n")
    elif k == "cap": md.append("\n" + item[1] + "\n")
    elif k == "fig":
        md.append("![%s](%s)\n" % (item[2], "../" + item[1].replace("\\", "/")))
        md.append("*%s*\n" % item[2])
    elif k == "table":
        rows = item[2]
        md.append("| " + " | ".join(rows[0]) + " |")
        md.append("|" + "---|" * len(rows[0]))
        for r in rows[1:]:
            md.append("| " + " | ".join(r) + " |")
        md.append("")
io.open(OUT_MD, "w", encoding="utf-8", newline="\n").write("\n".join(md))
print("md", os.path.getsize(OUT_MD))

# ------------------------------------------------------------------ docx
FS, HT, KT, HZ, WEST = "仿宋", "黑体", "楷体", "华文中宋", "Times New Roman"
# 血红：主题色，只用在标题与表题上，正文保持纯黑
BLOOD = RGBColor(0xC2, 0x35, 0x2D)
BLOOD_DEEP = RGBColor(0x8E, 0x1F, 0x1A)
SZ, LS, TBL, TBL_LS = 16, 28, 14, 22

doc = docx.Document()
for s in doc.sections:
    s.top_margin, s.bottom_margin = Cm(3.7), Cm(3.5)
    s.left_margin, s.right_margin = Cm(2.8), Cm(2.6)

n = doc.styles["Normal"]
n.font.size = Pt(SZ)
rf = n.element.get_or_add_rPr().get_or_add_rFonts()
rf.set(qn("w:eastAsia"), FS); rf.set(qn("w:ascii"), WEST); rf.set(qn("w:hAnsi"), WEST)

def set_run(run, ea, size=SZ, bold=False, color=None):
    run.font.size = Pt(size); run.bold = bold
    if color is not None:
        run.font.color.rgb = color
    rf = run._element.get_or_add_rPr().get_or_add_rFonts()
    rf.set(qn("w:eastAsia"), ea)
    rf.set(qn("w:ascii"), WEST); rf.set(qn("w:hAnsi"), WEST)

def set_ind(p, first_chars=None, left=None):
    pPr = p._p.get_or_add_pPr()
    ind = pPr.find(qn("w:ind"))
    if ind is None:
        ind = OxmlElement("w:ind"); pPr.append(ind)
    if first_chars is not None:
        ind.set(qn("w:firstLineChars"), str(first_chars))
        ind.set(qn("w:firstLine"), str(int(first_chars * 3.2)))
    if left is not None:
        ind.set(qn("w:left"), str(left)); ind.set(qn("w:leftChars"), "0")

def set_line(p, pt=LS, before=0, after=0):
    pf = p.paragraph_format
    pf.line_spacing = Pt(pt); pf.space_before = Pt(before); pf.space_after = Pt(after)

def add(text, ea=FS, size=SZ, bold=False, first=200, align=None, line=LS, before=0, after=0, color=None):
    p = doc.add_paragraph()
    r = p.add_run(text); set_run(r, ea, size, bold, color)
    set_ind(p, first_chars=first); set_line(p, line, before, after)
    p.paragraph_format.alignment = align
    return p

def outline(p, lvl):
    pPr = p._p.get_or_add_pPr()
    e = OxmlElement("w:outlineLvl"); e.set(qn("w:val"), str(lvl))
    rpr = pPr.find(qn("w:rPr"))
    if rpr is not None: rpr.addprevious(e)
    else: pPr.append(e)

def cell_margins(tbl, top=40, bottom=40, left=80, right=80):
    tblPr = tbl._tbl.tblPr
    mar = OxmlElement("w:tblCellMar")
    for side, val in (("top", top), ("left", left), ("bottom", bottom), ("right", right)):
        e = OxmlElement("w:" + side); e.set(qn("w:w"), str(val)); e.set(qn("w:type"), "dxa")
        mar.append(e)
    tblPr.append(mar)

def add_table(widths, rows):
    tbl = doc.add_table(rows=len(rows), cols=len(rows[0]))
    tbl.style = "Table Grid"
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    cell_margins(tbl)
    trPr = tbl.rows[0]._tr.get_or_add_trPr()
    th = OxmlElement("w:tblHeader"); th.set(qn("w:val"), "true"); trPr.append(th)
    for ri, row in enumerate(rows):
        trPr = tbl.rows[ri]._tr.get_or_add_trPr()
        cs = OxmlElement("w:cantSplit"); cs.set(qn("w:val"), "true"); trPr.append(cs)
        for ci, val in enumerate(row):
            cell = tbl.cell(ri, ci)
            cell.width = Cm(widths[ci])
            p = cell.paragraphs[0]
            p.text = ""
            r = p.add_run(val)
            head = ri == 0
            set_run(r, HT if head else FS, TBL, head)
            set_ind(p, first_chars=0)
            set_line(p, TBL_LS, 3, 3)
            p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER if (head or ci == 0) else WD_ALIGN_PARAGRAPH.LEFT
    for ci, w in enumerate(widths):
        for ri in range(len(rows)):
            tbl.cell(ri, ci).width = Cm(w)
    # 允许整表跨页（表头已在每页重复），但禁止把一行拆到两页
    return tbl

def page_footer(section):
    section.footer.is_linked_to_previous = False
    p = section.footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r1 = p.add_run("— "); set_run(r1, "宋体", 14)
    r2 = p.add_run(); set_run(r2, "宋体", 14)
    a = OxmlElement("w:fldChar"); a.set(qn("w:fldCharType"), "begin")
    b = OxmlElement("w:instrText"); b.set(qn("xml:space"), "preserve"); b.text = " PAGE "
    c = OxmlElement("w:fldChar"); c.set(qn("w:fldCharType"), "end")
    r2._r.append(a); r2._r.append(b); r2._r.append(c)
    r3 = p.add_run(" —"); set_run(r3, "宋体", 14)
    set_line(p, 14)

page_footer(doc.sections[0])

add(C[0][1], HZ, 22, True, first=0, align=WD_ALIGN_PARAGRAPH.CENTER, line=34, after=6, color=BLOOD)
add(C[1][1], KT, SZ, False, first=0, align=WD_ALIGN_PARAGRAPH.CENTER, after=6, color=BLOOD_DEEP)
for item in C[2:6]:
    add(item[1], FS, SZ, False, first=200, before=6)

# 标题下一条血红细线
rule = doc.add_paragraph()
rule.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
rule.paragraph_format.space_before = Pt(2)
rule.paragraph_format.space_after = Pt(2)
rr = rule.add_run(); set_run(rr, FS, 2)
pPr = rule._p.get_or_add_pPr()
pbdr = OxmlElement("w:pBdr")
bt = OxmlElement("w:bottom")
bt.set(qn("w:val"), "single"); bt.set(qn("w:sz"), "12")
bt.set(qn("w:space"), "1"); bt.set(qn("w:color"), "C2352D")
pbdr.append(bt); pPr.append(pbdr)

doc.add_page_break()
add("目　录", HT, SZ, False, first=0, align=WD_ALIGN_PARAGRAPH.CENTER, before=0, after=6)
p = doc.add_paragraph()
r = p.add_run(); set_run(r, FS, 14)
fc = OxmlElement("w:fldChar"); fc.set(qn("w:fldCharType"), "begin"); fc.set(qn("w:dirty"), "true")
it = OxmlElement("w:instrText"); it.set(qn("xml:space"), "preserve"); it.text = ' TOC \\o "1-2" \\h \\z \\u '
fc2 = OxmlElement("w:fldChar"); fc2.set(qn("w:fldCharType"), "separate")
t = OxmlElement("w:t"); t.text = "（在 WPS 中右键“更新域”即可生成目录）"
fc3 = OxmlElement("w:fldChar"); fc3.set(qn("w:fldCharType"), "end")
r._r.append(fc); r._r.append(it); r._r.append(fc2); r._r.append(t); r._r.append(fc3)
set_line(p, LS)
br = OxmlElement("w:br"); br.set(qn("w:type"), "page")
r._r.append(br)

for item in C[6:]:
    k = item[0]
    if k == "h1":
        p = add(item[1], HT, SZ, False, first=200, line=LS, before=12, after=6, color=BLOOD)
        p.paragraph_format.keep_with_next = True
        outline(p, 0)
    elif k == "h2":
        p = add(item[1], KT, SZ, True, first=200, line=LS, before=6, after=0)
        p.paragraph_format.keep_with_next = True
        outline(p, 1)
    elif k == "h3":
        p = add(item[1], KT, SZ, True, first=200, line=LS)
        outline(p, 2)
    elif k == "p":
        add(item[1], FS, SZ, False, first=200)
    elif k == "cap":
        cp = add(item[1], HT, TBL, False, first=0, align=WD_ALIGN_PARAGRAPH.CENTER, line=20, before=6, after=3, color=BLOOD_DEEP)
        cp.paragraph_format.keep_with_next = True
    elif k == "fig":
        src = os.path.join(r"D:\MoonNight", item[1])
        cache = os.path.join(r"D:\MoonNight\tools\.out\docimg",
                             os.path.splitext(os.path.basename(src))[0] + ".jpg")
        os.makedirs(os.path.dirname(cache), exist_ok=True)
        if not os.path.exists(cache):
            from PIL import Image
            im = Image.open(src).convert("RGB")
            if im.width > 1280:
                im = im.resize((1280, round(im.height * 1280 / im.width)), Image.LANCZOS)
            im.save(cache, "JPEG", quality=86, optimize=True)
        fp = doc.add_paragraph()
        fp.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.paragraph_format.space_before = Pt(6)
        fp.paragraph_format.space_after = Pt(2)
        fp.paragraph_format.line_spacing = 1.0
        fp.paragraph_format.keep_with_next = True
        fp.add_run().add_picture(cache, width=Cm(item[3]))
        add(item[2], HT, TBL, False, first=0, align=WD_ALIGN_PARAGRAPH.CENTER, line=20, before=0, after=8, color=BLOOD_DEEP)
    elif k == "table":
        add_table(item[1], item[2])
        add("", FS, SZ, False, first=0, line=12)

doc.save(OUT_DOCX)
print("docx", os.path.getsize(OUT_DOCX))
