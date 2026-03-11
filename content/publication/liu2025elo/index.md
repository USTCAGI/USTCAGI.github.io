---
title: 'am-ELO: A Stable Framework for Arena-based LLM Evaluation'
authors:
- Zirui Liu
- Jiatong Li
- Yan Zhuang
- Qi Liu
- Shuanghong Shen
- Jie Ouyang
- Mingyue Cheng
- Shijin Wang

date: '2025-07-01'
doi: ''

publication_types: ['paper-conference']
publication: In *Proceedings of the 42nd International Conference on Machine Learning*
publication_short: In *ICML*

abstract: "Arena-based evaluation is a fundamental yet significant evaluation paradigm for modern AI models, especially large language models (LLMs). Existing framework based on ELO rating system suffers from the inevitable instability problem due to ranking inconsistency and the lack of attention to the varying abilities of annotators. In this paper, we introduce a novel stable arena framework to address these issues by enhancing the ELO Rating System. Specifically, we replace the iterative update method with a Maximum Likelihood Estimation (MLE) approach, m-ELO, and provide theoretical proof of the consistency and stability of the MLE approach for model ranking. Additionally, we proposed the am-ELO, which modify the Elo Rating’s probability function to incorporate annotator abilities, enabling the simultaneous estimation of model scores and annotator reliability. Experiments demonstrate that this method ensures stability, proving that this framework offers a more robust, accurate, and stable evaluation method for LLMs."

---
