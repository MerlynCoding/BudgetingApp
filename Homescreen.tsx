import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView , FlatList} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isBudgetButtonActive, setIsBudgetButtonActive] = useState(false);


  // Budget Data
  const [balance, setBalance] = useState(3000);
  const [transactions, setTransactions] = useState([
    { id: 1, category: "Groceries", icon: "cart-outline", amount: 50, date: "Mar 10" },
    { id: 2, category: "Rent", icon: "home-outline", amount: 1200, date: "Mar 1" },
    { id: 3, category: "Entertainment", icon: "movie-outline", amount: 100, date: "Mar 5" },
    { id: 4, category: "Shopping", icon: "shopping-outline", amount: 200, date: "Mar 12" },
  ]);

  // Spending Categories
  const categories = [
    { title: "Groceries", width: "30%" },
    { title: "Restaurants", width: "90%" },
    { title: "Shopping", width: "40%" },
    { title: "Bills", width: "40%" },
    { title: "Transportation", width: "90%" },
  ];

  // Bills Data
  const [bills, setBills] = useState([
    { id: 1, date: "Mar 5", name: "Phone bill", amount: 80, paid: false },
    { id: 2, date: "Mar 10", name: "Rent", amount: 1500, paid: false },
  ]);

  // Mark Bills as Paid
  const markAsPaid = (id) => {
    setBills(bills.map((bill) => (bill.id === id ? { ...bill, paid: true } : bill)));
  };

  // Calculate total spending
  const totalSpent = transactions.reduce((sum, item) => sum + item.amount, 0);
  const remainingBalance = balance - totalSpent;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{ flex: 1, padding: 16 }}>
          {/* Header */}
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>January 2023</Text>

          {/* Balance Overview */}
          {/* Balance and Budgeted Funds */}
          <View style={{ marginVertical: 10 }}>
            {/* Total Balance */}
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.balanceLabel}>Total balance</Text>
                <Text style={styles.balanceSubText}>$3,000.00</Text>
              </View>
              <Text style={styles.balanceAmount}>$3000</Text>
            </View>

            {/* Budgeted Funds */}
            <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.balanceLabel}>Budgeted funds</Text>
              <Text style={styles.balanceSubText}>$3,000.00</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
                style={[
                  styles.budgetButton,
                  isBudgetButtonActive && { backgroundColor: "#19e619" }, // Turns green when active
                ]}
                onPress={() => {
                  setIsBudgetButtonActive(true);
                  navigation.navigate("BudgetsScreen");
                }}
              >
                <MaterialCommunityIcons name="plus" size={24} color={isBudgetButtonActive ? "white" : "#111811"} />
              </TouchableOpacity>
              <Text style={styles.balanceAmount}>$3000</Text>
              
              </View>
            </View>
          </View>


          {/* Spending by Category */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Spending by Category</Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginVertical: 5 }}>${totalSpent}</Text>
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

          /* Need to Pay Section */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Upcoming Bills</Text>
            {bills.map((bill) => (
              <View key={bill.id} style={styles.billCard}>
                <View>
                  <Text style={styles.billLabel}>{bill.date} - {bill.name}</Text>
                  <Text style={styles.billAmount}>${bill.amount}</Text>
                </View>
                <TouchableOpacity style={styles.paidButton} onPress={() => markAsPaid(bill.id)}>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    {bill.paid ? "Paid" : "Mark as Paid"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Transactions List */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Recent Transactions</Text>
          {transactions.length === 0 ? (
            <Text style={{ fontSize: 16, textAlign: "center", marginVertical: 20 }}>No transactions yet</Text>
          ) : (
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.transactionItem}>
                  <MaterialCommunityIcons name={item.icon} size={28} color="#638863" />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.category}</Text>
                    <Text style={{ fontSize: 14, color: "#888" }}>{item.date}</Text>
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "#d32f2f" }}>-${item.amount}</Text>
                </View>
              )}
            />
          )}
        </ScrollView>

        

        {/* Add Transaction Button */}
        <View style={{ padding: 16 }}>
          <TouchableOpacity style={styles.addTransactionButton} onPress={() => navigation.navigate("AddTransaction")}>
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
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111811",
  },
  balanceSubText: {
    fontSize: 14,
    color: "#638863",
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111811",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    color: "#638863",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
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
