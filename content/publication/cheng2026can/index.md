---
title: 'Can Slow-thinking LLMs Reason Over Time? Empirical Studies in Time Series Forecasting'
authors:
- Mingyue Cheng
- Jiahao Wang
- Daoyu Wang
- Xiaoyu Tao
- Qi Liu
- Enhong Chen

date: '2026-02-21'
doi: '10.1145/3773966.377793'

publication_types: ['paper-conference']
publication: In *Proceedings of the Nineteenth ACM International Conference on Web Search and Data Mining*
publication_short: In *WSDM*

abstract: "Time series forecasting (TSF) traditionally relies on fast-thinking paradigms that map historical observations directly to future sequences of continuous values. While effective, such approaches often frame forecasting as a pattern-matching problem and tend to overlook explicit reasoning over temporal dynamics and contextual factors, which are critical for modeling long-range dependencies and non-stationary behaviors in real-world scenarios. Recent slow-thinking large language models (LLMs), such as OpenAI o1 and DeepSeek-R1, demonstrate strong inference-time multi-step reasoning abilities. This raises a fundamental question: can slow-thinking LLMs reason over temporal dynamics to support accurate TSF, even without task-specific training? To investigate this question, we present TimeReasoner, a systematic empirical study that reformulates TSF as a conditional reasoning process performed entirely at inference time. TimeReasoner integrates hybrid instructions consisting of task directives, timestamps, sequential values, and optional contextual features, and induces multi-step temporal reasoning in pretrained slow-thinking LLMs through chain-of-thought prompting and rollout-based reasoning strategies. Extensive experiments across diverse TSF benchmarks show that slow-thinking LLMs consistently outperform prior baselines or achieve competitive training-free forecasting performance. Beyond accuracy, we analyze how different inference-time reasoning strategies influence forecasting behaviors, highlighting both the potential and limitations of slow-thinking paradigms for TSF."

---
