import 'dart:math';

import 'package:app/config/theme.dart';
import 'package:app/pages/bet/widgets/bet_trends_card.dart';
import 'package:flutter/material.dart';

import 'widgets/bet_details_card.dart';

class BetPage extends StatefulWidget {
  final String betID;

  const BetPage({super.key, required this.betID});

  @override
  State<BetPage> createState() => _BetPageState();
}

class _BetPageState extends State<BetPage> {
  int page = 0;

  @override
  Widget build(BuildContext context) {
    final Map<String, dynamic> data = {
      "totalPot": 6587.79,
      "payout": 120,
      "my_bet": {"amount": 100},
      "title": "Will Keshav bathe today?",
      "transactions": List.generate(
        20,
        (_) => <String, dynamic>{
          "user_id": "some-random-id",
          "amount": 1000,
          "placed_at": DateTime.now().subtract(
            Duration(
              days: Random().nextInt(10),
              minutes: Random().nextInt(10),
              hours: Random().nextInt(10),
              seconds: Random().nextInt(10),
            ),
          ),
        },
      ),
    };

    return Scaffold(
      appBar: AppBar(),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => page = 0),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 150),
                      padding: EdgeInsets.symmetric(vertical: 12),
                      decoration: BoxDecoration(
                        border: page == 0
                            ? Border(
                                bottom: BorderSide(
                                  color: context.colorScheme.secondary,
                                  width: 4,
                                ),
                              )
                            : null,
                      ),
                      child: Center(
                        child: Text(
                          "Details",
                          style: TextStyle(
                            color: context.colorScheme.onSurface,
                            fontSize: 18,
                            fontWeight: page == 0 ? FontWeight.bold : null,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => page = 1),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 150),
                      padding: EdgeInsets.symmetric(vertical: 12),
                      decoration: BoxDecoration(
                        border: page == 1
                            ? Border(
                                bottom: BorderSide(
                                  color: context.colorScheme.secondary,
                                  width: 4,
                                ),
                              )
                            : null,
                      ),
                      child: Center(
                        child: Text(
                          "Discussion",
                          style: TextStyle(
                            color: context.colorScheme.onSurface,
                            fontSize: 18,
                            fontWeight: page == 1 ? FontWeight.bold : null,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 24,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      BetDetailsCard(data: data),
                      const SizedBox(height: 16),
                      BetTrendsCard(data: data),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
