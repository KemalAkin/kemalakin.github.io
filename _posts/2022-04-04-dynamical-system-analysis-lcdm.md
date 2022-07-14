---
title: 'Dynamical System Analysis - L-CDM'
date: 2022-04-04
permalink: /posts/2012/08/dsa-lcdm/
tags:
  - Cosmology
  - Lambda-CDM
  - Stability Analysis
---

<!-- 
This post will show up by default. To disable scheduling of future posts, edit `config.yml` and set `future: false`.
-->

$\Lambda-\mathrm{CDM}$ is the simplest model that is widely consistent with the observations. 

The following set of equations describe the system:

$$
\begin{align}
\begin{split}
\Omega'_{\text{m}} &= \Omega_{\text{m}}(\Omega_{\text{r}} -3 \Omega_\Lambda )\\[1ex]
\Omega'_{\text{r}} &= \Omega_{\text{r}}(\Omega_{\text{r}} -3 \Omega_\Lambda - 1 )\\[1ex]
\Omega'_\Lambda &=  \Omega_\Lambda (\Omega_{\text{r}} - 3\Omega_\Lambda + 3)
\end{split}
\end{align}
$$

Using the constraint equation $\Omega_{\text{m}} + \Omega_{\text{r}} + \Omega_{\Lambda} = 1$, the system can be reduced to 2 dimensions,

$$
\begin{align}
\begin{split}
\Omega'_{\text{m}} &= \Omega_{\text{m}}(3\Omega_{\text{m}} + 4\Omega_{\text{r}} -3 )\\[1ex]
\Omega'_{\text{r}} &= \Omega_{\text{r}}(3\Omega_{\text{m}} + 4\Omega_{\text{r}} -4 )
\end{split}
\end{align}
$$
where we have eliminated the $\Omega_\Lambda$ term.

![Matter - Radiation - Lambda Model](https://github.com/Kemalakin/kemalakin.github.io/blob/master/images/dsa-lcdm/mrl-2d.png?raw=true)

You can use the following code to generate phase space diagram..

```python
import numpy as np
import matplotib.pyplot as plt
import sympy as sp
import scipy.odeint

def system(m,r,l,t):
  .
  .
  .
  .

```

add gist

<script src="https://gist.github.com/Kemalakin/ae29e465c373a7ce7bfb00786b4e6ae6.js"></script>