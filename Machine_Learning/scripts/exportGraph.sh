cd ~/Desktop/models/research/object_detection/

python3 export_tflite_ssd_graph.py \
--input_type=image_tensor \
--pipeline_config_path=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/config/trainConfig.config \
--trained_checkpoint_prefix=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/model/model.ckpt-1000 \
--output_directory=/home/marcelo/Desktop/ECCNNO/Users/$1/projects/$2/graph \
--add_postprocessing_op=true \
--max_detections 10