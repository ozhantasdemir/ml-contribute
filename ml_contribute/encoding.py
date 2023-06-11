from sklearn.preprocessing import LabelEncoder

def encode_categorical_columns(data):
    # Create a copy of the original dataframe
    df1 = data.copy(deep=True)

    # Loop through each column in the dataframe
    for col in df1.columns:
        # Check if the column data type is object or string (i.e., categorical)
        if df1[col].dtype == 'object':
            # Instantiate a LabelEncoder object
            le = LabelEncoder()
            # Fit and transform the column data using LabelEncoder
            df1[col] = le.fit_transform(df1[col])

    return df1
