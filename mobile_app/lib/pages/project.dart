import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:plataforma_ml/api/project.dart';
import 'package:plataforma_ml/pages/testProject.dart';
import 'package:plataforma_ml/utils/colors.dart';
import 'package:plataforma_ml/widgets/circularProgress.dart';

class ProjectPage extends StatefulWidget {
  int idProject;
  String projectName;
  String label;

  ProjectPage(this.idProject, this.projectName, this.label);

  @override
  _ProjectPageState createState() => _ProjectPageState();
}

class _ProjectPageState extends State<ProjectPage> {
  @override
  initState() {
    super.initState();
    downloadProject(widget.idProject, "tflite").then((value) => {print(value)});
  }

  List<Widget> content(int progress, String status) {
    return [
      Text(
        "Acurácia",
        style: TextStyle(
          color: Colors.grey[400],
          fontSize: 31,
          fontWeight: FontWeight.w300,
        ),
      ),
      SizedBox(height: 11),
      RichText(
        text: TextSpan(
          children: [
            TextSpan(
              text: "$progress",
              style: TextStyle(
                color: Colors.orange,
                fontSize: 61,
                fontWeight: FontWeight.bold,
              ),
            ),
            TextSpan(
              text: "%",
              style: TextStyle(
                color: Colors.grey,
                fontSize: 31,
              ),
            ),
          ],
        ),
      ),
      SizedBox(height: 11),
      Text(
        "$status",
        style: TextStyle(
          color: Colors.orange,
        ),
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryOrange,
      body: Stack(
        children: <Widget>[
          Column(
            children: <Widget>[
              Flexible(
                flex: 1,
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
                    // borderRadius: BorderRadius.only(
                    //     bottomLeft: Radius.circular(30),
                    //     bottomRight: Radius.circular(30))
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      IconButton(
                        icon: Icon(
                          Icons.arrow_back,
                          color: Colors.white,
                        ),
                        onPressed: () {
                          Navigator.pop(context);
                        },
                      ),
                    ],
                  ),
                ),
              ),
              Flexible(
                flex: 3,
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
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              SizedBox(height: MediaQuery.of(context).size.height / 12),
              Center(
                child: Text(
                  "${widget.projectName}",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 30,
                      fontWeight: FontWeight.w700),
                ),
              ),
              SizedBox(height: MediaQuery.of(context).size.height / 35),
              CircularProgress(61, content(61, "Razoável")),
              SizedBox(
                height: 21,
              ),
              ProjectDetails(widget.projectName, widget.label),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  TestProject(widget.idProject)));
                    },
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
                          'Testar'.toUpperCase(),
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  )
                ],
              )
            ],
          ),
        ],
      ),
    );
  }
}

class ProjectDetails extends StatelessWidget {
  String projectName;
  String label;

  ProjectDetails(this.projectName, this.label);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: 15,
        vertical: 11,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Stack(
            children: <Widget>[
              Container(
                margin: EdgeInsets.symmetric(vertical: 11.0),
                height: 230,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(15),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey[400],
                      blurRadius: 5.0,
                      offset: Offset(0, 2),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    ListTile(
                      title: Text("Nome: $projectName"),
                      leading:
                          Icon(Icons.bubble_chart, color: Colors.grey.shade700),
                    ),
                    ListTile(
                      title: Text("Objeto: $label"),
                      leading: Icon(Icons.label, color: Colors.grey.shade700),
                    ),
                    ListTile(
                      title: Text("Algoritmo: Single Shot Detection"),
                      leading: Icon(Icons.code, color: Colors.grey.shade700),
                    ),
                    ListTile(
                      title: Text("Rede Neural: Mobile Net"),
                      leading:
                          Icon(Icons.device_hub, color: Colors.grey.shade700),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
