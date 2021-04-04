import 'package:contify/app/services/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';

part 'login_view_model.g.dart';

class LoginViewModel = LoginViewModelBase with _$LoginViewModel;

abstract class LoginViewModelBase with Store {
  final _authService = AuthService();

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @observable
  String email;

  @observable
  String emailError;

  @action
  void validateEmail(String value) {
    email = value;

    bool emailValid = RegExp(r'^.+@[a-zA-Z]+\.{1}[a-zA-Z]+(\.{0,1}[a-zA-Z]+)$').hasMatch(email);

    if ((email.isEmpty) || (!emailValid)) {
      emailError = 'Entre com um e-mail válido!';
      return;
    }

    emailError = null;

  }

  @observable
  String password;

  @observable
  String passwordError;

  @action
  void validatePassword(String value) {
    password = value;

    if ((password.isEmpty) || (password.length < 6)) {
      passwordError = 'Entre com uma senha válida!';
      return;
    }

    passwordError = null;
  }

  @observable
  bool isHidden = true;

  @action
  void changeHidden() {
    isHidden = !isHidden;
  }

  @computed
  bool get isValid =>
      (email != null && email.isNotEmpty) &&
      (emailError == null) &&
      (password != null && password.isNotEmpty) &&
      (passwordError == null);

  Future<dynamic> login() async {
    await _authService.login(email, password);
  }

}
