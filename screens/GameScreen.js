import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomNumberBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomNumberBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRoundsValues, setGuessRoundsValues] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRoundsValues.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function newGuessHandler(direction) {
    //direction => 'lower', 'higher'
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie!!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomNumberBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRoundsValues((prevGuessRoundsValues) => [
      newRndNumber,
      ...prevGuessRoundsValues,
    ]);
  }
  const guessRoundsValuesListLength = guessRoundsValues.length;
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Card>
          <InstructionText style={styles.instructionText}>
            Higher or Lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={newGuessHandler.bind(this, "lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={newGuessHandler.bind(this, "higher")}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.listContainer}>
        {/*guessRoundsValues.map((guessRoundsValues) => (
          <Text key={guessRoundsValues}>{guessRoundsValues}</Text>
        ))*/}
        <FlatList
          data={guessRoundsValues}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsValuesListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
