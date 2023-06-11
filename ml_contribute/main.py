# Import necessary modules and functions
from load_dataset import load_data
from encoding import encode_categorical_columns
from scaling import scale_data
from feature_selection import select_features, test_sfm
from modeling import split_data, model, model_evaluation, random_forest
from pickle_files import pickler
import pandas as pd
pd.options.display.float_format = '{:.2f}'.format
# Load and preprocess the data
# Replace with your data loading function
data = load_data('ml_contribute/contribute_datasets/heart.csv')

encoded_data = encode_categorical_columns(data)  # Call the encoding function
# Call the data scaling function
scaled_data = scale_data(encoded_data, method='minmax',
                         exclude_col=encoded_data.columns[-1])
x_train, x_test, y_train, y_test = split_data(scaled_data)

x_train_new, selected_features, sfm = select_features(
    x_train, y_train, max_features=12, threshold="mean")
x_test_new = test_sfm(x_test, sfm)
# selected_features = select_features(scaled_data)  # Call the feature selection function

# Train and evaluate the model
# model = model(selected_features, x_train_new, x_test_new, y_train, y_test)  # Call the model training function
# accuracy = model_evaluation(model, selected_features)  # Call the model evaluation function

model = random_forest(x_train_new, x_test_new, y_train, y_test)

pickler()
# Print the accuracy or perform further actions
#print("Model accuracy:", accuracy)
