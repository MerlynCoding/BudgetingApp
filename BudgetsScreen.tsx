import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ProgressBarAndroid } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BudgetsScreen() {
  const [spending, setSpending] = useState(3210);
  const [spendingChange, setSpendingChange] = useState("+3%");
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Entertainment", spent: 800, limit: 1000 },
    { id: 2, category: "Groceries", spent: 200, limit: 500 },
  ]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6", padding: 20 }}>
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Budgets</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#111811" />
            </TouchableOpacity>
          </View>

          {/* Section: Monthly Budgets */}
          <Text style={styles.sectionTitle}>Set monthly budgets for each category</Text>

          {/* Auto-calculate & Income Buttons */}
          <TouchableOpacity style={styles.rowButton}>
            <View>
              <Text style={styles.rowButtonTitle}>Auto-calculate limits</Text>
              <Text style={styles.rowButtonSubtitle}>Based on your income</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowButton}>
            <View>
              <Text style={styles.rowButtonTitle}>Income</Text>
              <Text style={styles.rowButtonSubtitle}>Add a new income</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          {/* Spending this Month */}
          <View style={styles.spendingContainer}>
            <Text style={styles.spendingAmount}>${spending.toLocaleString()}</Text>
            <Text style={styles.spendingChange}>Last 30 Days {spendingChange}</Text>
          </View>

          {/* Time-Based Progress Bars */}
          {["1D", "1W", "1M", "3M", "1Y"].map((time, index) => (
            <View key={index} style={styles.progressContainer}>
              <Text style={styles.progressLabel}>{time}</Text>
              <View style={styles.progressBarBackground}>
                <View style={{ ...styles.progressBarFill, width: `${(index + 1) * 20}%` }} />
              </View>
            </View>
          ))}

          {/* Budgeted Categories */}
          {budgets.map((budget) => {
            const remaining = budget.limit - budget.spent;
            return (
              <View key={budget.id} style={styles.budgetContainer}>
                <View style={styles.budgetHeader}>
                  <Text style={styles.budgetTitle}>{budget.category}</Text>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>

                {/* Budget Progress Bar */}
                <View style={styles.budgetProgressContainer}>
                  <View style={styles.progressBarBackground}>
                    <View style={{ ...styles.progressBarFill, width: `${(budget.spent / budget.limit) * 100}%`, backgroundColor: "black" }} />
                  </View>
                  <Text style={styles.budgetLimit}>${budget.limit}</Text>
                </View>

                <Text style={styles.remainingText}>${remaining} remaining</Text>
              </View>
            );
          })}

          {/* Add a Budget Button */}
          <TouchableOpacity style={styles.addBudgetButton}>
            <Text style={styles.addBudgetText}>Add a budget</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Styles
const styles = {
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  rowButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  rowButtonTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rowButtonSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  spendingContainer: {
    marginVertical: 15,
  },
  spendingAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111811",
  },
  spendingChange: {
    fontSize: 14,
    color: "#638863",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  progressLabel: {
    width: 30,
    fontSize: 14,
    fontWeight: "bold",
    color: "#638863",
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#638863",
  },
  budgetContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  budgetProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  budgetLimit: {
    marginLeft: 10,
    fontSize: 14,
    color: "#111811",
  },
  remainingText: {
    fontSize: 14,
    color: "#638863",
    marginTop: 5,
  },
  addBudgetButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addBudgetText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111811",
  },
};
