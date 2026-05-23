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

  - block: collection
    id: research
    content:
      title: 研究方向
      subtitle:
      text:
      count: 6
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
      view: showcase
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
      text: >
        <a href="https://www.ustc.edu.cn/">中国科学技术大学</a>
        &nbsp;&nbsp;
        <a href="https://cogskl.iflytek.com/">认知智能全国重点实验室</a>
        &nbsp;&nbsp;
        <a href="https://bigdata.ustc.edu.cn/">大数据分析与应用安徽省重点实验室</a>
    design:
      columns: "1"
---
