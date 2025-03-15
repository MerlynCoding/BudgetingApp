import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddTransaction() {
    const navigation = useNavigation();
    const [amount, setAmount] = useState("0.00");
    const [category, setCategory] = useState("Select a category");
    const [categoryIcon, setCategoryIcon] = useState("tag-outline");
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showIconModal, setShowIconModal] = useState(false);
    const [customCategory, setCustomCategory] = useState("");
    const [categories, setCategories] = useState(["Groceries", "Rent", "Entertainment", "Transportation", "Shopping", "Bills"]);
    const availableIcons = [
      "cart-outline", "home-outline", "movie-outline", "bus-outline", "shopping-outline", "file-document-outline",
      "credit-card-outline", "gift-outline", "cellphone", "food", "car", "airplane", "hospital-box-outline",
    ];
  
    // Function to handle Date Selection
    const onChangeDate = (event: any, selectedDate?: Date) => {
      setShowDatePicker(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    };
  
    // Function to Add a New Custom Category
    const addCustomCategory = () => {
      if (customCategory.trim() !== "" && !categories.includes(customCategory)) {
        setCategories([...categories, customCategory]);
        setCustomCategory(""); // Reset input
      }
    };
  
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6", padding: 20, justifyContent: "space-between" }}>
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Add Transaction</Text>
          <View style={{ width: 24 }} />
        </View>
  
        {/* Transaction Inputs */}
        <View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 15 }}>
          {/* Amount */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>
  
          {/* Date */}
          <TouchableOpacity style={styles.inputRow} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{date.toDateString()}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
  
          {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />}
  
          {/* Category Selection */}
          <TouchableOpacity style={styles.inputRow} onPress={() => setShowCategoryModal(true)}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{category}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
  
          {/* Icon Selection */}
          <TouchableOpacity style={styles.inputRow} onPress={() => setShowIconModal(true)}>
            <Text style={styles.label}>Category Icon</Text>
            <MaterialCommunityIcons name={categoryIcon} size={24} color="#638863" />
            <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
  
          {/* Description */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Optional"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
        </View>
  
        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>Save</Text>
        </TouchableOpacity>
  
        {/* Category Selection Modal */}
        <Modal visible={showCategoryModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Select a Category</Text>
              <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => {
                      setCategory(item);
                      setShowCategoryModal(false);
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
  
              {/* Custom Category Input */}
              <TextInput
                style={styles.input}
                placeholder="New category"
                value={customCategory}
                onChangeText={(text) => setCustomCategory(text)}
              />
              <TouchableOpacity style={styles.addCategoryButton} onPress={addCustomCategory}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Add Category</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowCategoryModal(false)}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
  
        {/* Icon Selection Modal */}
        <Modal visible={showIconModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Select an Icon</Text>
              <FlatList
                data={availableIcons}
                keyExtractor={(item) => item}
                numColumns={4}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.iconItem}
                    onPress={() => {
                      setCategoryIcon(item);
                      setShowIconModal(false);
                    }}
                  >
                    <MaterialCommunityIcons name={item} size={30} color="black" />
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowIconModal(false)}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

const styles = {
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "right",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems:"right",
  },
  value: {
    fontSize: 16,
    color: "#638863",
    flex: 1,
    textAlign: "right",
    marginRight: 10,
  },
  input: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    color: "#111",
    padding: 5,
    borderBottomColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#19e619",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  categoryItem: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  addCategoryButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#19e619",
    alignItems: "center",
    width: "100%",
  },
  iconItem: {
    padding: 10, 
    alignItems: "right", 
    margin: 5 },
  closeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    alignItems: "center",
    width: "100%",
  },
};
