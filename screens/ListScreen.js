import { Button, StyleSheet, Text, View } from 'react-native';

// Liste ekranı. Şimdilik boş; yarın buraya API'den gelen oyuncular (FlatList) gelecek.
// "navigation" nesnesini React Navigation otomatik olarak verir.
export default function ListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Liste ekranı</Text>
      <Button
        title="Detay'ı dene"
        // Detay ekranını açar ve deneme bir kaydı route.params ile gönderir
        onPress={() => navigation.navigate('Detay', { oyuncu: { username: 'deneme' } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
