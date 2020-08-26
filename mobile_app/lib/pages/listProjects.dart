import 'package:flutter/material.dart';
import 'package:plataforma_ml/pages/project.dart';
import 'package:plataforma_ml/utils/colors.dart';
import 'package:plataforma_ml/widgets/customCard.dart';

class ListProjectsPage extends StatefulWidget {
  @override
  _ListProjectsPageState createState() => _ListProjectsPageState();
}

class _ListProjectsPageState extends State<ListProjectsPage> {
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
                          // Navigator.pop(context);
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
              SizedBox(height: MediaQuery.of(context).size.height / 6.5),
              CircularProgress(),
              SizedBox(
                height: 21,
              ),
              Expanded(
                  child: ListView(
                children: [
                  GestureDetector(
                    onTap: () => Navigator.push(context,
                        MaterialPageRoute(builder: (context) => ProjectPage())),
                    child: CustomCard(
                      title: "Projeto 1",
                      description: "Placa",
                      icon: Icons.bubble_chart,
                    ),
                  ),
                  GestureDetector(
                    child: CustomCard(
                      title: "Projeto 2",
                      description: "Carro",
                      icon: Icons.bubble_chart,
                    ),
                  ),
                  GestureDetector(
                    child: CustomCard(
                      title: "Projeto 3",
                      description: "Gato",
                      icon: Icons.bubble_chart,
                    ),
                  ),
                  GestureDetector(
                    child: CustomCard(
                      title: "Projeto 3",
                      description: "Gato",
                      icon: Icons.bubble_chart,
                    ),
                  ),
                  GestureDetector(
                    child: CustomCard(
                      title: "Projeto 3",
                      description: "Gato",
                      icon: Icons.bubble_chart,
                    ),
                  ),
                  GestureDetector(
                    child: CustomCard(
                      title: "Projeto 3",
                      description: "Gato",
                      icon: Icons.bubble_chart,
                    ),
                  ),
                  GestureDetector(
                    child: CustomCard(
                      title: "Projeto 3",
                      description: "Gato",
                      icon: Icons.bubble_chart,
                    ),
                  ),
                ],
              ))
            ],
          ),
        ],
      ),
    );
  }
}

class Test extends StatefulWidget {
  @override
  _TestState createState() => _TestState();
}

class _TestState extends State<Test> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryOrange,
      body: Column(
        children: [
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
                  // topLeft: Radius.circular(30),
                  topRight: Radius.circular(35),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
