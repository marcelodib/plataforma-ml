import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:plataforma_ml/api/auth.dart';
import 'package:plataforma_ml/api/project.dart';
import 'package:plataforma_ml/pages/listProjects.dart';
import 'package:plataforma_ml/utils/colors.dart';

class LoginPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _LoginPageState();
  }
}

class _LoginPageState extends State<LoginPage> {
  TextEditingController email = TextEditingController();
  TextEditingController password = TextEditingController();
  // f45d27
  // f5851f

  @override
  void initState() {
    SystemChrome.setEnabledSystemUIOverlays([]);
    super.initState();
  }

  login() async {
    if (await signIn(email.text, password.text)) {
      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => ListProjectsPage()),
          (route) => false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomPadding: false,
      backgroundColor: primaryOrange,
      body: Stack(
        children: <Widget>[
          Column(
            children: <Widget>[
              Flexible(
                flex: 2,
                child: Container(
                  height: double.infinity,
                  padding: EdgeInsets.all(15.0),
                  alignment: Alignment.topLeft,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [secondaryOrange, primaryOrange],
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[],
                  ),
                ),
              ),
              Flexible(
                flex: 4,
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(35),
                      topRight: Radius.circular(35),
                    ),
                  ),
                ),
              ),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Center(
                child: Image(
                  image: AssetImage('logo-white-full-v.png'),
                  width: 300,
                  height: 300,
                ),
              ),
              SizedBox(
                height: 21,
              ),
              Center(
                child: Container(
                  width: MediaQuery.of(context).size.width / 1.2,
                  height: 45,
                  padding:
                      EdgeInsets.only(top: 4, left: 16, right: 16, bottom: 4),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(50)),
                      color: Colors.white,
                      boxShadow: [
                        BoxShadow(color: Colors.black12, blurRadius: 5)
                      ]),
                  child: TextField(
                    controller: email,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      icon: Icon(
                        Icons.email,
                        color: Colors.grey,
                      ),
                      hintText: 'Email',
                    ),
                  ),
                ),
              ),
              Center(
                child: Container(
                  width: MediaQuery.of(context).size.width / 1.2,
                  height: 45,
                  margin: EdgeInsets.only(top: 32),
                  padding:
                      EdgeInsets.only(top: 4, left: 16, right: 16, bottom: 4),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(50)),
                      color: Colors.white,
                      boxShadow: [
                        BoxShadow(color: Colors.black12, blurRadius: 5)
                      ]),
                  child: TextField(
                    controller: password,
                    obscureText: true,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      icon: Icon(
                        Icons.vpn_key,
                        color: Colors.grey,
                      ),
                      hintText: 'Senha',
                    ),
                  ),
                ),
              ),
              Align(
                alignment: Alignment.centerRight,
                child: Padding(
                  padding: const EdgeInsets.only(top: 16, right: 32),
                  child: Text(
                    'Modo Offline',
                    style: TextStyle(color: Colors.grey),
                  ),
                ),
              ),
              Spacer(),
              GestureDetector(
                onTap: () {
                  login();
                },
                child: Center(
                  child: Container(
                    height: 45,
                    width: MediaQuery.of(context).size.width / 1.2,
                    decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [secondaryOrange, primaryOrange],
                        ),
                        borderRadius: BorderRadius.all(Radius.circular(50))),
                    child: Center(
                      child: Text(
                        'Entrar'.toUpperCase(),
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 100,
              )
            ],
          ),
        ],
      ),
    );
  }
}
