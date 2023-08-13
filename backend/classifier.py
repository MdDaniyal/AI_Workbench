from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.linear_model import LogisticRegression
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.gaussian_process import GaussianProcessClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis



import io
import pandas as pd
import io
import pickle

dic = {'lr':LogisticRegression(),
      'rfc':RandomForestClassifier(),
      'svc':SVC(),
      'dtc':DecisionTreeClassifier(),
      'gnb':GaussianNB(),
      'knn':KNeighborsClassifier(),
      'adbst':AdaBoostClassifier(),
      'gpc':GaussianProcessClassifier(),
      'lda':LinearDiscriminantAnalysis(),
      'qda':QuadraticDiscriminantAnalysis()
      }

class Classifier:
    def __init__(self, exp_id, exp_summ):
        self.exp_id = exp_id
        self.train_ftrs = exp_summ['training_features']
        self.tar_ftr = exp_summ['target_feature']
        self.train_test_ratio = exp_summ['train_test_ratio']
        self.rand_state = exp_summ['rand_state']
        self.selected_models = exp_summ['models']
        self.data_split=()
        self.trained_models = []
        
    def fetch_data(self, conn):
        sql = '''SELECT dc.data, dc.file_type FROM public.datasets_collection dc, public.experiments_collection ec WHERE dc.data_id = ec.data_id AND ec.experiment_id = {};'''.format(self.exp_id)
        df = pd.read_sql_query(sql, conn)
        dt=io.BytesIO(df['data'].to_list()[0])
        filetype = df['file_type'].to_list()[0]
        if filetype == 'csv':
             df = pd.read_csv(dt)
        else:
             df = pd.read_excel(dt)
        X = df[self.train_ftrs]
        y = df[self.tar_ftr]
        X_train, X_test, y_train, y_test = train_test_split(X,y , random_state=self.rand_state, train_size=self.train_test_ratio)
        self.data_split=X_train, X_test, y_train, y_test
        
    def train(self):
        for i in self.selected_models:
            model = dic[i]
            model.fit(self.data_split[0], self.data_split[2])
            y_pred = model.predict(self.data_split[1])
            model_pickle = pickle.dumps(model)
            self.trained_models.append({i:model_pickle, 'accuracy':metrics.accuracy_score(self.data_split[3], y_pred)})