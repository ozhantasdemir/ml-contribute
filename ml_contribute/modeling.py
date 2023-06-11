import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score
from sklearn.model_selection import RepeatedStratifiedKFold
from sklearn.metrics import precision_recall_curve
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import seaborn as sns


def split_data(data):
    # Select the target column
    target = data.iloc[:, -1].values

    # Split the data into training and testing sets
    x_train, x_test, y_train, y_test = train_test_split(
        data.iloc[:, :-1], target, test_size=0.20, random_state=42)
    return x_train, x_test, y_train, y_test


def model(classifier, x_train, x_test, y_train, y_test):

    classifier.fit(x_train, y_train)
    prediction = classifier.predict(x_test)

    if isinstance(classifier, RandomForestRegressor):
        # Regression model evaluation
        mse = mean_squared_error(y_test, prediction)
        print("Mean Squared Error:", mse)
    else:
        # Classification model evaluation
        accuracy = accuracy_score(y_test, prediction)
        print("Accuracy:", '{0:.2%}'.format(accuracy))
    #print("Cross Validation Score : ",'{0:.2%}'.format(cross_val_score(classifier,x_train_new,y_train,cv = cv,scoring = 'roc_auc').mean()))
    #print("ROC_AUC Score : ",'{0:.2%}'.format(roc_auc_score(y_test,prediction)))
    #plot_roc_curve(classifier, x_test,y_test)
    # plt.title('ROC_AUC_Plot')
    # plt.show()


def model_evaluation(classifier, x_test, y_test):

    # Create an "outputs" folder if it does not exist
    if not os.path.exists('outputs'):
        os.makedirs('outputs')

    prediction = classifier.predict(x_test)
    if isinstance(classifier, RandomForestRegressor):
        # Regression evaluation
        mse = mean_squared_error(y_test, prediction)
        # Calculate the Mean Squared Error (MSE)

        output_file = os.path.join(
            'ml_contribute/outputs', 'regression_report.txt')
        with open(output_file, 'w') as file:
            file.write("Mean Squared Error: {}\n".format(mse))

    else:
        # Confusion Matrix
        cm = confusion_matrix(y_test, classifier.predict(x_test))
        num_classes = len(np.unique(y_test))
        labels = [f'{i}\n{j}' for i in range(
            num_classes) for j in range(num_classes)]
        counts = [value for value in cm.flatten()]
        percentages = ['{0:.2%}'.format(value)
                       for value in cm.flatten()/np.sum(cm)]
        labels = [f'{v1}\n{v2}\n{v3}' for v1, v2,
                  v3 in zip(labels, counts, percentages)]
        labels = np.asarray(labels).reshape(num_classes, num_classes)
        sns.heatmap(cm, annot=labels, cmap="Blues", fmt='')

        report = classification_report(y_test, classifier.predict(x_test))

        # Write the classification report to a text file in the "outputs" folder
        output_file = os.path.join(
            'ml_contribute/outputs', 'classification_report.txt')
        with open(output_file, 'w') as file:
            file.write(report)


def random_forest(x_train, x_test, y_train, y_test):
    last_column = y_train  # Assuming y_train is the last column of your dataset
    threshold_range = 25
    if (last_column.max() - last_column.min()) < threshold_range:
        # Classification
        classifier_rf = RandomForestClassifier(
            n_estimators=100, criterion='entropy', random_state=42)
        model(classifier_rf, x_train, x_test, y_train, y_test)
        model_evaluation(classifier_rf, x_test, y_test)

        model_file = os.path.join(
            'ml_contribute/outputs', 'random_forest_model.pkl')
        with open(model_file, 'wb') as file:
            pickle.dump(classifier_rf, file)
    else:
        # Regression
        regressor_rf = RandomForestRegressor(n_estimators=100, random_state=42)
        model(regressor_rf, x_train, x_test, y_train, y_test)
        model_evaluation(regressor_rf, x_test, y_test)

        model_file = os.path.join(
            'ml_contribute/outputs', 'random_forest_model.pkl')
        with open(model_file, 'wb') as file:
            pickle.dump(regressor_rf, file)
