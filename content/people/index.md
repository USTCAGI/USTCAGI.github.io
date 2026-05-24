---
title: 成员
type: landing

sections:
  - block: markdown
    id: people-overview
    content:
      title: 团队成员
      text: |
        <div class="people-overview-panel">
          <p>AGI 研究组汇聚认知智能、数据挖掘、大模型智能体、时间序列分析、推荐系统与 AI for Science 等方向的师生力量，围绕可信、可解释、可落地的智能系统开展长期研究。</p>
          <div class="people-overview-tags" aria-label="成员类型">
            <span>
              <strong>导师团队</strong>
              <small>研究方向牵引与学术指导</small>
            </span>
            <span>
              <strong>在读学生</strong>
              <small>面向前沿问题开展系统研究</small>
            </span>
            <span>
              <strong>校友网络</strong>
              <small>持续连接科研与产业实践</small>
            </span>
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
        - Students
        - Alumni
      sort_by: Params.index
      sort_ascending: true
    design:
      show_interests: true
      show_role: true
      show_social: true
---
