import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

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

function GameScreen({ userNumber }) {
  const initialGuess = generateRandomNumberBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

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
      const newRndNumber = generateRandomNumberBetween(
        minBoundary,
        maxBoundary,
        currentGuess
      );
      setCurrentGuess(newRndNumber);
    } else {
      minBoundary = currentGuess + 1;
      const newRndNumber = generateRandomNumberBetween(
        minBoundary,
        maxBoundary,
        currentGuess
      );
      setCurrentGuess(newRndNumber);
    }
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <View>
            <PrimaryButton onPress={newGuessHandler.bind(this, "lower")}>
              -
            </PrimaryButton>
          </View>
          <View>
            <PrimaryButton onPress={newGuessHandler.bind(this, "higher")}>
              +
            </PrimaryButton>
          </View>
        </View>
      </View>
      <View>{/*Log rounds*/}</View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
