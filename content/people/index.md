---
title: 成员
type: landing

sections:
  - block: markdown
    id: people-hero
    content:
      title:
      text: |
        <div class="people-banner" aria-label="研究团队概览">
          <div class="people-banner-copy">
            <span class="people-banner-kicker">USTC-AGI Research Group</span>
            <h1>研究团队</h1>
            <p>研究组汇聚教师、博士生、硕士生、本科生与历届同学，围绕多模态表征学习、情境表示与推理、慢思考认知推理和自主交互智能体开展研究。</p>
          </div>
          <div class="people-banner-groups" aria-label="成员分组">
            <span>导师团队</span>
            <span>在读博士生</span>
            <span>在读硕士生</span>
            <span>本科生同学</span>
            <span>历届同学</span>
          </div>
        </div>
    design:
      columns: "1"

  - block: people
    content:
      title: 成员列表
      # Choose which groups/teams of users to display.
      #   Edit `user_groups` in each user's profile to add them to one or more of these groups.
      user_groups:
        - Supervisors
        - 在读博士生
        - 在读硕士生
        - 本科生同学
        - 历届同学
      sort_by: Params.index
      sort_ascending: true
    design:
      show_interests: true
      show_role: true
      show_social: true
---
