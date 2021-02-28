import 'package:contify/core/values/color.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      body: RegisterCard(),
    );
  }
}

class RegisterCard extends StatefulWidget {
  @override
  _RegisterCardState createState() => _RegisterCardState();
}

class _RegisterCardState extends State<RegisterCard> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 20),
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
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.person),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32),
                          ),
                          labelText: 'Insira um nome de usuario*',
                        ),
                      ),
                      SizedBox(height: 30),
                      TextField(
                        keyboardType: TextInputType.emailAddress,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.alternate_email),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32),
                          ),
                          labelText: 'Digite seu melhor e-mail*',
                        ),
                      ),
                      SizedBox(height: 30),
                      TextField(
                        obscureText: true,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.lock),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32),
                          ),
                          labelText: 'Insira uma senha*'
                        ),
                      ),
                      SizedBox(height: 24),
                      RaisedButton(
                        onPressed: (){},
                        color: primaryColor,
                        textColor: Colors.white,
                        elevation: 5,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                        child: Text('Cadastrar-se'),
                      ),
                      FlatButton(onPressed: () {},
                          child: Text(
                            'Já possui conta? Faça login!',
                            style: TextStyle(color: primaryColor, decoration: TextDecoration.underline),
                          ),
                      ),
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