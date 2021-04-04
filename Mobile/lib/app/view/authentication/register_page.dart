import 'package:contify/app/utils/shared/widgets/primary_button.dart';
import 'package:contify/app/utils/shared/widgets/text_field.dart';
import 'package:contify/app/view/authentication/widgets/link_button.dart';
import 'package:contify/app/view_model/register_view_model.dart';
import 'package:contify/core/values/color.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

import 'login_page.dart';

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
                          labelText: 'Insira um nome de usuario*',
                          icon: Icons.account_box,
                          errorText: _registerViewModel.nameError,
                          controller: _registerViewModel.nameController,
                          onChanged: (value) =>
                              _registerViewModel.validateName(value),
                        ),
                        SizedBox(height: 24),
                        AppTextInput(
                          labelText: 'Digite seu melhor e-mail*',
                          icon: Icons.email,
                          controller: _registerViewModel.emailController,
                          onChanged: (value) =>
                              _registerViewModel.validateEmail(value),
                          keyboardType: TextInputType.emailAddress,
                          errorText: _registerViewModel.emailError,
                        ),
                        SizedBox(height: 24),
                        AppTextInput(
                          labelText: 'Insira uma senha*',
                          controller: _registerViewModel.passwordController,
                          onChanged: (value) =>
                              _registerViewModel.validatePassword(value),
                          obscureText: _registerViewModel.passIsHidden,
                          errorText: _registerViewModel.passwordError,
                          icon: Icons.lock,
                          suffixIcon: FlatButton(
                            child: _registerViewModel.passIsHidden
                                ? Icon(Icons.visibility_off)
                                : Icon(Icons.visibility),
                            onPressed: () =>_registerViewModel.changePassHidden(),
                          ),
                        ),
                        SizedBox(height: 24),
                        AppTextInput(
                          labelText: 'Confirme sua senha*',
                          controller:
                              _registerViewModel.confirmPasswordController,
                          onChanged: (value) =>
                              _registerViewModel.validateConfirmPassword(value),
                          obscureText: _registerViewModel.confirmPassIsHidden,
                          errorText: _registerViewModel.confirmPassError,
                          icon: Icons.lock,
                          suffixIcon: FlatButton(
                            child: _registerViewModel.confirmPassIsHidden
                                ? Icon(Icons.visibility_off)
                                : Icon(Icons.visibility),
                            onPressed: () =>_registerViewModel.changeConfirmPassHidden(),
                          ),
                        ),
                        SizedBox(height: 24),
                        PrimaryButton(
                          text: 'Cadastrar-se',
                          onPressed: _registerViewModel.isValid ? () => _registerViewModel.register() : null,
                        ),
                        LinkButton(
                          text: 'Já possui conta? Faça login!',
                          onPressed: () => Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => LoginPage(),
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
