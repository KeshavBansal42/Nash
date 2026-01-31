import 'package:app/config/theme.dart';
import 'package:app/extensions/number.dart';
import 'package:flutter/material.dart';

class GroupBetDetailsCard extends StatelessWidget {
  final Map<String, dynamic> data;
  const GroupBetDetailsCard({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "\$${(data["total_pot"] as num).formatWithCommas()}",
              style: TextStyle(
                fontSize: 30,
                color: context.colorScheme.secondary,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              "EXPECTED PAYOUT: \$${data['my_bet']['expected_payout']}",
              style: TextStyle(
                fontSize: 14,
                color: context.colorScheme.onSurfaceVariant,
              ),
            ),
            Text(
              "BET PLACED: \$${data['my_bet']['amount']}",
              style: TextStyle(
                fontSize: 14,
                color: context.colorScheme.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              data['title'].toString(),
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: context.colorScheme.onSurface,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
