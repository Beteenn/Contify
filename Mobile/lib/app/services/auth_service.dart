import 'package:contify/app/interceptors/custom_dio.dart';
import 'package:dio/dio.dart';
import 'package:contify/core/values/environments.dart';
import 'package:mobx/mobx.dart';

class AuthService {
  final dio = CustomDio();

  @observable
  Map _currentUser;

  @observable
  String _currentToken;

  Future<dynamic> login(String email, String password) async {
    try {
      Map<String, String> session = {'email': email, 'password': password};
      Response response = await dio.post(BASE_URL + '/auth', data: session);
      _currentUser = response.data['user'];
      _currentToken = response.data['token'];

      return response.data;
    } on DioError catch (e) {
      throw (e.message);
    }
  }

  Future<dynamic> register(String email, String password, String userName) async {
    try {
      Map<String, String> newUser = {'name': userName, 'email': email, 'password': password};
      Response response = await dio.post(BASE_URL + '/users', data: newUser);

      return response.data;

    } on DioError catch (e) {
      throw (e.message);
    }
  }

  Map<String, dynamic> get getCurrentUser {
    return _currentUser;
  }

  String get getCurrentToken {
    return _currentToken;
  }
}
