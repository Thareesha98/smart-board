import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import api from "../../../client/api";
import { AuthContext } from "../../../auth/AuthContext";
import { useRouter } from "expo-router";

export default function OwnerAppointments() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const ownerId = user?.id;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadAppointments(); }, []);

  const loadAppointments = async () => {
    try {
      const res = await api.get(`/appointments/owner/${ownerId}`);
      setAppointments(res.data);
    } catch (e) {
      console.log("❌ Owner appointment load error:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>

        <Text style={styles.header}>Appointment Requests</Text>

        {appointments.length === 0 ? (
          <Text style={styles.noData}>No appointments available.</Text>
        ) : (
          appointments.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={styles.card}
              onPress={() => router.push(`/owner/appointments/${a.id}`)}
            >
              <Text style={styles.title}>{a.boardingTitle}</Text>
              <Text style={styles.address}>{a.boardingAddress}</Text>
              <Status status={a.status} />

              <Text style={styles.time}>
                Requested: {formatDT(a.requestedStartTime)} → {formatDT(a.requestedEndTime)}
              </Text>

              <Text style={styles.student}>
                Student: {a.studentName} ({a.numberOfStudents} people)
              </Text>
            </TouchableOpacity>
          ))
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
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  );
}

function formatDT(date) {
  return new Date(date).toLocaleString();
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f172a" },
  loader: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0f172a" },
  container: { padding: 15 },
  header: { color: "white", fontSize: 26, fontWeight: "700", marginBottom: 20 },
  noData: { color: "#94a3b8", marginTop: 20, textAlign: "center" },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  title: { color: "white", fontSize: 17, fontWeight: "700" },
  address: { color: "#94a3b8", marginBottom: 6 },
  time: { color: "#38bdf8", marginTop: 4 },
  student: { color: "#a5f3fc", marginTop: 4 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
  },
  badgeText: { fontWeight: "700", color: "black" },
});
