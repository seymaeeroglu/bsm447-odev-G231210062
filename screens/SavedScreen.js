import { StyleSheet, Text, View } from 'react-native';

// Kaydedilenler ekranı. Şimdilik boş; ileride kaydedilen oyuncular burada listelenecek.
export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text>Kaydedilenler ekranı</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
