from flask import Flask, render_template, request
from datetime import datetime
import calendar
import time
import psycopg2
app = Flask(__name__)

#-------------------------connecting to db-------------------------------------------------------
con = psycopg2.connect(
database="aiwdb",
user="postgres",
password="Login@me1",
host="localhost",
port= '5432'
)
cursor_obj = con.cursor()


#-------------------------home page--------------------------------------------------------------
@app.route('/home/', methods=['GET', 'POST'])
def welcome():
    return "AI_WORKBENCH"


#-------------------------upload data------------------------------------------------------------
@app.route('/upload_data/', methods=['POST'])
def upload_file():
  try:
    flag = 0
    ftype = ""
    if request.method == 'POST':
      f = request.files['file']
      #-------------------------Fetching file name-----------------------------------------------
      fname = f.filename
      #-------------------------Computing file size----------------------------------------------
      fsize = len(f.read())*0.001
      #-------------------------Fetching current or uploading timestamp--------------------------
      current_GMT = time.gmtime()
      dt = calendar.timegm(current_GMT)
      dt_object = datetime.fromtimestamp(dt)
      #-------------------------Currently manually giving userid---------------------------------
      uid = 'daniyal012'
      #-------------------------Extracting filetype from filename--------------------------------
      for i in  fname:
        if i == '.':
          flag = 1
          continue
        if flag == 1:
          ftype += i
      #-------------------------Inserting into db---------------------------------
      cursor_obj.execute("INSERT INTO public.dataset(file_size, upload_timestamp, user_id, file_type, file_name) VALUES(%s, %s, %s, %s,%s);",(fsize, dt_object, uid, ftype, fname))
      con.commit()
      return "File Uploaded Successfully"
  except:
    return "Some error Occured"

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug = True)
