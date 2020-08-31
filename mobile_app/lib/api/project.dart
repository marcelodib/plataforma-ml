import 'dart:io';

import 'package:archive/archive.dart';
import 'package:path_provider/path_provider.dart';
import 'package:plataforma_ml/api/api.dart' as api;

Future<List> listProject() async {
  try {
    Map response = await api.Api.post("/listProject", {"idProject": "0"});

    if (response["status"] == "success") {
      return response["data"];
    }

    return [];
  } catch (error) {
    return [];
  }
}

Future<bool> downloadProject(int idProject, String format) async {
  try {
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;

    bool exist = await Directory('$appDocPath/$idProject-$format/').exists();

    if (exist) {
      return true;
    }

    var response = await api.Api.download(
        "/downloadModel", {"idProject": "$idProject", "format": "$format"});

    var file = File('$appDocPath/$idProject-$format.zip');
    var zippedFile = await file.writeAsBytes(response);
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

    return true;
  } catch (error) {
    return false;
  }
}
