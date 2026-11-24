import { StyleSheet, Text, View } from 'react-native';

// Detay ekranı. Gönderilen kaydı route.params içinden alır (global değişken yok).
export default function DetailScreen({ route }) {
  const { oyuncu } = route.params;

  return (
    <View style={styles.container}>
      <Text>Detay ekranı</Text>
      <Text>Gelen kayıt: {oyuncu.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
