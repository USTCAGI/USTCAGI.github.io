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
            <span class="home-focus-kicker">LLM Agents</span>
            <strong>大模型智能体</strong>
            <span>研究大模型驱动的自主智能体、规划推理、工具调用与多智能体协同，构建可靠可控的复杂任务执行系统。</span>
          </a>
          <a class="home-focus-item" href="/research/context/">
            <span class="home-focus-kicker">Context Reasoning</span>
            <strong>情境表示与推理</strong>
            <span>面向多源动态情境，研究语义表示、状态建模与自适应推理方法，提升模型在真实环境中的泛化与稳健性。</span>
          </a>
          <a class="home-focus-item" href="/research/structured/">
            <span class="home-focus-kicker">Knowledge Reasoning</span>
            <strong>知识表示与推理</strong>
            <span>围绕结构化知识、表格与文档数据，研究知识抽取、表示学习、检索增强与可解释推理，支撑可信智能决策。</span>
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
