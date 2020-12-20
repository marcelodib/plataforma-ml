import 'dart:typed_data';

import 'package:http/http.dart' as http;

import 'dart:async';
import 'dart:convert';

String mainUrl = "http://192.168.1.100:3000";

Map<String, String> headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};

Map<String, String> error = {
  "status": "error",
  "msg": "Ocorreu um erro, tente novamente mais tarde."
};

class Api {
  static Future<Map> get(String route) async {
    http.Response response = await http.get(mainUrl + route, headers: headers);

    if (response.statusCode != 200) {
      return error;
    }

    updateCookie(response);
    return json.decode(response.body);
  }

  static Future<Map> post(String route, dynamic data) async {
    http.Response response =
        await http.post(mainUrl + route, body: data, headers: headers);
    if (response.statusCode != 200) {
      return error;
    }

    updateCookie(response);
    return json.decode(response.body);
  }

  static Future<Uint8List> download(String route, dynamic data) async {
    String url =
        "${mainUrl}${route}?idProject=${data["idProject"]}&format=${data["format"]}";
    http.Response response = await http.get(url, headers: headers);

    if (response.statusCode != 200) {
      return null;
    }

    updateCookie(response);
    return response.bodyBytes;
  }

  static void updateCookie(http.Response response) {
    String rawCookie = response.headers['set-cookie'];
    if (rawCookie != null) {
      int index = rawCookie.indexOf(';');
      headers['cookie'] =
          (index == -1) ? rawCookie : rawCookie.substring(0, index);
    }
  }
}
