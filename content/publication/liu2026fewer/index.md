---
title: 'Fewer Battles, More Gain: An Information-Efficient Framework for Arena-based LLM Evaluation'
authors:
- Zirui Liu
- Xianquan Wang
- Yan Zhuang
- Jiatong Li
- Qi Liu
- Shuanghong Shen
- Mingyue Cheng
- Shijin Wang

publication_types: ['paper-conference']
publication: In *The Fourteenth International Conference on Learning Representations*
publication_short: In *ICLR*

abstract: "Arena-based evaluation has become a key method for assessing large language models (LLMs) through head-to-head model comparisons, closely reflecting human preferences. However, current arena rating systems (e.g., ELO rating system) often suffer from inefficiencies due to exhaustive or random model pair annotations, leading to redundant evaluations, longer evaluation times, and lower overall efficiency. To address these challenges, we propose a novel adaptive model-pair selection algorithm. By leveraging the asymptotic normality of LLM ability estimation under sparse conditions, our approach strategically selects high-value model pairs, focusing on confrontations with the lowest variance. Specifically, we introduce Fisher information as a metric to guide model pair selection, optimizing the evaluation process through A-optimality and D-optimality. A-optimality minimizes estimation variance, ensuring balanced reliability across models, while D-optimality reduces uncertainty by maximizing the determinant of the Fisher Information Matrix. Extensive experiments on both simulated and real-world datasets demonstrate that our method outperforms existing approaches in terms of information efficiency and result reliability. Notably, our method offers a flexible, general toolkit that can be easily integrated into existing arena-based platforms, greatly improving scalability and efficiency for large-scale LLM evaluations."

---
