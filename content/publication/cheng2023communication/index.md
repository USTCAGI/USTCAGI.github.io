---
title: 'Communication-efficient federated learning with stagewise training strategy'
authors:
- Yifei Cheng
- Shuheng Shen
- Xianfeng Liang
- Jingchang Liu
- Joya Chen
- Tie Zhang
- Enhong Chen

date: '2023-10-01'
doi: '10.1016/j.neunet.2023.08.033'

publication_types: ["article-journal"]
publication: "Neural Networks"
publication_short: "Neural Networks"

abstract: The efficiency of communication across workers is a significant factor that affects the performance of federated learning. Though periodic communication strategy is applied to reduce communication rounds in training, the communication cost is still high when the training data distributions are not independently and identically distributed (non-IID) which is common in federated learning. Recently, some works introduce variance reduction to eliminate the effect caused by non-IID data among workers. Nevertheless the provable optimal communication complexity O ( log ( S T ) ) and convergence rate O ( 1 / ( S T ) ) cannot be achieved simultaneously, where S denotes the number of sampled workers in each round and T is the number of iterations. To deal with this dilemma, we propose an optimization algorithm SQUARFA that adopts stagewise training framework coupling with variance reduction and uses a quick-start phase in each loop. Theoretical results show that SQUARFA achieves both optimal convergence rate and communication complexity for both strongly convex objectives and non-convex objectives under PL condition, thus fills the gap mentioned above. Then, a variant of SQUARFA yields the optimal theoretical results for general non-convex objectives. We further extend the technique in SQUARFA to the large batch setting and achieve optimal communication complexity. Experimental results demonstrate the superiority of the proposed algorithms.

---
