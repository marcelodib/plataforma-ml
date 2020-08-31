import 'package:flutter/material.dart';
import 'package:plataforma_ml/utils/colors.dart';

class CustomCard extends StatefulWidget {
  final String title;
  final String description;
  final IconData icon;

  const CustomCard({Key key, this.title, this.description, this.icon})
      : super(key: key);

  @override
  _CustomCardState createState() => _CustomCardState();
}

class _CustomCardState extends State<CustomCard> {
  Widget myCard() {
    return Container(
      height: 124.0,
      margin: const EdgeInsets.only(left: 35.0),
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            offset: Offset(1.0, 1.0),
            blurRadius: 1.0,
          )
        ],
        color: Colors.white,
        shape: BoxShape.rectangle,
        borderRadius: BorderRadius.circular(15.0),
      ),
      child: Padding(
        padding: const EdgeInsets.only(left: 30.0, top: 23.5),
        child: ListTile(
          leading: Container(
            height: 50.0,
            decoration: new BoxDecoration(
                border: new Border(
                    right: new BorderSide(width: 1.0, color: Colors.grey))),
            child: Text(""),
          ),
          title: Text(
            widget.title,
            style: TextStyle(fontSize: 20.0),
          ),
          subtitle: Text(
            widget.description,
            style: TextStyle(fontSize: 15.0),
          ),
          trailing: Icon(Icons.info),
        ),
      ),
    );
  }

  Widget myImage() {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 16.0),
      alignment: FractionalOffset.centerLeft,
      child: CircleAvatar(
        radius: 35.0,
        child: Icon(
          Icons.bubble_chart,
          color: Colors.white,
          size: 50,
        ),
        backgroundColor: primaryOrange,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 120.0,
      margin: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 24.0),
      child: Stack(
        children: <Widget>[myCard(), myImage()],
      ),
    );
  }
}
