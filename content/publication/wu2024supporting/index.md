---
title: "Supporting Your Idea Reasonably: A Knowledge-Aware Topic Reasoning Strategy for Citation Recommendation"
authors:
- Likang Wu
- Zhi Li
- Hongke Zhao
- Zhenya Huang
- Yongqiang Han
- Junji Jiang
- Enhong Chen

date: "2024-02-22"
doi: "10.1109/TKDE.2024.3365508"

publication_types: ["article-journal"]
publication: "IEEE Transactions on Knowledge and Data Engineering"
publication_short: "IEEE TKDE"

abstract: With the explosive growth of scholarly information, researchers spend much time and effort copiously quoting authoritative works to support their ideas or motivations. We aim to alleviate this situation by proposing a citation recommendation strategy that recalls related papers for a rough idea (a piece of text, i.e., abstract, manuscript). However, the perspective of existing citation recommendations can not be well applied to our task for two defects. First, these methods neglect the reasoning of research topics, which makes the recommendation mechanism not meticulous enough and lacks explainability. For instance, they are not able to mine the hidden citing logic for the candidate paper while recommending. We fill the research gap by constructing structural topics consisting of knowledge concepts from the textual content, where reasoning paths between topics are extracted from an external knowledge graph. Second, the citation network is viewed as a crucial structural context to enhance the recommendation performance, but the new target idea does not have links to the citation network as published papers do. To simulate the prospective topological structure, our model, meanwhile, incorporates a contrastive-learning-based alignment paradigm to encourage the consistency of content embeddings and structure-oriented embeddings. We evaluate our proposed model on three real-world datasets and demonstrate that it significantly improves recommendation accuracy while providing high-quality knowledge-aware reasoning. And an interesting visual example illustrates the reasoning process when our model actually judges samples, which supports the feasibility of our topic-view learning paradigm.

---
