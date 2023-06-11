from flask import Flask, request
import subprocess

app = Flask(__name__)


@app.route('/contribute/train', methods=['POST'])
def train_model():
    # Execute your Python script here

    # Run your Python script
    result = run_training_script()

    return 'Training started'


@app.route('/contribute/merge', methods=['POST'])
def merge_data():
    # Execute your Python script here

    # Run your Python script for merging data
    result = run_merge_script()

    return 'Data merge started'


@app.route('/contribute/label', methods=['POST'])
def label_data():
    # Execute your Python script here

    # Run your Python script for labeling data
    result = run_label_script()

    return 'Data labeling started'


def run_training_script():
    # Replace this with the path to your training_script.py
    script_path = 'ml_contribute/main.py'

    # Run the script using subprocess
    subprocess.run(['python', script_path])

    return 'Training completed'


def run_merge_script():
    # Replace this with the path to your merge_script.py
    script_path = 'ml_contribute/merge_datasets.py'

    # Run the script using subprocess
    subprocess.run(['python', script_path])

    return 'Data merge completed'


def run_label_script():
    # Replace this with the path to your label_script.py
    script_path = 'ml_contribute/label_dataset.py'

    # Run the script using subprocess
    subprocess.run(['python', script_path])

    return 'Data labeling completed'


if __name__ == '__main__':
    app.run(host='localhost', port=3000)
