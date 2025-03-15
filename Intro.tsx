import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const categories = [
  {
    title: "Food & Groceries",
    budget: "$500",
    period: "for a month",
    image: "https://cdn.usegalileo.ai/sdxl10/6900b4b1-4241-4e3b-9a7a-b886741612ae.png",
  },
  {
    title: "Rent",
    budget: "$1,200",
    period: "for a month",
    image: "https://cdn.usegalileo.ai/sdxl10/40a0bb0a-a644-4382-9e2d-cde6416d20f9.png",
  },
  {
    title: "Entertainment",
    budget: "$200",
    period: "for a month",
    image: "https://cdn.usegalileo.ai/sdxl10/b63b66e6-3bad-40f1-aa4b-f80ce4717710.png",
  },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>Welcome to the new budgeting app</Text>
          <Text style={{ fontSize: 16, marginBottom: 16 }}>
            We help you organize your expenses and keep track of your spending. Start by setting up your budget.
          </Text>

          {categories.map((item, index) => (
            <View key={index} style={{ backgroundColor: "#fff", borderRadius: 10, marginBottom: 16, elevation: 2 }}>
              <ImageBackground
                source={{ uri: item.image }}
                style={{ width: "100%", height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              />
              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
                <Text style={{ fontSize: 16, color: "#4CAF50" }}>{item.budget}</Text>
                <Text style={{ fontSize: 14, color: "#4CAF50" }}>{item.period}</Text>
              </View>
            </View>
          ))}

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#E0E0E0",
                padding: 12,
                borderRadius: 8,
                marginRight: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Add another category</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#19e619",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Set a goal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: "#E0E0E0",
            backgroundColor: "white",
          }}
        >
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
