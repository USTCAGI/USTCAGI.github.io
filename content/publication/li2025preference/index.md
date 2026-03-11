---
title: 'Preference Trajectory Modeling via Flow Matching for Sequential Recommendation'
authors:
- Li Li
- Mingyue Cheng
- Yuyang Ye
- Zhiding Liu
- Enhong Chen

date: '2025-08-25'
doi: '10.48550/arXiv.2508.17618'

publication_types: ['article']
publication: ArXiv
publication_short: ArXiv


abstract: "Sequential recommendation predicts each user's next item based on their historical interaction sequence. Recently, diffusion models have attracted significant attention in this area due to their strong ability to model user interest distributions. They typically generate target items by denoising Gaussian noise conditioned on historical interactions. However, these models face two critical limitations. First, they exhibit high sensitivity to the condition, making it difficult to recover target items from pure Gaussian noise. Second, the inference process is computationally expensive, limiting practical deployment. To address these issues, we propose FlowRec, a simple yet effective sequential recommendation framework which leverages flow matching to explicitly model user preference trajectories from current states to future interests. Flow matching is an emerging generative paradigm, which offers greater flexibility in initial distributions and enables more efficient sampling. Based on this, we construct a personalized behavior-based prior distribution to replace Gaussian noise and learn a vector field to model user preference trajectories. To better align flow matching with the recommendation objective, we further design a single-step alignment loss incorporating both positive and negative samples, improving sampling efficiency and generation quality. Extensive experiments on four benchmark datasets verify the superiority of FlowRec over the state-of-the-art baselines."

---
