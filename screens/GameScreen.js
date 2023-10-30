import { View, Text, StyleSheet } from "react-native";

function GameScreen() {
  return (
    <View style={styles.screen}>
      <Text>Opponent's GUess</Text>
      {/*guess*/}
      <View>
        <Text>Higher or Lower?</Text>
        {/*buttons + & - */}
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
