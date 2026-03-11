---
title: 'A Hybrid Multi-Factor Framework for Dynamic Intraoperative Hypotension Prediction'
authors:
- Mingyue Cheng
- Jintao Zhang
- Zhiding Liu
- Chunli Liu

date: '2025-11-12'
doi: '10.24963/ijcai.2025/548'

publication_types: ['paper-conference']
publication: In *Proceedings of the 34th International Joint Conference on Artificial Intelligence*
publication_short: In *IJCAI*

abstract: "Intraoperative hypotension (IOH) prediction using past physiological signals is crucial, as IOH may lead to inadequate organ perfusion and significantly elevate the risk of severe complications and mortality. However, current methods often rely on static modeling, overlooking the complex temporal dependencies and the inherently non-stationary nature of physiological signals. We propose a Hybrid Multi-Factor (HMF) network that formulates IOH prediction as a dynamic sequence forecasting task, explicitly capturing both temporal dependencies and physiological non-stationarity. We represent signal dynamics as multivariate time series and decompose them into trend and seasonal components, enabling separate modeling of long-term and periodic variations. Each component is encoded with a patch-based Transformer to balance computational efficiency and feature representation. To address distributional drift from evolving signals, we introduce a symmetric normalization mechanism. Experiments on both public and real-world clinical datasets show that HMF significantly outperforms competitive baselines. We hope HMF offers new insights into IOH prediction and ultimately promotes safer surgical care. Our code is available at https://github.com/Mingyue-Cheng/HMF."

---
