import 'package:contify/app/utils/shared/widgets/primary_button.dart';
import 'package:contify/app/utils/shared/widgets/text_field.dart';
import 'package:contify/app/view/authentication/register_page.dart';
import 'package:contify/app/view/authentication/widgets/link_button.dart';
import 'package:contify/app/view_model/login_view_model.dart';
import 'package:contify/core/values/color.dart';
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
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Padding(
                  padding: EdgeInsets.all(24),
                  child: Observer(builder: (context) {
                    return Column(
                      children: [
                        Image.asset('assets/images/contify_logo_verde.png'),
                        SizedBox(height: 24),
                        Divider(color: Colors.grey),
                        SizedBox(height: 24),
                        AppTextInput(
                          icon: Icons.email,
                          labelText: 'Digite seu e-mail',
                          controller: _loginViewModel.emailController,
                          onChanged: (value) => _loginViewModel.validateEmail(value),
                          errorText: _loginViewModel.emailError,
                        ),
                        SizedBox(height: 24),
                        AppTextInput(
                          icon: Icons.lock,
                          labelText: 'Digite sua senha*',
                          controller: _loginViewModel.passwordController,
                          obscureText: _loginViewModel.isHidden,
                          onChanged: (value) {
                            _loginViewModel.validatePassword(value);
                          },
                          errorText: _loginViewModel.passwordError,
                          suffixIcon: FlatButton(
                            child: _loginViewModel.isHidden
                                ? Icon(Icons.visibility_off)
                                : Icon(Icons.visibility),
                            onPressed: () =>_loginViewModel.changeHidden(),
                          ),
                        ),
                        SizedBox(height: 24),
                        PrimaryButton(
                            text: 'Entrar',
                            onPressed: _loginViewModel.isValid
                                ? () => _loginViewModel.login()
                                : null),
                        LinkButton(
                          text: 'Não possui conta? Cadastre-se!',
                          onPressed: () => Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => RegisterPage(),
                            ),
                          ),
                        ),
                      ],
                    );
                  }),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
