## 🧠 **About the Project**

**NeuroVision** is an **AI-powered Clinical Decision Support System (CDSS)** developed to enable **early** and **cost-effective** detection of **Alzheimer’s Disease**. The project integrates **multi-modal medical data** while ensuring **interpretability**, **clinical trust**, and **real-world applicability**.

![System Architecture](https://raw.githubusercontent.com/tharunkumardeveloper/Neurovision/main/architecture.png)

## 💡 **Inspiration**

**Alzheimer’s Disease** is often diagnosed at a **late** stage, when **treatment options** become limited. Studies show that **brain changes** and **biological markers** appear years before **visible symptoms**, yet current diagnostic methods rely heavily on **single tests** that are either **expensive** or **insufficient**. This gap inspired us to design **NeuroVision**, focusing on **early detection**, **affordability**, and **clear explanations** that clinicians can understand and trust.

## 🔍 **What It Does**

**NeuroVision** analyzes **clinical test results**, **digital handwriting patterns**, **biomarkers** and **genomic data**, and **MRI** brain scans to classify Alzheimer’s stages such as **Normal**, **Mild Cognitive Impairment (MCI)**, **Mild Alzheimer’s**, and **Moderate Alzheimer’s**. The system provides a **stage prediction**, **risk score**, and **confidence level**, along with **visual explanations** that highlight the factors influencing the decision.

![Flow Diagram](https://raw.githubusercontent.com/tharunkumardeveloper/Neurovision/main/Flow%20diagram.jpg)

## 🛠️ **How We Built It**

The system was built using a **multi-modal ensemble machine learning architecture**. **Convolutional Neural Networks (ResNet50)** were used for **MRI analysis**, while **tree-based models** processed **biomarker** and **genomic data**. **Support Vector Machines (SVMs)** analyzed handwriting features, and **Gradient Boosting models** handled clinical data. A **logistic regression meta-learner** combined all predictions. To ensure transparency, **Explainable AI (XAI)** techniques such as **Grad-CAM** and **SHAP** were integrated. The pipeline was implemented using **Python**, **PyTorch**, and **scikit-learn**, and deployed through a **lightweight interactive dashboard**.

![Grad-CAM Visualization](https://raw.githubusercontent.com/tharunkumardeveloper/Neurovision/main/gradcam.png)

## ⚠️ **Challenges We Ran Into**

We faced challenges in integrating **heterogeneous datasets** with different formats and scales. Managing **class imbalance**, maintaining **model accuracy** while adding **explainability**, and ensuring **computational efficiency** for **low-resource healthcare environments** were key difficulties. Designing a solution that balances **technical performance** with **clinical interpretability** required careful experimentation and iteration.

![MRI Analysis](https://raw.githubusercontent.com/tharunkumardeveloper/Neurovision/main/MRI%20Analysis.png)

## 🏆 **Accomplishments That We’re Proud Of**

We successfully developed a **fully functional multi-modal AI system** that demonstrated **improved performance** over single-modality approaches. The integration of **Explainable AI** improved **transparency and trust**. We also built a **clinician-friendly prototype dashboard** and aligned the project with **SDG 3 – Good Health and Well-Being**, emphasizing accessible healthcare innovation.

## 📘 **What We Learned**

This project helped us understand the importance of **multi-modal learning**, **medical data preprocessing**, and **ethical AI design**. We learned how **explainability** plays a critical role in healthcare applications and how to design AI systems that consider **real-world clinical constraints**, not just theoretical accuracy.

![Risk Prediction](https://raw.githubusercontent.com/tharunkumardeveloper/Neurovision/main/Risk%20Prediction.png)

## 🚀 **What’s Next for NeuroVision**

Plans include testing NeuroVision on larger and more **diverse datasets**, **improving patient-level data alignment**, and extending the system to support **longitudinal disease progression prediction**. We also aim to integrate the platform with **Electronic Health Records (EHRs)** and conduct **clinical pilot studies** to validate its effectiveness in real healthcare settings.
