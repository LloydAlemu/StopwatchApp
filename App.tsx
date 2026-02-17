import { useState, useRef } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

export default function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [showAbout, setShowAbout] = useState(false);
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

  // ABOUT PAGE VIEW
  if (showAbout) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>About This App</Text>

        <Text style={styles.aboutText}>
          This stopwatch app was built using React Native and Expo as part of a class project.
  It lets you start, pause, stop, and record lap times. 
        </Text>

        <Button title="Back to Stopwatch" onPress={() => setShowAbout(false)} />
      </View>
    );
  }

  // MAIN STOPWATCH VIEW
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

      <View style={{ marginTop: 20 }}>
        <Button title="About App" onPress={() => setShowAbout(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  aboutText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 26,
  },
});
