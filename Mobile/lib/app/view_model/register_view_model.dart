import 'package:contify/app/repository/auth_repository.dart';
import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';

part 'register_view_model.g.dart';

class RegisterViewModel = RegisterViewModelBase with _$RegisterViewModel;

abstract class RegisterViewModelBase with Store {
  final _authRepository = AuthRepository();

  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  @observable
  bool nameIsValid = false;

  @observable
  bool emailIsValid = false;

  @observable
  bool passwordIsValid = false;

  @observable
  bool confirmPassIsValid = false;

  @observable
  String name;

  @observable
  String nameError;

  @observable
  String email;

  @observable
  String emailError;

  @observable
  String password;

  @observable
  String passwordError;

  @observable
  String confirmPass;

  @observable
  String confirmPassError;

  @computed
  bool get isValid => nameIsValid && emailIsValid && passwordIsValid && confirmPassIsValid;

  @action
  void validateName(String value) {
    name = value;

    if ((name.isEmpty) || (name.contains('@'))) {
      nameError = 'Nome inválido';
      nameIsValid = false;
      return;
    }

    nameError = null;
    nameIsValid = true;

    print(nameIsValid);
  }

  @observable
  bool passIsHidden = true;

  @action
  void changePassHidden() {
    passIsHidden = !passIsHidden;
  }

  @observable
  bool confirmPassIsHidden = true;

  @action
  void changeConfirmPassHidden() {
    confirmPassIsHidden = !confirmPassIsHidden;
  }

  @action
  void validateEmail(String value) {
    email = value;

    bool emailValid = RegExp(r'^.+@[a-zA-Z]+\.{1}[a-zA-Z]+(\.{0,1}[a-zA-Z]+)$').hasMatch(email);

    if (email.isEmpty || !emailValid) {
      emailError = 'Entre com um e-mail válido';
      emailIsValid = false;
      return;
    }

    emailError = null;
    emailIsValid = true;

    print(emailIsValid);
  }

  @action
  void validatePassword(String value) {
    password = value;

    if ((password.isEmpty) || (password.length < 6)) {
      passwordError = 'Entre com uma senha válida!';
      passwordIsValid = false;
      return;
    }

    passwordError = null;
    passwordIsValid = true;

    print(passwordIsValid);
  }

  @action
  void validateConfirmPassword(String value) {
    confirmPass = value;

    if ((confirmPass.isEmpty) || (confirmPass.length < 6) || (confirmPass != password)) {
      confirmPassError = 'Entre com uma senha válida!';
      confirmPassIsValid = false;
      return;
    }

    confirmPassError = null;
    confirmPassIsValid = true;
    print(confirmPassIsValid);
  }

  Future<dynamic> register() async {
    await _authRepository
        .register(email, password, name)
        .then((value) => _authRepository.login(email, password), onError: (e) => throw (e));
  }
}
