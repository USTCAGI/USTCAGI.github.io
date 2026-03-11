---
title: 'TableMind: An Autonomous Programmatic Agent for Tool-Augmented Table Reasoning'
authors:
- Chuang Jiang
- Mingyue Cheng
- Xiaoyu Tao
- Qingyang Mao
- Jie Ouyang
- Qi Liu

date: '2026-02-21'
doi: '10.1145/3773966.3777932'

publication_types: ['paper-conference']
publication: In *Proceedings of the Nineteenth ACM International Conference on Web Search and Data Mining*
publication_short: In *WSDM*

abstract: "Table reasoning requires models to jointly perform comprehensive semantic understanding and precise numerical operations. Although recent large language model (LLM)-based methods have achieved promising results, most of them still rely on a single-turn reasoning paradigm that processes flattened tables in a single forward pass. This paradigm suffers from inherent limitations, including context overflow on large tables, weak sensitivity to continuous numerical values, and the absence of explicit tool-use and reflection. In this paper, we propose TableMind, a tuning-based autonomous programmatic table agent that simulates the human-like cognitive schema of multi-turn interaction within a lightweight LLM. Instead of adopting a training-free workflow design, TableMind learns to internalize planning, action, and reflection through a principled two-stage training strategy. To bootstrap structured table reasoning capabilities, we construct and filter high-quality reasoning data for the supervised fine-tuning (SFT) stage. To enable precise code generation, we introduce a designed multi-perspective reward scheme and a novel optimization objective in the reinforcement learning (RL) stage. Extensive experiments on diverse benchmarks demonstrate that TableMind consistently outperforms previous baselines, validating the effectiveness of training autonomous agents to improve overall performance."

---
