import 'package:contify/app/repository/auth_repository.dart';
import 'package:contify/app/view_model/login_view_model.dart';
import 'package:contify/core/values/color.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

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
  final LoginViewModel _loginViewModel = LoginViewModel();

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
                  child: Observer(
                    builder: (context) {
                      return Column(
                        children: [
                          Image.asset('assets/images/contify_logo_verde.png'),
                          SizedBox(height: 15),
                          Divider(color: Colors.black),
                          SizedBox(height: 30),
                          TextFormField(
                            controller: _loginViewModel.emailController,
                            onChanged: (value) { _loginViewModel.validateEmail(value); },
                            keyboardType: TextInputType.emailAddress,
                            decoration: InputDecoration(
                              errorText: _loginViewModel.emailError,
                              prefixIcon: Icon(Icons.alternate_email),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32),
                              ),
                              labelText: 'Digite seu e-mail*',
                            ),
                          ),
                          SizedBox(height: 24),
                          TextFormField(
                            controller: _loginViewModel.passwordController,
                            onChanged: (value) { _loginViewModel.validatePassword(value); },
                            obscureText: _loginViewModel.isHidden,
                            decoration: InputDecoration(
                              errorText: _loginViewModel.passwordError,
                              prefixIcon: Icon(Icons.lock),
                              suffixIcon: FlatButton(
                                  child: _loginViewModel.isHidden ? Icon(Icons.visibility_off): Icon(Icons.visibility),
                                  onPressed: () { _loginViewModel.changeHidden(); }
                                ),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32),
                              ),
                              labelText: 'Digite sua senha*',
                            ),
                          ),
                          SizedBox(height: 24),
                          RaisedButton(
                            onPressed: _loginViewModel.isValid ? () { _loginViewModel.login(); }: null,
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
