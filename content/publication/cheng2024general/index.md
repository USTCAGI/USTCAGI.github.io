---
title: 'A general tail item representation enhancement framework for sequential recommendation'
authors:
- Mingyue Cheng
- Qi Liu
- Wenyu Zhang
- Zhiding Liu
- Hongke Zhao
- Enhong Chen 

date: '2023-12-28'
doi: '10.1007/s11704-023-3112-y'

publication_types: ["article-journal"]
publication: "Frontiers of Computer Science"
publication_short: "FCS"

abstract: "Recently advancements in deep learning models have significantly facilitated the development of sequential recommender systems (SRS). However, the current deep model structures are limited in their ability to learn high-quality embeddings with insufficient data. Meanwhile, highly skewed long-tail distribution is very common in recommender systems. Therefore, in this paper, we focus on enhancing the representation of tail items to improve sequential recommendation performance. Through empirical studies on benchmarks, we surprisingly observe that both the ranking performance and training procedure are greatly hindered by the poorly optimized tail item embeddings. To address this issue, we propose a sequential recommendation framework named TailRec that enables contextual information of tail item well-leveraged and greatly improves its corresponding representation. Given the characteristics of the sequential recommendation task, the surrounding interaction records of each tail item are regarded as contextual information without leveraging any additional side information. This approach allows for the mining of contextual information from cross-sequence behaviors to boost the performance of sequential recommendations. Such a light contextual filtering component is plug-and-play for a series of SRS models. To verify the effectiveness of the proposed TailRec, we conduct extensive experiments over several popular benchmark recommenders. The experimental results demonstrate that TailRec can greatly improve the recommendation results and speed up the training process. The codes of our methods have been available."

---
