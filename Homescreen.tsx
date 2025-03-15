import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const categories = [
  { title: "Groceries", width: "30%" },
  { title: "Restaurants", width: "90%" },
  { title: "Shopping", width: "40%" },
  { title: "Bills", width: "40%" },
  { title: "Transportation", width: "90%" },
];

const initialBills = [
  { id: 1, date: "Jan 5", name: "Phone bill", amount: "$80.00", paid: false },
  { id: 2, date: "Jan 10", name: "Rent", amount: "$1,500.00", paid: false },
];

export default function App() {
  const [bills, setBills] = useState(initialBills);

  const markAsPaid = (id: number) => {
    setBills(bills.map((bill) => (bill.id === id ? { ...bill, paid: true } : bill)));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{ flex: 1, padding: 16 }}>
          {/* Header */}
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>January 2023</Text>

          {/* Balance and Budgeted Funds */}
          <View style={{ marginVertical: 10 }}>
            <View style={styles.card}>
              <Text style={styles.label}>Total Balance</Text>
              <Text style={styles.amount}>$3,000.00</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Budgeted Funds</Text>
              <Text style={styles.amount}>$3,000.00</Text>
            </View>
          </View>

          {/* Spending by Category */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Spending by Category</Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginVertical: 5 }}>$2,800</Text>
            <Text style={{ color: "#638863", marginBottom: 10 }}>This Month</Text>

            {/* Category Progress Bars */}
            {categories.map((item, index) => (
              <View key={index} style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                <Text style={{ color: "#638863", fontWeight: "bold", width: 120 }}>{item.title}</Text>
                <View style={{ flex: 1, height: 10, backgroundColor: "#f0f4f0", borderRadius: 5 }}>
                  <View style={{ width: item.width, height: "100%", backgroundColor: "#638863", borderRadius: 5 }} />
                </View>
              </View>
            ))}
          </View>

          {/* Need to Pay Section */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Need to Pay</Text>
            {bills.map((bill) => (
              <View key={bill.id} style={styles.billCard}>
                <View>
                  <Text style={styles.billLabel}>{bill.date} - {bill.name}</Text>
                  <Text style={styles.billAmount}>{bill.amount}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.paidButton, bill.paid && { backgroundColor: "#19e619" }]}
                  onPress={() => markAsPaid(bill.id)}
                  disabled={bill.paid}
                >
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>{bill.paid ? "Paid" : "Mark as Paid"}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Add Transaction Button */}
        <View style={{ padding: 16 }}>
          <TouchableOpacity style={styles.addTransactionButton}>
            <MaterialCommunityIcons name="cash" size={24} color="#111811" />
            <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 8 }}>Add Transaction</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="home" size={28} color="#111811" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="magnify" size={28} color="#638863" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="chart-bar" size={28} color="#638863" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="account" size={28} color="#638863" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = {
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    color: "#638863",
  },
  billCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
  },
  billLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  billAmount: {
    fontSize: 16,
    color: "#638863",
  },
  paidButton: {
    backgroundColor: "#f0f4f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addTransactionButton: {
    flexDirection: "row",
    backgroundColor: "#19e619",
    padding: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "white",
  },
};
