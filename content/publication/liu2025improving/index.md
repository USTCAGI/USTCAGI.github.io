---
title: 'Improving Time Series Forecasting via Instance-aware Post-hoc Revision'
authors:
- Zhiding Liu
- Mingyue Cheng
- Guanhao Zhao
- Jiqian Yang
- Qi Liu
- Enhong Chen

publication_types: ['paper-conference']
publication: In *Proceedings of 39th Conference on Neural Information Processing Systems*
publication_short: In *NeurIPS*

abstract: "Time series forecasting plays a vital role in various real-world applications and has attracted significant attention in recent decades. While recent methods have achieved remarkable accuracy by incorporating advanced inductive biases and training strategies, we observe that instance-level variations remain a significant challenge. These variations--stemming from distribution shifts, missing data, and long-tail patterns--often lead to suboptimal forecasts for specific instances, even when overall performance appears strong. To address this issue, we propose a model-agnostic framework, PIR, designed to enhance forecasting performance through Post-forecasting Identification and Revision. Specifically, PIR first identifies biased forecasting instances by estimating their accuracy. Based on this, the framework revises the forecasts using contextual information, including covariates and historical time series, from both local and global perspectives in a post-processing fashion. Extensive experiments on real-world datasets with mainstream forecasting models demonstrate that PIR effectively mitigates instance-level errors and significantly improves forecasting reliability."

---
