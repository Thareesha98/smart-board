import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import api from "../../../client/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AuthContext } from "../../../auth/AuthContext";

export default function OwnerAppointmentDetails() {
  const { id } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const ownerId = user?.id;

  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const res = await api.get(`/appointments/student/${appt?.studentId}`);
    } catch {}
    try {
      const result = await api.get(`/appointments/owner/${ownerId}`);
      const item = result.data.find((x) => x.id == id);
      setAppt(item);
    } catch (e) {
      console.log("❌ Error:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !appt) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        
        <Text style={styles.header}>{appt.boardingTitle}</Text>
        <Text style={styles.address}>{appt.boardingAddress}</Text>

        <Status status={appt.status} />

        <Text style={styles.label}>Student</Text>
        <Text style={styles.value}>{appt.studentName} ({appt.studentEmail})</Text>

        <Text style={styles.label}>Requested Time</Text>
        <Text style={styles.value}>
          {format(appt.requestedStartTime)} → {format(appt.requestedEndTime)}
        </Text>

        {appt.studentNote ? (
          <>
            <Text style={styles.label}>Student Note</Text>
            <Text style={styles.value}>{appt.studentNote}</Text>
          </>
        ) : null}

        {/* Buttons if pending */}
        {appt.status === "PENDING" && (
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => router.push(`/owner/appointments/${id}/respond?mode=accept`)}
            >
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.declineBtn}
              onPress={() => router.push(`/owner/appointments/${id}/respond?mode=decline`)}
            >
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

function Status({ status }) {
  let color = "#64748b";
  if (status === "PENDING") color = "#facc15";
  if (status === "ACCEPTED") color = "#22c55e";
  if (status === "DECLINED") color = "#ef4444";

  return (
    <View style={[styles.statusBadge, { backgroundColor: color }]}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
}

function format(d) {
  return new Date(d).toLocaleString();
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f172a" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" },
  container: { padding: 16 },
  header: { color: "white", fontSize: 24, fontWeight: "700" },
  address: { color: "#94a3b8", marginBottom: 10 },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  statusText: { color: "black", fontWeight: "700" },

  label: { color: "#cbd5e1", fontSize: 14, marginTop: 16 },
  value: { color: "white", marginTop: 4 },

  btnRow: { flexDirection: "row", marginTop: 25, gap: 12 },
  acceptBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: "#22c55e",
    borderRadius: 12,
    alignItems: "center",
  },
  acceptText: { color: "white", fontWeight: "700" },

  declineBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: "#ef4444",
    borderRadius: 12,
    alignItems: "center",
  },
  declineText: { color: "white", fontWeight: "700" },
});
