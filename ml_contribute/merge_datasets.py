import pandas as pd

# Read the CSV files
dataset1 = pd.read_csv('ml_contribute/contribute_datasets/test.csv')
dataset2 = pd.read_csv('ml_contribute/contribute_datasets/test_labeled.csv')

# Concatenate the datasets
merged_dataset = pd.concat([dataset1, dataset2])

# Define the output directory and filename
output_directory = 'ml_contribute/contribute_datasets/'
output_filename = 'merged_dataset.csv'
output_path = output_directory + output_filename

# Save the merged dataset
merged_dataset.to_csv(output_path, index=False)

print('Merged dataset saved to:', output_path)
