import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../../core/values/color.dart';

class NewMoviment extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: MovimentCard(),
    );
  }
}

class MovimentCard extends StatefulWidget {
  @override
  _MovimentCardState createState() => _MovimentCardState();
}

class _MovimentCardState extends State<MovimentCard> {
  bool paid = true;
  String opt = 'Categoria';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: 32),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 56),
              child: Card(
                elevation: 5,
                color: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(40),
                ),
                child: Padding(
                  padding: EdgeInsets.all(12),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Icon(Icons.trending_up, size: 56, color: primaryColor),
                      Text(
                        'Nova Entrada',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 24),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(height: 32),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 8),
              child: Padding(
                padding: EdgeInsets.all(32),
                child: Column(
                  children: <Widget>[
                    AppTextInput(
                        labelText: 'Adicione um nome', icon: Icons.edit
                    ),
                    SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('O valor já foi recebido?'),
                        Switch(
                          value: paid,
                          onChanged: (bool newValue) {
                            setState(() {
                              paid = newValue;
                            });
                          },
                        ),
                      ],
                    ),
                    SizedBox(height: 12),
                    ListTile(
                      title: Text('Categoria'),
                      leading: Icon(Icons.turned_in),

                      trailing: Icon(Icons.keyboard_arrow_right),
                    ),
                    SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        FlatButton(
                          onPressed: () {},
                          child: Text(
                            'Cancelar',
                            style: TextStyle(color: Colors.black),
                          ),
                        ),
                        RaisedButton(
                          onPressed: () {},
                          color: primaryColor,
                          textColor: Colors.white,
                          elevation: 5,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8)),
                          child: Text('Criar'),
                        ),
                      ],
                    ),
                    SizedBox(height: 12),
                  ],
                ),
              ),
            ),
            SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}

class AppTextInput extends StatelessWidget {
  final String labelText;
  final String errorText;
  final IconData icon;
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
