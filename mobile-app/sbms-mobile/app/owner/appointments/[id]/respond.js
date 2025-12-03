import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../../../client/api";
import { AuthContext } from "../../../../auth/AuthContext";

// Helper to combine selected date + time
function buildDate(date, time) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes()
  );
}

export default function RespondToAppointment() {
  const { id, mode } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const ownerId = user?.id;
  const isAccept = mode === "accept";

  const [ownerStart, setOwnerStart] = useState(new Date());
  const [ownerEnd, setOwnerEnd] = useState(new Date());
  const [ownerNote, setOwnerNote] = useState("");

  // -----------------------------
  // Android-safe Start Time Picker
  // -----------------------------
  const openStartPicker = () => {
    // Step 1 — pick date
    DateTimePickerAndroid.open({
      value: ownerStart,
      mode: "date",
      onChange: (event, selectedDate) => {
        if (!selectedDate) return;

        // Step 2 — pick time
        DateTimePickerAndroid.open({
          value: ownerStart,
          mode: "time",
          is24Hour: true,
          onChange: (event2, selectedTime) => {
            if (!selectedTime) return;
            setOwnerStart(buildDate(selectedDate, selectedTime));
          },
        });
      },
    });
  };

  // -----------------------------
  // Android-safe End Time Picker
  // -----------------------------
  const openEndPicker = () => {
    DateTimePickerAndroid.open({
      value: ownerEnd,
      mode: "date",
      onChange: (event, selectedDate) => {
        if (!selectedDate) return;

        DateTimePickerAndroid.open({
          value: ownerEnd,
          mode: "time",
          is24Hour: true,
          onChange: (event2, selectedTime) => {
            if (!selectedTime) return;
            setOwnerEnd(buildDate(selectedDate, selectedTime));
          },
        });
      },
    });
  };

  // -----------------------------
  // Submit
  // -----------------------------
  const onSubmit = async () => {
    try {
      const payload = {
        status: isAccept ? "ACCEPTED" : "DECLINED",
        ownerStartTime: isAccept ? ownerStart.toISOString() : null,
        ownerEndTime: isAccept ? ownerEnd.toISOString() : null,
        ownerNote: ownerNote,
      };

      await api.put(`/appointments/owner/${ownerId}/${id}`, payload);

      Alert.alert(
        "Success",
        isAccept ? "Appointment Accepted!" : "Appointment Declined!",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (err) {
      console.log("❌ Decision error:", err);
      Alert.alert("Error", "Could not submit response.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isAccept ? "Accept Appointment" : "Decline Appointment"}
        </Text>

        {isAccept && (
          <>
            {/* Start Time */}
            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity style={styles.dateButton} onPress={openStartPicker}>
              <Text style={styles.dateText}>{ownerStart.toLocaleString()}</Text>
            </TouchableOpacity>

            {/* End Time */}
            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity style={styles.dateButton} onPress={openEndPicker}>
              <Text style={styles.dateText}>{ownerEnd.toLocaleString()}</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Owner Note */}
        <Text style={styles.label}>Owner Note</Text>
        <TextInput
          value={ownerNote}
          onChangeText={setOwnerNote}
          style={[styles.input, { height: 120 }]}
          multiline
          placeholder="Optional note..."
          placeholderTextColor="#64748b"
        />

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
          <Text style={styles.submitText}>
            {isAccept ? "Accept Appointment" : "Decline Appointment"}
          </Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// -------------------------------------
// Styles
// -------------------------------------
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f172a" },
  container: { padding: 20 },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: { color: "#cbd5e1", marginTop: 18, marginBottom: 6 },
  dateButton: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  dateText: { color: "white" },
  input: {
    backgroundColor: "#1e293b",
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 10,
    color: "white",
    padding: 12,
  },
  submitBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    marginTop: 30,
  },
  submitText: { color: "white", textAlign: "center", fontWeight: "700" },
  cancelBtn: { padding: 12, marginTop: 14 },
  cancelText: { color: "#ef4444", textAlign: "center", fontSize: 16 },
});
