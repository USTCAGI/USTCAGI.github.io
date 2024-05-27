---
title: 'ConvTimeNet: A Deep Hierarchical Fully Convolutional Model for Multivariate Time Series Analysis'
authors:
- Mingyue Cheng
- Jiqian Yang
- Tingyue Pan
- Qi Liu
- Zhi Li

date: '2024-03-03'
doi: '10.48550/arXiv.2403.01493'

publication_types: ['article']
publication: "arXiv"
publication_short: "arXiv"

abstract: "This paper introduces ConvTimeNet, a novel deep hierarchical fully convolutional network designed to serve as a general-purpose model for time series analysis. The key design of this network is twofold, designed to overcome the limitations of traditional convolutional networks. Firstly, we propose an adaptive segmentation of time series into sub-series level patches, treating these as fundamental modeling units. This setting avoids the sparsity semantics associated with raw point-level time steps. Secondly, we design a fully convolutional block by skillfully integrating deepwise and pointwise convolution operations, following the advanced building block style employed in Transformer encoders. This backbone network allows for the effective capture of both global sequence and cross-variable dependence, as it not only incorporates the advancements of Transformer architecture but also inherits the inherent properties of convolution. Furthermore, multi-scale representations of given time series instances can be learned by controlling the kernel size flexibly. Extensive experiments are conducted on both time series forecasting and classification tasks. The results consistently outperformed strong baselines in most situations in terms of effectiveness.The code is publicly available."

---
