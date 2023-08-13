from flask import Flask, render_template, request, jsonify
from datetime import datetime
import calendar
import time
import pandas as pd
import psycopg2
from flask_cors import CORS, cross_origin
import json
import io
app = Flask(__name__)
CORS(app)

#-------------------------connecting to db-------------------------------------------------------
con = psycopg2.connect(
database="aiwdb",
user="postgres",
password="Login@me1",
host="localhost",
port= '5432'
)


#-------------------------home page--------------------------------------------------------------
@app.route('/home/', methods=['GET', 'POST'])
def welcome():
    return "AI_WORKBENCH"


#-------------------------upload data------------------------------------------------------------
@app.route('/upload_data/', methods=['POST'])
def upload_file():
  cursor_obj = con.cursor()
  try:
    ftype = ""
    if request.method == 'POST':
      f = request.files['file']
      #-------------------------Fetching file data in binary-------------------------------------
      d = f.read()
      #-------------------------Fetching file name-----------------------------------------------
      fn = f.filename
      fname = fn.split('.')[0]
      #-------------------------Computing file size----------------------------------------------
      fsize = len(d)*0.001
      #-------------------------Fetching current or uploading timestamp--------------------------
      current_GMT = time.gmtime()
      dt = calendar.timegm(current_GMT)
      dt_object = datetime.fromtimestamp(dt)
                    
      #-------------------------Currently manually giving userid---------------------------------
      uid = 'daniyal012'
      #-------------------------Extracting filetype from filename--------------------------------
      ftype = fn.split('.')[-1]
      #-------------------------Inserting into db---------------------------------
      cursor_obj.execute("INSERT INTO public.datasets_collection(file_size, upload_time, user_id, file_type, file_name, data) VALUES(%s, %s, %s, %s,%s, %s);",(fsize, dt_object, uid, ftype, fname, d))
      con.commit()

      data = {'message' : 'Successfull'}
      return jsonify(data), 200
  except Exception as e:
    data = {'message' : str(e)}
    return jsonify(data), 500
  finally:
    cursor_obj.close()
#-------------------------get datasets------------------------------------------------------------

@app.route('/datasets/', methods=['GET'])
def data_sets():
    try:
        sql = '''SELECT data_id, file_name, user_id, upload_time, file_size, file_type FROM public.datasets_collection;'''
        df = pd.read_sql_query(sql, con)
        df=df.sort_values(by='upload_time', ascending=False)
        df['upload_time'] = df['upload_time'].astype('str')
        d = df.to_json(orient = "records")
        return jsonify(eval(d)), 200
    except Exception as e:
        data = {'message' : str(e)}
        return jsonify(data), 500

@app.route('/dataset_dropdown/', methods=['GET'])
def dataset_dropdown():
    try:
        sql = '''SELECT data_id, file_name, upload_time FROM public.datasets_collection;'''
        df = pd.read_sql_query(sql, con)
        df=df.sort_values(by='upload_time', ascending=False)
        df['upload_time'] = df['upload_time'].astype('str')
        df["dataname"] = df['file_name'] +" ["+ df["upload_time"] + " ]"
        listdata = df[['data_id', 'dataname']]
        listdata.rename(columns = {'data_id':'dataid'}, inplace = True)
        listjson = listdata.to_json(orient = "records")
        return jsonify(eval(listjson)), 200
    except Exception as e:
        data = {'message' : str(e)}
        return jsonify(data), 500


@app.route('/dataset_info/', methods=['GET'])
def dataset_info():
    cursor_obj = con.cursor()
    try:
        dataid = request.args.get('dataid')
        sql = '''SELECT data, file_type FROM public.datasets_collection where data_id = {};'''.format(dataid)
        df = pd.read_sql_query(sql, con)
        dt=io.BytesIO(df['data'].to_list()[0])
        filetype = df['file_type'].to_list()[0]
        if filetype == 'csv':
             df = pd.read_csv(dt)
        else:
             df = pd.read_excel(dt)
        columns_info=pd.DataFrame({'Column_Name':df.dtypes.index, 'Column_Type':df.dtypes})
        columns_info['Column_Type'] = columns_info['Column_Type'].astype('str')
        columns_info['checkbox_val'] = True
        columns_info['checkbox_val'][-1] = False
        clm = columns_info.to_json(orient = "records")
        otpt_dict={'column_info':json.loads(clm)}
        otpt_dict['checkbox_info']=json.loads(columns_info['checkbox_val'].to_json())
        return jsonify(otpt_dict), 200
    except Exception as e:
        data = {'message' : str(e)}
        return jsonify(data), 500
    finally:
        cursor_obj.close()

@app.route('/upload_experiment_info/', methods=['POST'])
def upload_experiment_info():
  cursor_obj = con.cursor()
  try:
    expinfo = request.data
    exp_elements = json.loads(expinfo)
    exp_summ = {}

    training_features=[]
    for key, val in exp_elements['training_features'].items():
        if val == True:
            training_features.append(key)
    exp_summ['training_features']=training_features
    exp_summ['target_feature']=exp_elements['targetfeature']
    exp_summ['train_test_ratio']=exp_elements['train_test_ratio']
    exp_summ['rand_state']=exp_elements['randstate']
    exp_summ['models'] = exp_elements['selectedModels']
    exp_summ_json = json.dumps(exp_summ)
    exp_name = exp_elements['expname']
    data_id = exp_elements['dataid']
    model_type = exp_elements['problemtype']  

    current_GMT = time.gmtime()
    curr_date = calendar.timegm(current_GMT)
    curr_date_object = datetime.fromtimestamp(curr_date)
    cursor_obj.execute("INSERT INTO public.experiments_collection (experiment_name, model_type, data_id, experiment_summary, deployment_status, created_on, experiment_status) VALUES(%s, %s, %s, %s, %s, %s, %s) RETURNING experiment_id;",(exp_name, model_type, data_id, exp_summ_json, False, curr_date_object, 'Running'))
    exid = cursor_obj.fetchone()[0]
    con.commit() 

    data = {'message' : 'The model is successfully trained.'}
    return jsonify(data), 200
  except Exception as e:
    data = {'message' : str(e)}
    return jsonify(data), 500
  finally:
    cursor_obj.close()




if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug = True)