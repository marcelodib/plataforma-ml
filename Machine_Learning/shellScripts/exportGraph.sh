cd ~/Desktop/models/research/object_detection/

python3 export_tflite_ssd_graph.py \
    --input_type=image_tensor \
    --pipeline_config_path=legacy/training/ssd_mobilenet_v2_quantized_300x300_coco.config \
    --trained_checkpoint_prefix=legacy/training/model.ckpt-71145 \
    --output_directory=legacy/tflite \
    --add_postprocessing_op=true \
    --max_detections 10
