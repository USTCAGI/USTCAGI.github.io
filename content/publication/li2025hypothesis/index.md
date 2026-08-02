---
title: 'From Hypothesis to Premises: LLM-based Backward Logical Reasoning with Selective Symbolic Translation'
authors:
- Qingchuan Li
- Mingyue Cheng
- Zirui Liu
- Daoyu Wang
- Yuting Zeng
- Tongxuan Liu

date: '2026-03-01'
doi: '10.1609/aaai.v40i37.40434'

publication_types: ['paper-conference']
publication: 'AAAI2026: 31671-31679'
publication_short: In *AAAI*

abstract: "Logical reasoning is a core challenge in natural language understanding and a fundamental capability of artificial intelligence, underpinning scientific discovery, mathematical theorem proving, and complex decision-making. Despite the remarkable progress of large language models (LLMs), most current approaches still rely on forward reasoning paradigms, generating step-by-step rationales from premises to conclusions. However, such methods often suffer from redundant inference paths, hallucinated steps, and semantic drift, resulting in inefficient and unreliable reasoning. In this paper, we propose a novel framework, Hypothesis-driven Backward Logical Reasoning (HBLR). The core idea is to integrate confidence-aware symbolic translation with hypothesis-driven backward reasoning. In the translation phase, only high-confidence spans are converted into logical form, such as First-Order Logic (FOL), while uncertain content remains in natural language. A translation reflection module further ensures semantic fidelity by evaluating symbolic outputs and reverting lossy ones back to text when necessary. In the reasoning phase, HBLR simulates human deductive thinking by assuming the conclusion is true and recursively verifying its premises. A reasoning reflection module further identifies and corrects flawed inference steps, enhancing logical coherence. Extensive experiments on five reasoning benchmarks demonstrate that HBLR consistently outperforms strong baselines in both accuracy and efficiency."

---
