---
title: 'SIR Model'
date: 2012-08-14
permalink: /posts/2022/04/sir/
tags:
  - Spread of Disease
  - Computational Epidemiology
  - SciPy
---

# SIR Model for Spread of Disease

Mathematical models such as the Susceptible, Infectious, Recovered (SIR) model are used to predict different scenarios related to epidemiologic factors and possible outcomes to assess epidemic spread. 

The system is governed by the following set of differential equations

$$ \begin{align} 
\begin{aligned} 
\dfrac{\mathrm{d}S}{\mathrm{d}t} &= - \frac{\beta}{N}SI \\[3ex]
\dfrac{\mathrm{d}I}{\mathrm{d}t} &= \frac{\beta}{N}SI - \gamma I \\[3ex]
\dfrac{\mathrm{d}R}{\mathrm{d}t} &= \gamma I \\[1ex]
\end{aligned} 
\end{align} $$

where $ N = S + I + R $ is the population size.