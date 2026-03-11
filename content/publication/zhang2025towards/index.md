---
title: "Towards Automatic Sampling of User Behaviors for Sequential Recommender Systems"
authors:
- Hao Zhang
- Mingyue Cheng
- Qi Liu
- Zhiding Liu
- Enhong Chen

date: "2023-11-01"
doi: "10.48550/arXiv.2311.00388"

publication_types: ["article"]
publication: "arXiv"
publication_short: "arXiv"

abstract: Sequential recommender systems (SRS) have gained widespread popularity in recommendation due to their ability to effectively capture dynamic user preferences. One default setting in the current SRS is to uniformly consider each historical behavior as a positive interaction. Actually, this setting has the potential to yield sub-optimal performance, as each item makes a distinct contribution to the user's interest. For example, purchased items should be given more importance than clicked ones. Hence, we propose a general automatic sampling framework, named AutoSAM, to non-uniformly treat historical behaviors. Specifically, AutoSAM augments the standard sequential recommendation architecture with an additional sampler layer to adaptively learn the skew distribution of the raw input, and then sample informative sub-sets to build more generalizable SRS. To overcome the challenges of non-differentiable sampling actions and also introduce multiple decision factors for sampling, we further introduce a novel reinforcement learning based method to guide the training of the sampler. We theoretically design multi-objective sampling rewards including Future Prediction and Sequence Perplexity, and then optimize the whole framework in an end-to-end manner by combining the policy gradient. We conduct extensive experiments on benchmark recommender models and four real-world datasets. The experimental results demonstrate the effectiveness of the proposed approach. We will make our code publicly available after the acceptance.

---