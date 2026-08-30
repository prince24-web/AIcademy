# Module 7: Ensemble Learning - Curriculum Specification

This document serves as the master syllabus and specification for authoring all lessons in **Module 7: Ensemble Learning**.

---

## Module 7 Lesson Outline

### Lesson 1 (`ml-7-1`): Foundations of Ensemble Learning
- **What is Ensemble Learning?**: Combining multiple base (or weak) learners to construct a single robust, high-performing strong learner.
- **Why Use Ensembles?**: Overcoming the limitations of single algorithms, error correction through consensus, and improving generalization on unseen data.
- **The Bias-Variance Trade-Off**:
  - Understanding underfitting (high bias) vs. overfitting (high variance).
  - How ensembles strategically manipulate bias and variance to minimize total prediction error.
- **Execution Paradigms**:
  - Parallel architectures (independent models).
  - Sequential architectures (dependent, error-correcting models).

---

### Lesson 2 (`ml-7-2`): Simple Ensemble Techniques (Voting & Averaging)
- **Majority Voting**: Aggregating outputs for classification tasks (Hard Voting vs. Soft Voting).
- **Averaging**: Combining continuous predictions or probability estimates for regression tasks.
- **Simple vs. Weighted Combination**: Assigning uniform influence versus weighting individual models by historical validation accuracy.

---

### Lesson 3 (`ml-7-3`): Bagging (Bootstrap Aggregation)
- **The Bootstrapping Mechanism**: Sampling with replacement, generating independent, unweighted data subsets.
- **Parallel Model Training**: Fitting base learners simultaneously across hardware threads or compute clusters.
- **Aggregation**: Combining predictions via voting or averaging.
- **Theoretical Goal**: Variance reduction on complex, low-bias models (e.g., fully grown decision trees).

---

### Lesson 4 (`ml-7-4`): Random Forest
- **Overcoming Tree Correlation**: Why standard bagging on decision trees can still suffer from correlated errors when a dominant feature exists.
- **Feature Sub-sampling (Feature Bagging)**: Selecting random subsets of features ($m = \sqrt{p}$) at each split.
- **Ensemble Diversity & Regularization**: Achieving lower variance and preventing overfitting through structural decorrelation.

---

### Lesson 5 (`ml-7-5`): Boosting (Sequential Learning)
- **The Boosting Framework**: Iterative model training where each learner focuses on instances misclassified by earlier models.
- **Instance Weighting**: Dynamically increasing the weights of difficult examples.
- **Theoretical Goal**: Bias reduction by converting high-bias, low-variance weak learners into a strong predictor.
- **Core Algorithms**:
  - **AdaBoost (Adaptive Boosting)**: Single-split decision stumps, dynamic sample re-weighting, and accuracy-weighted voting ($\alpha_m$).
  - **Gradient Boosting (GBM)**: Formulating boosting as gradient descent optimization, fitting base trees directly to pseudo-residuals / negative gradients.
  - **XGBoost (Extreme Gradient Boosting)**: Speed optimizations, 2nd-order Taylor approximation (Hessian + Gradient), L1/L2 tree regularization ($\gamma, \lambda$), missing value handling, and parallel split finding.

---

### Lesson 6 (`ml-7-6`): Stacking (Stacked Generalization / Blending)
- **Two-Level Hierarchical Architecture**:
  - **Level 1 (Base Estimators)**: Training heterogeneous algorithms (e.g., SVM, Random Forest, KNN, Ridge/Lasso).
  - **Level 2 (Meta-Learner)**: Using a learning algorithm (e.g., Logistic Regression / Ridge) to discover how best to combine Level 1 predictions.
- **Replacing Static Rules**: Why learned meta-models can outperform fixed voting or averaging.
- **Trade-Offs**: High predictive performance versus heavy computational training costs and complexity.

---

### Lesson 7 (`ml-7-7`): Comparative Strategy & Model Evaluation
- **Architectural Trade-offs**:
  - Bagging vs. Boosting vs. Stacking (Parallel vs. Sequential vs. Hierarchical).
  - Computational efficiency and hardware demands (GPU/CPU scalability).
  - Overfitting risks (Bagging's stability vs. Boosting's sensitivity to outliers/noise).
- **Model Validation & Leakage Prevention**:
  - Preventing out-of-fold data leakage across ensemble layers in Stacking (`cross_val_predict`).
  - Using $k$-fold cross-validation to reliably assess generalization on unseen data.

---

### Capstone Mini-Project (`ml-7-p1`): High-Performance Ensemble Model
- *Hands-on tabular benchmark applying Bagging, Random Forest, XGBoost, and Stacking with out-of-fold validation.* (To be developed after core lessons).
