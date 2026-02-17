import { useState, useRef } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

export default function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const stopTimer = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (running) {
      setLaps((prev) => [...prev, time]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{time}s</Text>

      <View style={styles.buttons}>
        <Button title="Start" onPress={startTimer} />
        <Button title="Pause" onPress={pauseTimer} />
        <Button title="Stop" onPress={stopTimer} />
        <Button title="Lap" onPress={addLap} />
      </View>

      <ScrollView style={styles.lapContainer}>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>
            Lap {index + 1}: {lap}s
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  timer: {
    fontSize: 70,
    color: "white",
    marginBottom: 25,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  lapContainer: {
    width: "80%",
    maxHeight: 200,
  },
  lapText: {
    color: "white",
    fontSize: 18,
    paddingVertical: 4,
    textAlign: "center",
  },
});
