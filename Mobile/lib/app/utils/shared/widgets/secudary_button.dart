import 'package:contify/core/values/color.dart';
import 'package:flutter/material.dart';

class SecundaryButton extends StatelessWidget {
  final String text;
  final Function() onPressed;

  const SecundaryButton({
    @required this.text,
    @required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: this.onPressed,
      color: lightGrey,
      textColor: Colors.white,
      elevation: 5,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
      child: Text(this.text),
    );
  }
}