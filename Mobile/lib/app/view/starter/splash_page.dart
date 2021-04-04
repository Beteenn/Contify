import 'package:contify/app/view/authentication/login_page.dart';
import 'package:contify/core/values/color.dart';
import 'package:flutter/material.dart';
import 'package:splashscreen/splashscreen.dart';

class SplashPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      SplashScreen(
        seconds: 3,
        navigateAfterSeconds: LoginPage(),
      ),
      Container(
        color: primaryColor,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24),
              child: Image.asset(
                'assets/images/contify_logo_branca.png',
                width: 1000,
              ),
            ),
          ],
        ),
      ),
    ]);
  }
}
