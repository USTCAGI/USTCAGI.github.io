---
title: "Learning the explainable semantic relations via unified graph topic-disentangled neural networks"
authors:
- Likang Wu
- Hongke Zhao
- Zhi Li
- Zhenya Huang
- Qi Liu
- Enhong Chen

date: "2023-05-12"
doi: "10.1145/3589964"

publication_types: ["article-journal"]
publication: "ACM Transactions on Knowledge Discovery from Data"
publication_short: "ACM TKDD"

abstract: Graph Neural Networks (GNNs) such as Graph Convolutional Networks (GCNs) can effectively learn node representations via aggregating neighbors based on the relation graph. However, despite a few exceptions, most of the previous work in this line does not consider the topical semantics underlying the edges, making the node representations less effective and the learned relation between nodes hard to explain. For instance, the current GNNs make us usually don’t know what is the reason for the connection of network nodes, such as the specific research topics cited in this article and the concerns among friends on social platforms. Some methods have begun to explore the extraction of relation semantics in recent related literature, but existing studies generally face two bottlenecks, i.e., either being unable to explain the mined latent relations to ensure their reasonableness and independence, or demanding the textual content of edges which is unavailable in most real-world datasets. Actually, these two issues are both crucial in practical use. In our work, we propose a novel Topic-Disentangled Graph Neural Network (TDG) to address the above two issues at the same time, which explores the relation topics from the perspective of node contents. We design an optimized graph topic module to handle node features to construct independent and explainable semantic subspaces, then the reasonable relation topics that correspond to these subspaces are assigned to each graph relation via a neighborhood routing mechanism. Our proposed model can be easily combined with related graph tasks to form an end-to-end model, to avoid the risk of deviation between node representation space and task space. To evaluate the efficiency of our model, sufficient node-related tasks are conducted on three public datasets in the experimental section. The results show the obvious superiority of TDG compared with the state-of-the-art models.

---