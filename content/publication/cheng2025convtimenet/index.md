---
title: 'ConvTimeNet: A Deep Hierarchical Fully Convolutional Model for Multivariate Time Series Analysis'
authors:
- Mingyue Cheng
- Jiqian Yang
- Tingyue Pan
- Qi Liu
- Zhi Li
- Shijin Wang

date: '2025-05-23'
doi: '10.1145/3701716.3715214'

publication_types: ['paper-conference']
publication: In *Companion Proceedings of the ACM on Web Conference 2025*
publication_short: In *WWW*

abstract: "Designing effective models for learning time series representations is foundational for time series analysis. Many previous works explore time series representation modeling approaches and make progress in this area. Despite their effectiveness, they lack adaptive perception of local patterns in temporally dependent basic units and fail to capture the multi-scale dependency among these units. Instead of relying on prevalent methods centered around self-attention mechanisms, we propose ConvTimeNet, a hierarchical pure convolutional model designed for time series analysis. ConvTimeNet introduces a deformable patch layer that adaptively perceives local patterns of temporally dependent basic units in a data-driven manner. Based on the extracted local patterns, hierarchical pure convolutional blocks are designed to capture dependency relationships among the representations of basic units at different scales. Moreover, a large kernel mechanism is employed to ensure that convolutional blocks can be deeply stacked, thereby achieving a larger receptive field. In this way, local patterns and their multi-scale dependencies can be effectively modeled within a single model. Extensive experiments comparing a wide range of different types of models demonstrate that pure convolutional models still exhibit strong viability, effectively addressing the aforementioned two challenges and showing superior performance across multiple tasks. The code is available for reproducibility. https://github.com/Mingyue-Cheng/ConvTimeNet"

---
