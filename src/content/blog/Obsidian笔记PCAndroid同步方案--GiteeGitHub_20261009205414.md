---
title: "Obsidian笔记PC/Android同步方案--Gitee/GitHub"
date: "2026-10-09T20:54:14+08:00"
updated: "2026-10-09T20:59:01+08:00"
description: "本文介绍了如何使用Gitee作为云服务同步方案，详细讲解了在PC和Android设备上配置Obsidian与Git的步骤，帮助用户实现高效的笔记管理与数据备份。"
draft: false
categories:
  - "瞎折腾"
tags:
  - "github"
  - "gitee"
  - "obsidian"
  - "笔记"
---

<!-- more -->
* * *

本篇要介绍的是以Git代码托管网站仓库作为云服务的同步方案，例如GitHub、GitLab、Gitee（类似于国内的GitHub），由于GitHub、GitLab作为国外的Git代码托管来说有时访问会很慢，因此下面主要介绍**基于Gitee的同步云存储方案** （PC用**Obsidian-Git** 插件，Android用**GitSync** 软件）

## Gitee创建仓库

Gitee（码云）是开源中国（OSChina）于2013年推出的**基于Git的代码托管与研发协作平台，** 是中国境内规模最大的代码托管平台

首先在Gitee中创建仓库

> 若选开源，后续在上传文件到仓库时需要额外操作将隐私数据屏蔽。

这里lz以【私有】为例

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/edce4341e95f.webp)

创建好仓库后，点击【初始化readme文件】按钮，这样可以确保仓库里至少有一个文件

接下来需要将这个远端仓库克隆到本地，需要用到Git，它是**本地版本管理工具** ，而Gitee是基于 Git 的远程托管平台，Git可以在官网下载安装：[Git官网](https://git-scm.com/ "Git官网")

## Git仓库配置

下载好Git后，在Windows的**Powershell** 环境下运行下面两条命令，用于让Git以后在推送时可以识别出你是谁

> git config --global user.name '自己的昵称'
> 
> git config --global user.email '自己的邮箱'

建好自己想要放笔记的文件夹后，在该文件夹内右键，选择在终端内打开，克隆刚才创建的仓库

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/1a021ffd8e55.webp)

若是首次克隆Gitee的仓库，会提示你需要输入Gitee账户的用户名(Username)和密码(Password)

现在就可以看到在当前路径下多了一个文件夹，这就是你的远程仓库

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/11d597d05ce7.webp)

接下来将你的Obsidian仓库都粘贴进该文件夹（**一定要做好数据备份啊，以防不测...** ）

.git文件夹默认是隐藏的，用于存储git相关配置信息，不用动

## Obsidian插件--Git安装

接下来需要将我们做的改动（与远端仓库对不上的地方）**推送到远端仓库** ，虽然可以用命令行完成，但为了自动化与可视化，下面在Obsidian中**安装Git插件** （需要**关闭安全模式** ）

关闭安全模式后浏览社区插件市场

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/1a607864571b.webp)

在插件市场中直接搜索Git，找到并安装并启用，确保Git已经启用后

在设置左侧的的【第三方插件】选项卡中选择Git，进入到Git插件的设置，这里对于小白而言只需要该3个选项：（原版Git插件没有汉译，若想翻译可以考虑**I18N** 插件，这里就不详细展开）

在修改文件1分钟内都没有操作后，自动提交并同步：

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/4c8aceee97d0.webp)

每次启动obsidian时自动拉取仓库：

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/75285924cf84.webp)

这样就可以自动推送/拉取仓库了，若想要手动操作，也可以在左侧功能区中点击【打开Git源代码管理】按钮

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/b91230e8d00a.webp)

这样右侧就会出现【源代码管理】窗口，从左往右可执行的操作分别为：

> 提交并同步/提交/添加/删除/推送/拉取/改变布局/刷新

对Git感兴趣的可以具体了解，本篇就不详细展开啦~

Tip：Git第一次同步时会要求你在**顶部** 输入Gitee的用户名和密码，推送的分支（ 默认为master）！！

### 忽略文件

若你的仓库一开始设为了开源（公有），就需要**避免将一些隐私文件传入仓库** ：

  1. 在仓库根目录创建文件：**.gitignore**

  2. 如果你的电脑里有VSCode这类代码编辑软件，推荐用此软件打开；如果没有，就用文本编辑器打开

  3. 在.gitignore中输入要屏蔽的文件全名或后缀或前缀，下面给几种示例格式：




![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/82b23544392c.webp)

**workspace.json** 推荐忽略掉，该文件记录的是工作区的状态等，没有必要上传云端

这样电脑端的同步工作就做好了，下面来部署手机端工作

# Obsidian 移动端（Android）--GitSync安装

虽然手机端也可以直接用Obsidian内的Git插件，但该插件对移动端**兼容非常差** ，Git插件的作者也建议移动端使用GitSync方案

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/59b0dbcfb5e0.webp)

GitSync也是GitHub中开源的项目（GitHub&作者真是太伟大了），可以在Release界面下载最新安装包（一般来说下**arm64** 版本）。如果手机上有GooglePlay应用商店，也可以直接在里面搜GitSync下载安装

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/143902e2e6fb.webp)

 打开GitSync后，先点这个认证按钮（你们的认证按钮应该是❌️号），这是为了绑定Git托管平台账号，方便以后同步

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/700bd5bff603.webp)

但该软件支持的Git托管平台只有下面这四个，不过不用担心，对于任何一个Git托管平台，都一定支持Git协议的这两种认证方式，下面我以**HTTPS** 认证为例

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/31fadb95c1de.webp)

## Gitee私人令牌（HTTPS）获取

首先打开Gitee的设置

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/72677582ddb8.webp)

在安全设置中找到【私人令牌】

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/6b367e728c56.webp)

点击【生成新令牌】

填写你的令牌描述和过期时间

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/2b8dedb7b1b9.webp)

最后点击【提交】，会让你输入Gitee账号的密码，完成后弹出生成好的令牌，此时**千万不要忘记复制** ，因为关闭该界面后就再也看不见了（如果你真的忘了复制....就删掉这个令牌重新生成一个吧）。

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/bba8c04de825.webp)

注意：千万不要让别人知道你的令牌！！！**令牌的含金量就相当于你账户的密码！！**

接下来在手机端的GitSync中的HTTPS认证里填入你的令牌，用户最好写你的Gitee英文名（你的个人空间地址的那个名）

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/6cd40a742515.webp)

点击登录后会让你填写要克隆的仓库，仓库地址为你仓库主界面的网址

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/825588b4e8c1.webp)

粘贴好地址后，点击【克隆】（后面加不加.git都一样，只不过加上更标准）

克隆完成后，界面差不多是这个样子，若不是，可以在【立即同步】右边的设置中从**客户端模式** 调为**同步模式** （更小白）

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/adf17df7721c.webp)

一样的，第一次同步时会要求你输入Username和邮箱

为了自动化，可以设置成自动同步，在下面的应用同步设置中开启【应用打开时同步】和【应用关闭时同步】，并添加应用Obsidian（需要**无障碍权限** ）

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/5a449bdb71cb.webp)

在【立即同步】右侧的设置中也可以修改.gitignore文件：

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/062e3988106b.webp)

需要注意的是，由于同步后手机端的Obsidian也会有Git插件，需要在Git插件设置的最底部开启此选项

![](image/Obsidian笔记PCAndroid同步方案--GiteeGitHub_20261009205414/3a9d7c0985f8.webp)

\--------------------------------------------------

现在就大功告成了~如果中途出现了问题不知道怎么解决也可以发到评论区，lz会尽力解决的！（但也不是万能的！！）
