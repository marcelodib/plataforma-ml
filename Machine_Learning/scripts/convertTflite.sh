cd ~/Desktop/models/research/object_detection/legacy/tflite/

tflite_convert \
    --output_file=detect.tflite \
    --graph_def_file=tflite_graph.pb \
    --input_arrays=normalized_input_image_tensor \
    --output_arrays='TFLite_Detection_PostProcess','TFLite_Detection_PostProcess:1','TFLite_Detection_PostProcess:2','TFLite_Detection_PostProcess:3' \
    --input_shapes=1,300,300,3 \
    --allow_custom_ops
