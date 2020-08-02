#sudo pip install mysql-connector
#sudo pip install mysql-connector-python
#sudo pip install mysql-connector-python-rf

import sys
import mysql.connector

idProject = sys.argv[1]

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Prqw1998",
    database="eccnno"
)

mycursor = mydb.cursor()

sql = "UPDATE project SET idStatus = 3 WHERE idProject = " + idProject

mycursor.execute(sql)

mydb.commit()

mydb.close()

print(mycursor.rowcount, "record(s) affected") 