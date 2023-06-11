import pandas as pd

def load_data(name):
    data = pd.read_csv(name)
    data.drop_duplicates(inplace=True)
    return data
