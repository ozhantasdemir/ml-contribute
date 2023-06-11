import os
import pickle


def pickler():
    # Create a new pickle file in the ml_contribute/outputs directory
    output_directory = "ml_contribute/outputs"
    os.makedirs(output_directory, exist_ok=True)
    file_path = os.path.join(output_directory, "preprocessing_files.pkl")

    with open(file_path, "wb") as file:
        # Open and read feature_selection.py
        with open("ml_contribute/feature_selection.py", "r") as feature_selection_file:
            feature_selection_code = feature_selection_file.read()

        # Open and read encoding.py
        with open("ml_contribute/encoding.py", "r") as encoding_file:
            encoding_code = encoding_file.read()

        # Open and read scaling.py
        with open("ml_contribute/scaling.py", "r") as scaling_file:
            scaling_code = scaling_file.read()

        # Create a dictionary to hold the file contents
        preprocessing_files = {
            "feature_selection.py": feature_selection_code,
            "encoding.py": encoding_code,
            "scaling.py": scaling_code
        }

        # Pickle the dictionary into the file
        pickle.dump(preprocessing_files, file)
