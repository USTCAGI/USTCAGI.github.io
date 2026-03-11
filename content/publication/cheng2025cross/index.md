---
title: 'Cross-Domain Pre-training with Language Models for Transferable Time Series Representations'
authors:
- Mingyue Cheng
- Xiaoyu Tao
- Qi Liu
- Hao Zhang
- Yiheng Chen
- Defu Lian

date: '2025-03-10'
doi: '10.1145/3701551.370349'

publication_types: ['paper-conference']
publication: In *Proceedings of the Eighteenth ACM International Conference on Web Search and Data Mining*
publication_short: In *WSDM*

abstract: "Pre-training universal models across multiple domains to enhance downstream tasks is a prevalent learning paradigm. However, there has been minimal progress in pre-training transferable models across domains for time series representation. This dilemma is incurred by two key factors: the limited availability of training set within each domain and the substantial differences in data characteristics between domains. To address these challenges, we present a novel framework, namely CrossTimeNet, designed to perform cross-domain self-supervised pre-training to benefit target tasks. Specifically, to address the issue of data scarcity, we utilize a pre-trained language model as the backbone network to effectively capture the sequence dependencies of the input time series. Meanwhile, we adopt the recovery of corrupted region inputs as a self-supervised optimization objective, taking into account the locality of the time series. To address discrepancies in data characteristics, we introduce a novel tokenization module that converts continuous time series inputs into discrete token sequences using vector quantization techniques. This approach facilitates the learning of transferable time series models across different domains. Extensive experimental results on diverse time series tasks, including classification and forecasting, demonstrate the effectiveness of our approach. Our codes are publicly available at https://github.com/Mingyue-Cheng/CrossTimeNet."

---
