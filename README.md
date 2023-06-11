# ML Tools

**ML Tools** is a collection of three complementary parts: **ML Interface Wizard**, **ML Measure**, and **ML Contribute**. These tools are designed to simplify the development and deployment of Machine Learning models.

---

## ML Contribute

This project aims to address the challenge of making machine learning (ML) more accessible to a wider audience and improving the process of labeling unlabeled data. The objective is to develop a solution that automates the training of any tabular dataset and confidently determines the labels of unlabeled data.

## Installation and Setup

1. Clone the repository:

```shell
git clone https://github.com/ozhantasdemir/ml-contribute.git
```

2. Install the required dependencies:

```shell
npm install
```

3. Start the frontend development server:

```shell
npm start
```

4. Install packages(Python 3.8 is required)

```shell
pip install -r requirements.txt
```

5. Start the backend development server:

```shell
python src/app.py
```

6. Access the application by visiting http://localhost:3000 in your web browser.

*The purpose of the backend code is to create a demo application that takes uploaded files and passes them as input to the corresponding Python scripts. However, due to security restrictions in the React browser's local storage, we are unable to copy the uploaded files directly to our local storage. As a workaround, the code utilizes static datasets located in the specified directory inside python code when the buttons are clicked. The code needs to be deployed to a cloud environment. This is necessary to overcome the limitations imposed by browser security measures and enable the application to access and process the uploaded files.*

