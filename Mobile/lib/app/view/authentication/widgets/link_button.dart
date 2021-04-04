import 'package:contify/core/values/color.dart';
import 'package:flutter/material.dart';

class LinkButton extends StatelessWidget {
  final String text;
  final Function() onPressed;

  const LinkButton({
    @required this.text,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return FlatButton(
      onPressed: this.onPressed,
      child: Text(this.text,
        style: TextStyle(
            color: primaryColor,
            decoration: TextDecoration.underline
        ),
      ),
    );
  }
}