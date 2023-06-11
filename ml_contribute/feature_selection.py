import pandas as pd
from sklearn.feature_selection import SelectFromModel
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import RandomForestRegressor

def select_features(X, y, max_features, threshold):
    last_column = y  # Assuming y_train is the last column of your dataset
    threshold_range = 25
    if (last_column.max() - last_column.min()) > threshold_range:
        # Regression
        clf = RandomForestRegressor(
            n_estimators=100, random_state=42, n_jobs=-1)
    else:
        # Classification
        clf = RandomForestClassifier(
            n_estimators=100, random_state=42, n_jobs=-1)


    # Train the classifier
    clf.fit(X, y)

    # Create a selector object that will use the random forest classifier to identify
    # features to keep
    sfm = SelectFromModel(clf, threshold=threshold)

    # Fit the selector to the data
    sfm.fit(X, y)

    # Get the selected feature indices and names
    selected_indices = sfm.get_support(indices=True)
    selected_features = pd.Index(X.columns[selected_indices])

    # Select up to max_features
    selected_indices = selected_indices[:max_features]

    # Create a new feature matrix with the selected features
    X_new = X.iloc[:, selected_indices]

    return X_new, selected_features, sfm

def test_sfm(x_test, sfm):
    x_test_new = x_test.iloc[:, sfm.get_support()]
    return x_test_new


