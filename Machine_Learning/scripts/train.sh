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

cd ~/Desktop/models/research/object_detection/

python3 export_tflite_ssd_graph.py \
--input_type=image_tensor \
--pipeline_config_path=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/config/trainConfig.config \
--trained_checkpoint_prefix=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/model/model.ckpt-1000 \
--output_directory=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/graph \
--add_postprocessing_op=true \
--max_detections 10

tflite_convert \
--output_file=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/tflite/detect.tflite \
--graph_def_file=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/graph/tflite_graph.pb \
--output_format=TFLITE \
--input_arrays=normalized_input_image_tensor \
--input_shapes=1,300,300,3 \
--inference_type=QUANTIZED_UINT8 \
--mean_values=128 \
--std_dev_values=128 \
--change_concat_input_ranges=false \
--output_arrays='TFLite_Detection_PostProcess','TFLite_Detection_PostProcess:1','TFLite_Detection_PostProcess:2','TFLite_Detection_PostProcess:3' \
--allow_custom_ops

