import 'package:contify/app/view_model/register_view_model.dart';
import 'package:contify/core/values/color.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

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
  final RegisterViewModel _registerViewModel = RegisterViewModel();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.fromLTRB(20, 20, 20, 0),
              child: Card(
                elevation: 5,
                color: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(32),
                ),
                child: Padding(
                  padding: EdgeInsets.all(24),
                  child: Observer(
                    builder: (context) {
                      return Column(
                        children: [
                          Image.asset('assets/images/contify_logo_verde.png'),
                          SizedBox(height: 15),
                          Divider(color: Colors.black),
                          SizedBox(height: 30),
                          TextField(
                            controller: _registerViewModel.nameController,
                            onChanged: (value) { _registerViewModel.validateName(value); },
                            decoration: InputDecoration(
                              errorText: _registerViewModel.nameError,
                              prefixIcon: Icon(Icons.person),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32),
                              ),
                              labelText: 'Insira um nome de usuario*',
                            ),
                          ),
                          SizedBox(height: 30),
                          TextField(
                            controller: _registerViewModel.emailController,
                            onChanged: (value) { _registerViewModel.validateEmail(value); },
                            keyboardType: TextInputType.emailAddress,
                            decoration: InputDecoration(
                              errorText: _registerViewModel.emailError,
                              prefixIcon: Icon(Icons.alternate_email),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32),
                              ),
                              labelText: 'Digite seu melhor e-mail*',
                            ),
                          ),
                          SizedBox(height: 30),
                          TextField(
                            controller: _registerViewModel.passwordController,
                            onChanged: (value) { _registerViewModel.validatePassword(value); },
                            obscureText: true,
                            decoration: InputDecoration(
                              errorText: _registerViewModel.passwordError,
                              prefixIcon: Icon(Icons.lock),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32),
                              ),
                              labelText: 'Insira uma senha*'
                            ),
                          ),
                          SizedBox(height: 30),
                          TextField(
                            controller: _registerViewModel.confirmPasswordController,
                            onChanged: (value) { _registerViewModel.validateConfirmPassword(value); },
                            obscureText: true,
                            decoration: InputDecoration(
                              errorText: _registerViewModel.confirmPassError,
                              prefixIcon: Icon(Icons.lock),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32),
                              ),
                              labelText: 'Confirme sua senha*'
                            ),
                          ),
                          SizedBox(height: 24),
                          RaisedButton(
                            onPressed: _registerViewModel.isValid ? () { _registerViewModel.register(); }: null,
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
                      );
                    }
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