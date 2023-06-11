import random
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# load your labeled dataset
df = pd.read_csv('ml_contribute/contribute_datasets/heart.csv')

# Initialize final_labels DataFrame with same column names as df
final_labels = pd.DataFrame(columns=df.columns)

# define a mapping function for the new labels based on the unique labels in the original dataset
unique_labels = df.iloc[:, -1].unique()


def generate_new_label(original_label):
    # create a list of new labels with the same length as unique_labels
    new_labels = random.choices(unique_labels, k=len(unique_labels))
    # set the weight of the original label to 0
    original_label_index = list(unique_labels).index(original_label)
    new_labels[original_label_index] = original_label
    # randomly choose a new label based on the weights
    # print(new_labels)
    # print([1/len(unique_labels)]*len(unique_labels))
    return random.choices(new_labels, weights=[1/len(unique_labels)]*len(unique_labels))[0]


def assign_labels():
    # assign new labels to the duplicated rows
    #new_df["Prediction"] = new_df.iloc[:, -1].apply(generate_new_label).astype(int)
    last_col_index = df.columns.get_loc(df.columns[-1])
    new_df.insert(last_col_index, "Prediction",
                  new_df[df.columns[-1]].apply(generate_new_label))

    prediction_col_index = new_df.columns.get_loc("Prediction")
    new_df.insert(prediction_col_index, "Experience", 0)
    new_df.insert(prediction_col_index, "ExpertAge", 0)

    # assign new values to the Age and Experience columns
    for i, row in new_df.iterrows():
        # print(i)
        # print(row)
        # if the assigned label is the same as the original label
        if row.iloc[-1] == row.iloc[-2]:
            new_df.at[i, 'ExpertAge'] = random.randint(
                35, 70)  # assign age between 35-70
            new_df.at[i, 'Experience'] = random.randint(
                2, 4)  # assign experience between 2-4
        else:
            new_df.at[i, 'ExpertAge'] = random.randint(
                24, 35)  # assign age between 24-35
            new_df.at[i, 'Experience'] = random.randint(
                1, 2)  # assign experience between 1-2

        #new_df.insert(new_df.columns.get_loc('Prediction'), 'ExpertAge', new_df['Prediction'])
        #new_df.insert(new_df.columns.get_loc('Prediction'), 'Experience', new_df['Prediction'])


def apply_voting_algorithm(new_df):
    # Scaling ExpertAge and Experience
    scaler = MinMaxScaler()
    scaled_age = scaler.fit_transform(
        new_df['ExpertAge'].values.reshape(-1, 1))
    scaled_experience = scaler.fit_transform(
        new_df['Experience'].values.reshape(-1, 1))

    # Calculate row weights based on scaled values
    row_weights = scaled_age + scaled_experience

    # Calculate total weights for each class
    class_weights = {}
    total_weights = {}
    # label_column = new_df.columns[-1]  # Assume OriginalLabel is the last column
    #unique_labels = new_df[label_column].unique()
    label_column = "Prediction"  # Assume OriginalLabel is the last column
    unique_labels = new_df["Prediction"].unique()
    for label in unique_labels:
        class_weights[label] = row_weights[new_df[label_column] == label].sum()
        total_weights[label] = class_weights[label]

    # Calculate average weight for each class
    total_weight_sum = sum(total_weights.values())
    class_weight_average = {
        label: weight / total_weight_sum for label, weight in total_weights.items()}

    # Apply model predictions
    model_prediction = 1  # Replace with your actual model prediction as an integer
    prediction_weights = {label: int(label == model_prediction)
                          for label in unique_labels}

    # print(prediction_weights)

    # Calculate final voting results
    voting_results = {}
    for label in unique_labels:
        voting_results[label] = (
            class_weight_average[label] * 0.7) + (prediction_weights[label] * 0.3)

    return voting_results

#new_df = pd.DataFrame(columns=df.columns)


for i in range(int(0.4 * df.shape[0])):
    new_df = pd.DataFrame(columns=df.columns)

    # select a random row from the dataset
    random_row_index = random.randint(0, len(df)-1)
    selected_row = df.iloc[random_row_index]
    selected_row_index = random_row_index

    # create a new dataset by duplicating the selected row n times
    n = 20  # number of duplicates
    new_df = pd.DataFrame([selected_row]*n, columns=selected_row.index)

    new_df = new_df.reset_index(drop=True)

    random_row_index = random.randint(0, len(df)-1)
    selected_row = selected_row.copy()
    #selected_row.iloc[-1] = new_label

    new_label = generate_new_label(selected_row.iloc[-1])
    assign_labels()
    selected_row.iloc[-1] = new_label
    #new_df = pd.concat([new_df, selected_row.to_frame().T], ignore_index=True)

    #df = df.drop(random_row_index)
    df = df.drop(selected_row_index).reset_index(drop=True)

    voting_results = apply_voting_algorithm(new_df)
    # print(voting_results)

    # Get the key with the highest probability from the voting_results dictionary
    highest_probability_key = max(voting_results, key=voting_results.get)
    # print(highest_probability_key)
    # Assign the highest probability to the last column of the first row in new_df
    new_df.iloc[0, -1] = highest_probability_key

    # Drop multiple columns from a DataFrame
    new_df = new_df.drop(['ExpertAge', 'Experience', 'Prediction'], axis=1)

    #final_labels = pd.concat([final_labels, new_df.iloc[0]], ignore_index=True)
    final_labels = pd.concat(
        [final_labels, new_df.iloc[[0]]], ignore_index=True)

# Save the DataFrame to a CSV file
df.to_csv('ml_contribute/contribute_datasets/test.csv', index=False)
final_labels.to_csv(
    'ml_contribute/contribute_datasets/test_labeled.csv', index=False)
