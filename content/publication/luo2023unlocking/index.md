---
title: "Unlocking the Potential of Large Language Models for Explainable Recommendations"
authors:
- Yucong Luo
- Mingyue Cheng
- Hao Zhang
- Junyu Lu
- Qi Liu
- Enhong Chen

date: "2023-12-25"
doi: "10.48550/arXiv.2312.15661"

publication_types: ["article"]
publication: "arXiv"
publication_short: "arXiv"

abstract: Generating user-friendly explanations regarding why an item is recommended has become increasingly common, largely due to advances in language generation technology, which can enhance user trust and facilitate more informed decision-making when using online services. However, existing explainable recommendation systems focus on using small-size language models. It remains uncertain what impact replacing the explanation generator with the recently emerging large language models (LLMs) would have. Can we expect unprecedented results? In this study, we propose LLMXRec, a simple yet effective two-stage explainable recommendation framework aimed at further boosting the explanation quality by employing LLMs. Unlike most existing LLM-based recommendation works, a key characteristic of LLMXRec is its emphasis on the close collaboration between previous recommender models and LLM-based explanation generators. Specifically, by adopting several key fine-tuning techniques, including parameter-efficient instructing tuning and personalized prompt techniques, controllable and fluent explanations can be well generated to achieve the goal of explanation recommendation. Most notably, we provide three different perspectives to evaluate the effectiveness of the explanations. Finally, we conduct extensive experiments over several benchmark recommender models and publicly available datasets. The experimental results not only yield positive results in terms of effectiveness and efficiency but also uncover some previously unknown outcomes. To facilitate further explorations in this area, the full code and detailed original results are open-sourced at https://github.com/GodFire66666/LLM_rec_explanation/.

---