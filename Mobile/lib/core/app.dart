import 'package:contify/core/values/color.dart';
import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primaryColor: primaryColor,
          backgroundColor: Colors.white,
          // fontFamily: 'MavenPro',
          primarySwatch: Colors.green,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: Container(
          child: Text(
            "Teste de texto",
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
    );
  }
}