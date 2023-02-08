---
layout: post
title: github怎么提交pr
tags:
  - github
abbrlink: 4cc39851
date: 2019-02-05 17:29:11
---
 
 
1. fork 到自己的仓库

2. git clone 到本地

3. 上游建立连接 git remote add upstream 开源项目地址

4. 创建开发分支 (非必须) git checkout -b dev

5. 修改提交代码 git status git add . git commit -m git push origin branch

6. 同步代码三部曲 git fetch upstream git rebase upstream/master git push origin master

7. 提交pr 去自己github仓库对应fork的项目下new pull request