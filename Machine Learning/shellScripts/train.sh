cd ~/Desktop/models/research/

protoc object_detection/protos/*.proto --python_out=.

export PYTHONPATH=$PYTHONPATH:`pwd`:`pwd`/slim

cd ~/Desktop/models/research/object_detection/legacy/

python3 train.py --logtostderr --train_dir=training/ --pipeline_config_path=training/ssd_mobilenet_v2_quantized_300x300_coco.config

