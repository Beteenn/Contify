// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'register_view_model.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$RegisterViewModel on RegisterViewModelBase, Store {
  Computed<bool> _$isValidComputed;

  @override
  bool get isValid => (_$isValidComputed ??= Computed<bool>(() => super.isValid,
          name: 'RegisterViewModelBase.isValid'))
      .value;

  final _$nameIsValidAtom = Atom(name: 'RegisterViewModelBase.nameIsValid');

  @override
  bool get nameIsValid {
    _$nameIsValidAtom.reportRead();
    return super.nameIsValid;
  }

  @override
  set nameIsValid(bool value) {
    _$nameIsValidAtom.reportWrite(value, super.nameIsValid, () {
      super.nameIsValid = value;
    });
  }

  final _$emailIsValidAtom = Atom(name: 'RegisterViewModelBase.emailIsValid');

  @override
  bool get emailIsValid {
    _$emailIsValidAtom.reportRead();
    return super.emailIsValid;
  }

  @override
  set emailIsValid(bool value) {
    _$emailIsValidAtom.reportWrite(value, super.emailIsValid, () {
      super.emailIsValid = value;
    });
  }

  final _$passwordIsValidAtom =
      Atom(name: 'RegisterViewModelBase.passwordIsValid');

  @override
  bool get passwordIsValid {
    _$passwordIsValidAtom.reportRead();
    return super.passwordIsValid;
  }

  @override
  set passwordIsValid(bool value) {
    _$passwordIsValidAtom.reportWrite(value, super.passwordIsValid, () {
      super.passwordIsValid = value;
    });
  }

  final _$confirmPassIsValidAtom =
      Atom(name: 'RegisterViewModelBase.confirmPassIsValid');

  @override
  bool get confirmPassIsValid {
    _$confirmPassIsValidAtom.reportRead();
    return super.confirmPassIsValid;
  }

  @override
  set confirmPassIsValid(bool value) {
    _$confirmPassIsValidAtom.reportWrite(value, super.confirmPassIsValid, () {
      super.confirmPassIsValid = value;
    });
  }

  final _$nameAtom = Atom(name: 'RegisterViewModelBase.name');

  @override
  String get name {
    _$nameAtom.reportRead();
    return super.name;
  }

  @override
  set name(String value) {
    _$nameAtom.reportWrite(value, super.name, () {
      super.name = value;
    });
  }

  final _$nameErrorAtom = Atom(name: 'RegisterViewModelBase.nameError');

  @override
  String get nameError {
    _$nameErrorAtom.reportRead();
    return super.nameError;
  }

  @override
  set nameError(String value) {
    _$nameErrorAtom.reportWrite(value, super.nameError, () {
      super.nameError = value;
    });
  }

  final _$emailAtom = Atom(name: 'RegisterViewModelBase.email');

  @override
  String get email {
    _$emailAtom.reportRead();
    return super.email;
  }

  @override
  set email(String value) {
    _$emailAtom.reportWrite(value, super.email, () {
      super.email = value;
    });
  }

  final _$emailErrorAtom = Atom(name: 'RegisterViewModelBase.emailError');

  @override
  String get emailError {
    _$emailErrorAtom.reportRead();
    return super.emailError;
  }

  @override
  set emailError(String value) {
    _$emailErrorAtom.reportWrite(value, super.emailError, () {
      super.emailError = value;
    });
  }

  final _$passwordAtom = Atom(name: 'RegisterViewModelBase.password');

  @override
  String get password {
    _$passwordAtom.reportRead();
    return super.password;
  }

  @override
  set password(String value) {
    _$passwordAtom.reportWrite(value, super.password, () {
      super.password = value;
    });
  }

  final _$passwordErrorAtom = Atom(name: 'RegisterViewModelBase.passwordError');

  @override
  String get passwordError {
    _$passwordErrorAtom.reportRead();
    return super.passwordError;
  }

  @override
  set passwordError(String value) {
    _$passwordErrorAtom.reportWrite(value, super.passwordError, () {
      super.passwordError = value;
    });
  }

  final _$confirmPassAtom = Atom(name: 'RegisterViewModelBase.confirmPass');

  @override
  String get confirmPass {
    _$confirmPassAtom.reportRead();
    return super.confirmPass;
  }

  @override
  set confirmPass(String value) {
    _$confirmPassAtom.reportWrite(value, super.confirmPass, () {
      super.confirmPass = value;
    });
  }

  final _$confirmPassErrorAtom =
      Atom(name: 'RegisterViewModelBase.confirmPassError');

  @override
  String get confirmPassError {
    _$confirmPassErrorAtom.reportRead();
    return super.confirmPassError;
  }

  @override
  set confirmPassError(String value) {
    _$confirmPassErrorAtom.reportWrite(value, super.confirmPassError, () {
      super.confirmPassError = value;
    });
  }

  final _$RegisterViewModelBaseActionController =
      ActionController(name: 'RegisterViewModelBase');

  @override
  void validateName(String value) {
    final _$actionInfo = _$RegisterViewModelBaseActionController.startAction(
        name: 'RegisterViewModelBase.validateName');
    try {
      return super.validateName(value);
    } finally {
      _$RegisterViewModelBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  void validateEmail(String value) {
    final _$actionInfo = _$RegisterViewModelBaseActionController.startAction(
        name: 'RegisterViewModelBase.validateEmail');
    try {
      return super.validateEmail(value);
    } finally {
      _$RegisterViewModelBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  void validatePassword(String value) {
    final _$actionInfo = _$RegisterViewModelBaseActionController.startAction(
        name: 'RegisterViewModelBase.validatePassword');
    try {
      return super.validatePassword(value);
    } finally {
      _$RegisterViewModelBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  void validateConfirmPassword(String value) {
    final _$actionInfo = _$RegisterViewModelBaseActionController.startAction(
        name: 'RegisterViewModelBase.validateConfirmPassword');
    try {
      return super.validateConfirmPassword(value);
    } finally {
      _$RegisterViewModelBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
nameIsValid: ${nameIsValid},
emailIsValid: ${emailIsValid},
passwordIsValid: ${passwordIsValid},
confirmPassIsValid: ${confirmPassIsValid},
name: ${name},
nameError: ${nameError},
email: ${email},
emailError: ${emailError},
password: ${password},
passwordError: ${passwordError},
confirmPass: ${confirmPass},
confirmPassError: ${confirmPassError},
isValid: ${isValid}
    ''';
  }
}
