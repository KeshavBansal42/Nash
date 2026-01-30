import 'package:flutter/material.dart';

import '/config/theme.dart';

class BetTrendsCard extends StatelessWidget {
  const BetTrendsCard({super.key, required this.data});

  final Map<String, dynamic> data;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Bet Trends",
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
                color: context.colorScheme.onSurface,
              ),
            ),
            const SizedBox(height: 12),
            Card(
              color: context.colorScheme.onSurfaceVariant,
              child: Container(
                height: 200,
                alignment: Alignment.center,
                child: Text(
                  "GRAPH GOES HERE",
                  style: TextStyle(
                    fontSize: 20,
                    color: context.colorScheme.onSurface,
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
