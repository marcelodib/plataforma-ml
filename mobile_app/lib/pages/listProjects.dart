import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:plataforma_ml/api/project.dart';
import 'package:plataforma_ml/pages/login.dart';
import 'package:plataforma_ml/pages/project.dart';
import 'package:plataforma_ml/utils/colors.dart';
import 'package:plataforma_ml/widgets/circularProgress.dart';
import 'package:plataforma_ml/widgets/customCard.dart';

class ListProjectsPage extends StatefulWidget {
  @override
  _ListProjectsPageState createState() => _ListProjectsPageState();
}

class _ListProjectsPageState extends State<ListProjectsPage> {
  List projects = [];

  @override
  initState() {
    SystemChrome.setEnabledSystemUIOverlays([]);
    super.initState();
    listProject().then((value) => {
          setState(() {
            projects = value;
          })
        });
  }

  updateListProject() async {
    List aux = await listProject();
    setState(() {
      projects = aux;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryOrange,
      floatingActionButton: FloatingActionButton(
        onPressed: () async => {await updateListProject()},
        backgroundColor: primaryOrange,
        child: Icon(
          Icons.update,
          size: 30,
        ),
      ),
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
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      IconButton(
                        icon: Icon(
                          Icons.exit_to_app,
                          color: Colors.white,
                        ),
                        onPressed: () {
                          Navigator.pushAndRemoveUntil(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => LoginPage()),
                              (route) => false);
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
                  "Meus Projetos",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 30,
                      fontWeight: FontWeight.w700),
                ),
              ),
              SizedBox(height: MediaQuery.of(context).size.height / 35),
              CircularProgress(100, [
                Image.asset("logo-orange.png"),
              ]),
              Expanded(
                  child: ListView.builder(
                itemCount: projects.length,
                itemBuilder: (context, index) {
                  return GestureDetector(
                    onTap: () => Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => ProjectPage(
                                projects[index]["idProject"],
                                projects[index]["projectName"],
                                projects[index]["className"]))),
                    child: CustomCard(
                      title: "${projects[index]["projectName"]}",
                      description: "${projects[index]["className"]}",
                      icon: Icons.bubble_chart,
                    ),
                  );
                },
              ))
            ],
          ),
        ],
      ),
    );
  }
}
