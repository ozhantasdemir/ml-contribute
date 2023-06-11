import numpy as np
from sklearn.preprocessing import MinMaxScaler, StandardScaler
import pickle


def scale_data(dataframe, method='standard', exclude_col=None):
    df = dataframe.copy()
    numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
    if exclude_col:
        numeric_cols.remove(exclude_col)
    if method == 'standard':
        scaler = StandardScaler()
    elif method == 'minmax':
        scaler = MinMaxScaler()
    else:
        raise ValueError('Invalid normalization method')
    df[numeric_cols] = scaler.fit_transform(df[numeric_cols])

    # Pickle the scaler object
    scaler_filepath = 'ml_contribute/outputs/scaler.pkl'
    with open(scaler_filepath, 'wb') as file:
        pickle.dump(scaler, file)

    return df
