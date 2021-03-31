import 'package:dio/dio.dart';
import 'package:contify/core/values/environments.dart';

class AuthRepository {
  final dio = Dio();

  Future<dynamic> login(String email, String password) async {
    try {
      Map<String, String> session = {'email': email, 'password': password};
      Response response = await dio.post(BASE_URL + '/auth', data: session);

      print(response);
      return response.data;
    } on DioError catch (e) {
      throw (e.message);
    }
  }

  Future<dynamic> register(String email, String password, String userName) async {
    try {
      Map<String, String> newUser = {'name': userName, 'email': email, 'password': password};
      Response response = await dio.post(BASE_URL + '/users', data: newUser);

      print(response);

    } on DioError catch (e) {
      throw (e.message);
    }
  }
}
