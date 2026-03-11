---
title: 'Visual Autoregressive Modeling for Instruction-Guided Image Editing'
authors:
- Qingyang Mao
- Qi Cai
- Yehao Li
- Yingwei Pan
- Mingyue Cheng
- Ting Yao
- Qi Liu
- Tao Mei

publication_types: ['paper-conference']
publication: In *The Fourteenth International Conference on Learning Representations*
publication_short: In *ICLR*

abstract: "Recent advances in diffusion models have brought remarkable visual fidelity to instruction-guided image editing. However, their global denoising process inherently entangles the edited region with the entire image context, leading to unintended spurious modifications and compromised adherence to editing instructions. In contrast, autoregressive models offer a distinct paradigm by formulating image synthesis as a sequential process over discrete visual tokens. Their causal and compositional mechanism naturally circumvents the adherence challenges of diffusion-based methods. In this paper, we present VAREdit, a visual autoregressive (VAR) framework that reframes image editing as a next-scale prediction problem. Conditioned on source image features and text instructions, VAREdit generates multi-scale target features to achieve precise edits. A core challenge in this paradigm is how to effectively condition the source image tokens. We observe that finest-scale source features cannot effectively guide the prediction of coarser target features. To bridge this gap, we introduce a Scale-Aligned Reference (SAR) module, which injects scale-matched conditioning information into the first self-attention layer. VAREdit demonstrates significant advancements in both editing adherence and efficiency. On EMU-Edit and PIE-Bench benchmarks, VAREdit outperforms leading diffusion-based methods by a substantial margin in terms of both CLIP and GPT scores. Moreover, VAREdit completes a 512x512 editing in 1.2 seconds, making it 2.2x faster than the similarly sized UltraEdit. Code is available at: https://github.com/HiDream-ai/VAREdit."

---
