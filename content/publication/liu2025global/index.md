---
title: 'Global Structure-aware and Feature-augmented Graph Neural Network for Heterophilic Graphs'
authors:
- Huijie Liu
- Shulan Ruan
- Qi Liu
- Mingyue Cheng
- Zhenya Huang
- Yu Liu
- Enhong Chen
- You He

date: '2025-12-23'
doi: '10.1145/3775057'

publication_types: ['article']
publication: ACM Transactions on Information Systems
publication_short: ACM TOIS

abstract: "Graph Neural Networks (GNNs) have been widely used across various fields under the homophily assumption that connected nodes are similar. However, in heterophilic graphs, where connected nodes tend to have dissimilar features, existing GNNs still face some limitations. From the perspective of structure, shallow GNNs could not capture the high-order node information, whereas deep GNNs may suffer from the over-smoothing problem. From the perspective of feature, the useful information of high-order similar nodes is often weakened by low-order dissimilar nodes in the feature update phase. To address the above problems, we propose a Global Structure-aware and Feature-augmented Graph Neural Network (GSF-GNN) to alleviate the limitations from the perspectives of structure and feature. Specifically, from the structure perspective, we design a Structure-based Global Propagation (SGP) module to establish global connections among nodes and adaptively adjust edge weights for message propagation. From the feature perspective, we introduce a Feature-augmented Compensatory Update (FCU) module, which employs a multi-view feature updating mechanism to enhance node features from different perspectives. Our theoretical analysis formally demonstrates the effectiveness of GSF-GNN in heterophilic graphs. Experiments on heterophilic and homophilic benchmark datasets validate the effectiveness of GSF-GNN across various graph structures. Moreover, GSF-GNN achieves stable performance across multiple layers and effectively alleviates the over-smoothing problem. Our codes are available on https://github.com/huijieliu2023/GSF-GNN."

---
