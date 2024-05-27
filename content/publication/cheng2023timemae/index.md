---
title: "TimeMAE: Self-Supervised Representations of Time Series with Decoupled Masked Autoencoders"
authors:
- Mingyue Cheng
- Qi Liu
- Zhiding Liu
- Hao Zhang
- Rujiao Zhang
- Enhong Chen

date: "2023-03-01"
doi: "10.48550/arXiv.2303.00320"

publication_types: ["article"]
publication: "arXiv"
publication_short: "arXiv"

abstract: Enhancing the expressive capacity of deep learning-based time series models with self-supervised pre-training has become ever-increasingly prevalent in time series classification. Even though numerous efforts have been devoted to developing self-supervised models for time series data, we argue that the current methods are not sufficient to learn optimal time series representations due to solely unidirectional encoding over sparse point-wise input units. In this work, we propose TimeMAE, a novel self-supervised paradigm for learning transferrable time series representations based on transformer networks. The distinct characteristics of the TimeMAE lie in processing each time series into a sequence of non-overlapping sub-series via window-slicing partitioning, followed by random masking strategies over the semantic units of localized sub-series. Such a simple yet effective setting can help us achieve the goal of killing three birds with one stone, i.e., (1) learning enriched contextual representations of time series with a bidirectional encoding scheme; (2) increasing the information density of basic semantic units; (3) efficiently encoding representations of time series using transformer networks. Nevertheless, it is a non-trivial to perform reconstructing task over such a novel formulated modeling paradigm. To solve the discrepancy issue incurred by newly injected masked embeddings, we design a decoupled autoencoder architecture, which learns the representations of visible (unmasked) positions and masked ones with two different encoder modules, respectively. Furthermore, we construct two types of informative targets to accomplish the corresponding pretext tasks. One is to create a tokenizer module that assigns a codeword to each masked region, allowing the masked codeword classification (MCC) task to be completed effectively. Another one is to adopt a siamese network structure to generate target representations for each masked input unit, aiming at performing the masked representation regression (MRR) optimization. Comprehensively pre-trained, our model can efficiently learn transferrable time series representations, thus benefiting the classification of time series. We extensively perform experiments on five benchmark datasets to verify the effectiveness of the TimeMAE. Experimental results show that the TimeMAE can significantly surpass previous competitive baselines. Furthermore, we also demonstrate the universality of the learned representations by performing transfer learning experiments. For the reproducibility of our results, we make our experiment codes publicly available to facilitate the self-supervised representations of time series in https://github.com/Mingyue-Cheng/TimeMAE.

---