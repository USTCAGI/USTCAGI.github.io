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
        AGI（Agentic Intelligence）研究组依托中国科学技术大学认知智能全国重点实验室。

        以机器学习与数据挖掘为根基，以深度神经网络、大模型推理与智能体、情境大数据智能为核心技术，面向科学智能、时序智能与推荐系统开展基础方法与关键应用研究。
      image:
        filename: welcome.png
        alt: 中国科大 AGI 研究组首页图
        slides:
          - filename: welcome.png
            alt: 中国科大 AGI 研究组合影
          - filename: hero-group-meeting.png
            alt: 中国科大 AGI 研究组团队合影
          - filename: hero-campus-snow.png
            alt: 中国科大校园雪景
      cta:
        label: 查看研究方向
        url: /research/
        icon_pack: fas
        icon: compass
      cta_alt:
        label: 代表论文
        url: /publication/
      cta_note:
        label: 扎根机器学习与数据挖掘，发展新一代智能技术，探索科学、时间与人的智能规律。

  - block: research_tree
    id: research
    design:
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
    id: funding-support
    content:
      title: 基金支撑
      text: |
        <div class="home-funding-grid" aria-label="基金支撑">
          <div class="home-funding-item">
            <span class="home-funding-kicker">国家级人工智能专项</span>
            <strong>新一代AI专项</strong>
          </div>
          <div class="home-funding-item">
            <span class="home-funding-kicker">中国科学院战略性先导科技专项</span>
            <strong>中科院先导B类项目</strong>
          </div>
          <div class="home-funding-item">
            <span class="home-funding-kicker">国家自然科学基金</span>
            <strong>国自然基金委青年科学基金A类项目（原国家杰青）</strong>
          </div>
        </div>
    design:
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
