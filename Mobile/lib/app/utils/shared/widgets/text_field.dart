import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AppTextInput extends StatelessWidget {
  final String labelText;
  final String errorText;
  final IconData icon;
  final FlatButton suffixIcon;
  final bool obscureText;
  final TextEditingController controller;
  final Function(String) onChanged;
  final List<TextInputFormatter> inputFormatters;
  final TextInputAction inputAction;
  final TextInputType keyboardType;

  const AppTextInput({
    @required this.labelText,
    this.errorText,
    this.inputAction,
    @required this.icon,
    this.suffixIcon,
    this.obscureText = false,
    this.controller,
    this.onChanged,
    this.inputFormatters,
    this.keyboardType,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      decoration: InputDecoration(
        prefixIcon: Icon(this.icon),
        suffixIcon: this.suffixIcon,
        floatingLabelBehavior: FloatingLabelBehavior.never,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        labelText: this.labelText,
        errorText: this.errorText,
      ),
      obscureText: this.obscureText,
      controller: this.controller,
      onChanged: this.onChanged,
      inputFormatters: this.inputFormatters,
      textInputAction: this.inputAction,
      keyboardType: this.keyboardType,
    );
  }
}