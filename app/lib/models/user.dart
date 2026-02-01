class User {
  final String id;
  final String username;
  final String email;
  final String? referralCode;
  int? balance;

  User({
    required this.id,
    required this.username,
    required this.email,
    this.balance,
    this.referralCode,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json['id'],
    username: json['username'],
    email: json['email'],
    balance: json['wallet_balance'] != null
        ? int.parse(json['wallet_balance'])
        : null,
    referralCode: json['referral_code'],
  );

  User copyWith({String? username, String? email, int? balance}) {
    return User(
      id: id,
      username: username ?? this.username,
      email: email ?? this.email,
      balance: balance ?? this.balance,
    );
  }
}
