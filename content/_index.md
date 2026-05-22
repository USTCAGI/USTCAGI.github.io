---
# Leave the homepage title empty to use the site title
title: USTC AGI Research Group
type: landing

sections:
  - block: hero
    id: hero
    content:
      title: Agentic Intelligence Research at USTC
      text: |
        The AGentic Intelligence (AGI) Group is a specialized research unit within the State Key Laboratory of Cognitive Intelligence, USTC. Here, AGI stands for Agentic Intelligence—our core focus is on advancing AI and data mining to create autonomous systems that can proactively reason and act, aiming to match or exceed human capabilities in complex, real-world environments.
      image:
        filename: welcome.png
        alt: USTC AGI Research Group welcome graphic

  - block: collection
    id: research
    content:
      title: Research
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
    id: projects
    content:
      title: Projects
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
      page_type: project
    design:
      view: showcase
      columns: "1"

  - block: collection
    id: selected-publications
    content:
      title: Selected Publications
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
      title: News Highlights
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
      title: Related Links
      text: >
        <a href="https://www.ustc.edu.cn/">中国科学技术大学</a>
        &nbsp;&nbsp;
        <a href="https://cogskl.iflytek.com/">认知智能全国重点实验室</a>
        &nbsp;&nbsp;
        <a href="https://bigdata.ustc.edu.cn/">大数据分析与应用安徽省重点实验室</a>
    design:
      columns: "1"
---
