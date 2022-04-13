
import os
import pandas as pd   

# Task: Reading an excel file using Python and outputting the contents
# Author: Shahzeel Farooqi
# MiFO Interview

#Libraries installed: Pandas, openpyxl

#opening the file by starting from the relative path saves us from having to specify an absolsute path
dataToPrint = pd.read_excel (os.getcwd()+"\Test.xlsx")

print (dataToPrint)