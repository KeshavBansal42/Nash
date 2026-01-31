import 'package:flutter/material.dart';

import '/config/theme.dart';
import '/widgets/transaction_history_modal.dart';
import '/widgets/transaction_tile.dart';

class TransactionHistorySection extends StatelessWidget {
  const TransactionHistorySection({super.key, required this.data});

  final Map<String, dynamic> data;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Recent Bets",
          style: TextStyle(
            fontSize: 20,
            color: context.colorScheme.onSurface,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ...List.generate(data["transactions"].length.clamp(0, 5), (
                  index,
                ) {
                  final Map<String, dynamic> transaction =
                      data["transactions"][index];

                  return TransactionTile(
                    transaction: transaction,
                    showBorder: index < 4,
                  );
                }),
                const SizedBox(height: 12),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: ElevatedButton(
                    onPressed: () {
                      showModalBottomSheet(
                        context: context,
                        isScrollControlled: true,
                        builder: (BuildContext context) {
                          return DraggableScrollableSheet(
                            initialChildSize: 0.5,
                            minChildSize: 0.25,
                            maxChildSize: 0.95,
                            expand: false,
                            builder:
                                (
                                  BuildContext context,
                                  ScrollController scrollController,
                                ) => TransactionHistoryModal(
                                  heading: "Transaction History",
                                  controller: scrollController,
                                  transactions: data["transactions"],
                                ),
                          );
                        },
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(double.infinity, 50.0),
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      backgroundColor: context.colorScheme.primary,
                      foregroundColor: context.colorScheme.onPrimary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                    ),
                    child: Text("See More >"),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
