import 'package:plataforma_ml/api/api.dart' as api;

Future<bool> signIn(email, password) async {
  try {
    Map response = await api.Api.post(
        "/signIn", {"userEmail": email, "userPassword": password});

    if (response["status"] == "success") {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

Future<bool> signOut(email, password) async {
  try {
    Map response = await api.Api.get("/signOut");

    if (response["status"] == "success") {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
