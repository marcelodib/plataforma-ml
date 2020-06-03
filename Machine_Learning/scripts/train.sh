cd ~/Desktop/models/research/

protoc object_detection/protos/*.proto --python_out=.

export PYTHONPATH=$PYTHONPATH:`pwd`:`pwd`/slim

cd ~/Desktop/models/research/object_detection/legacy/

python3 xml_to_csv.py "/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/"

python3 generate_tfrecord.py "$3" \
--csv_input=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/config/train_labels.csv \
--output_path=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/config/train.record \
--image_dir=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/dataset/train

python3 generate_tfrecord.py "$3" \
--csv_input=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/config/test_labels.csv \
--output_path=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/config/test.record \
--image_dir=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/dataset/test

python3 train.py \
--logtostderr \
--train_dir=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/model/ \
--pipeline_config_path=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/config/trainConfig.config

