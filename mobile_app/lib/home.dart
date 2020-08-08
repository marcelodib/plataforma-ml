import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:tflite/tflite.dart';
import 'package:path_provider/path_provider.dart';

import 'package:http/http.dart' as http;
import 'package:archive/archive.dart';

import 'dart:math' as math;

import 'camera.dart';
import 'bndbox.dart';
import 'models.dart';

class HomePage extends StatefulWidget {
  final List<CameraDescription> cameras;

  HomePage(this.cameras);

  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<dynamic> _recognitions;
  int _imageHeight = 0;
  int _imageWidth = 0;
  String _model = "";

  @override
  void initState() {
    super.initState();
  }

  loadModel(model, label) async {
    String res;
    res = await Tflite.loadModel(model: model, labels: label, isAsset: false);
    print(res);
  }

  Future<File> _downloadFile() async {
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;
    var req = await http.Client()
        .get(Uri.parse("http://192.168.1.100:3000/download"));
    var file = File('$appDocPath/model.zip');
    return file.writeAsBytes(req.bodyBytes);
  }

  onSelect(model) async {
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;

    var zippedFile = await _downloadFile();

    var bytes = zippedFile.readAsBytesSync();
    var archive = ZipDecoder().decodeBytes(bytes);

    for (var file in archive) {
      print('$appDocPath/${file.name}');
      var filename = '$appDocPath/${file.name}';
      if (file.isFile) {
        var outFile = File(filename);
        outFile = await outFile.create(recursive: true);
        await outFile.writeAsBytes(file.content);
      }
    }

    setState(() {
      _model = model;
    });

    loadModel(appDocPath + '/model/ssd_mobilenet.tflite',
        appDocPath + '/model/ssd_mobilenet.txt');
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
      body: _model == ""
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  RaisedButton(
                    child: const Text(ssd),
                    onPressed: () => onSelect(ssd),
                  )
                ],
              ),
            )
          : Stack(
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
