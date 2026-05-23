---
# Leave the homepage title empty to use the site title
title: 中国科大 AGI 研究组
type: landing

sections:
  - block: hero
    id: hero
    content:
      title: 中国科大 AGI 研究组
      text: |
        AGI（Agentic Intelligence）研究组依托中国科学技术大学认知智能全国重点实验室，围绕智能体智能、大模型、数据挖掘与 AI for Science 开展研究。我们关注能够主动理解情境、推理规划并调用工具完成复杂任务的智能系统，推动人工智能在科研、教育、推荐、结构化数据分析等真实场景中可靠落地。
      image:
        filename: welcome.png
        alt: 中国科大 AGI 研究组首页图
      cta:
        label: 查看研究方向
        url: /research/
        icon_pack: fas
        icon: compass
      cta_alt:
        label: 代表论文
        url: /publication/
      cta_note:
        label: 大模型 · 智能体 · 数据挖掘 · 科学智能 · 时间序列分析

  - block: markdown
    id: home-focus
    content:
      title: 研究聚焦
      text: |
        <div class="home-focus-grid" aria-label="研究聚焦">
          <a class="home-focus-item" href="/research/agent/">
            <span class="home-focus-kicker">Agentic Intelligence</span>
            <strong>智能体智能与大模型</strong>
            <span>研究大模型推理机制、工具调用、规划协同与多模态增强，面向复杂任务构建可靠智能体。</span>
          </a>
          <a class="home-focus-item" href="/research/structured/">
            <span class="home-focus-kicker">Structured Data</span>
            <strong>结构化数据与时序预测</strong>
            <span>围绕表格、时间序列和混合文档数据，发展可解释、可泛化的数据挖掘与预测方法。</span>
          </a>
          <a class="home-focus-item" href="/research/science/">
            <span class="home-focus-kicker">AI for Science</span>
            <strong>科学智能与真实场景</strong>
            <span>连接科研、教育、医疗与推荐等应用场景，推动智能系统从算法能力走向可用工作流。</span>
          </a>
        </div>
    design:
      columns: "1"

  - block: collection
    id: research
    content:
      title: 研究方向
      subtitle:
      text:
      count: 5
      filters:
        author: ""
        category: ""
        exclude_featured: false
        publication_type: ""
        tag: ""
      offset: 0
      order: desc
      page_type: research
    design:
      view: card
      columns: "1"

  - block: collection
    id: selected-publications
    content:
      title: 代表论文
      subtitle:
      text:
      count: 4
      filters:
        author: ""
        category: ""
        exclude_featured: false
        publication_type: ""
        tag: ""
      offset: 0
      order: desc
      page_type: publication
    design:
      view: citation
      columns: "1"

  - block: collection
    id: news-highlights
    content:
      title: 新闻动态
      subtitle:
      text:
      count: 3
      filters:
        author: ""
        category: ""
        exclude_featured: false
        publication_type: ""
        tag: ""
      offset: 0
      order: desc
      page_type: post
    design:
      view: card
      columns: "1"

  - block: markdown
    id: related-links
    content:
      title: 相关链接
      text: |
        <div class="home-link-strip" aria-label="相关链接">
          <a href="https://www.ustc.edu.cn/">中国科学技术大学</a>
          <a href="https://cogskl.iflytek.com/">认知智能全国重点实验室</a>
          <a href="https://bigdata.ustc.edu.cn/">大数据分析与应用安徽省重点实验室</a>
        </div>
    design:
      columns: "1"
---
