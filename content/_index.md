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
        slides:
          - filename: welcome.png
            alt: 中国科大 AGI 研究组合影
          - filename: coders.jpg
            alt: 智能系统研发与协作场景
          - filename: welcome.jpg
            alt: AI for Science 科研实验场景
      cta:
        label: 查看研究方向
        url: /research/
        icon_pack: fas
        icon: compass
      cta_alt:
        label: 代表论文
        url: /publication/
      cta_note:
        label: 多模态表征学习 · 情境表示与推理 · 慢思考认知推理 · 自主交互智能体

  - block: markdown
    id: home-focus
    content:
      title: 基础方法
      text: |
        <div class="home-focus-grid" aria-label="基础方法">
          <a class="home-focus-item" href="/research/structured/">
            <span class="home-focus-kicker">Multimodal Representation</span>
            <strong>多模态表征学习</strong>
            <span>面向文本、表格、时间序列与科学文档等复杂数据，研究统一表征、语义对齐与跨模态融合方法。</span>
          </a>
          <a class="home-focus-item" href="/research/context/">
            <span class="home-focus-kicker">Context Representation</span>
            <strong>情境表示与推理</strong>
            <span>建模环境状态、任务目标、领域知识与外部事件等情境因素，理解其对预测、决策与推理过程的影响机制。</span>
          </a>
          <a class="home-focus-item" href="/research/agent/">
            <span class="home-focus-kicker">Slow Thinking Reasoning</span>
            <strong>慢思考认知推理</strong>
            <span>研究多步推理、证据整合、自反思验证与逻辑推演机制，提升大模型在复杂任务中的可靠推理能力。</span>
          </a>
          <a class="home-focus-item" href="/research/agent/">
            <span class="home-focus-kicker">Autonomous Interactive Agents</span>
            <strong>自主交互智能体</strong>
            <span>构建能够调用工具、交互环境、复用记忆并持续修正的大模型智能体，实现复杂任务的自主规划与执行。</span>
          </a>
        </div>
    design:
      columns: "1"

  - block: collection
    id: research
    content:
      title: 领域应用研究
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
      sort_by: Weight
      order: asc
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
        </div>
        <div class="home-partner-strip" aria-label="合作企业">
          <span class="home-partner-label">合作企业</span>
          <div class="home-partner-grid">
            <a href="https://www.iflytek.com/" target="_blank" rel="noopener" aria-label="科大讯飞">
              <img src="/media/partners/iflytek.svg" alt="科大讯飞">
            </a>
            <a href="https://www.tencent.com/" target="_blank" rel="noopener" aria-label="腾讯">
              <img src="/media/partners/tencent.svg" alt="腾讯">
            </a>
            <a href="https://www.huawei.com/" target="_blank" rel="noopener" aria-label="华为">
              <img src="/media/partners/huawei.svg" alt="华为">
            </a>
            <a href="https://www.kuaishou.com/" target="_blank" rel="noopener" aria-label="快手">
              <img src="/media/partners/kuaishou.svg" alt="快手">
            </a>
          </div>
        </div>
    design:
      columns: "1"
---
