import 'dart:io';

import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:tflite/tflite.dart';
import 'package:path_provider/path_provider.dart';

import 'dart:math' as math;

import '../widgets/camera.dart';
import '../widgets/bndbox.dart';
import '../utils/models.dart';
import '../main.dart' as main;

class TestProject extends StatefulWidget {
  final List<CameraDescription> cameras = main.cameras;
  int idProject;

  TestProject(this.idProject);

  @override
  _TestProjectState createState() => new _TestProjectState();
}

class _TestProjectState extends State<TestProject> {
  List<dynamic> _recognitions;
  int _imageHeight = 0;
  int _imageWidth = 0;
  String _model = "";

  @override
  void initState() {
    super.initState();
    onSelect(ssd);
  }

  loadModel(model, label) async {
    String res;
    res = await Tflite.loadModel(model: model, labels: label, isAsset: false);
    print(res);
  }

  onSelect(model) async {
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;

    setState(() {
      _model = model;
    });

    loadModel(appDocPath + '/${widget.idProject}-tflite/detect.tflite',
        appDocPath + '/${widget.idProject}-tflite/detect.txt');
  }

  setRecognitions(recognitions, imageHeight, imageWidth) {
    setState(() {
      _recognitions = recognitions;
      _imageHeight = imageHeight;
      _imageWidth = imageWidth;
    });
  }

  @override
  Widget build(BuildContext context) {
    Size screen = MediaQuery.of(context).size;
    return Scaffold(
      body: Stack(
        children: [
          Camera(
            widget.cameras,
            _model,
            setRecognitions,
          ),
          BndBox(
              _recognitions == null ? [] : _recognitions,
              math.max(_imageHeight, _imageWidth),
              math.min(_imageHeight, _imageWidth),
              screen.height,
              screen.width,
              _model),
        ],
      ),
    );
  }
}
