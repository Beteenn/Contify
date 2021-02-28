import 'package:contify/core/values/color.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      body: LoginCard(),
    );
  }
}

class LoginCard extends StatefulWidget {
  @override
  _LoginCardState createState() => _LoginCardState();
}

class _LoginCardState extends State<LoginCard> {
  bool isHidden = true;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24),
              child: Card(
                elevation: 5,
                color: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(32),
                ),
                child: Padding(
                  padding: EdgeInsets.all(24),
                  child: Column(
                    children: [
                      Image.asset('assets/images/contify_logo_verde.png'),
                      SizedBox(height: 15),
                      Divider(color: Colors.black),
                      SizedBox(height: 30),
                      TextField(
                        keyboardType: TextInputType.emailAddress,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.alternate_email),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32),
                          ),
                          labelText: 'Digite seu e-mail*',
                        ),
                      ),
                      SizedBox(height: 24),
                      TextField(
                        obscureText: isHidden,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.lock),
                          suffixIcon: FlatButton(
                              child: Icon(Icons.visibility),
                              onPressed: () {
                                setState(() {
                                  isHidden = !isHidden;
                                });
                              }),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32),
                          ),
                          labelText: 'Digite sua senha*',
                        ),
                      ),
                      SizedBox(height: 24),
                      RaisedButton(
                        onPressed: () {},
                        color: primaryColor,
                        textColor: Colors.white,
                        elevation: 5,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                        child: Text('Entrar'),
                      ),
                      FlatButton(
                        onPressed: () {},
                        child: Text(
                          'Não possui cadastro? Cadastre-se!',
                          style: TextStyle(color: primaryColor, decoration: TextDecoration.underline),
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
