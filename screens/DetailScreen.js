import { Image, StyleSheet, Text, View } from 'react-native';

// Ülke adresinin son iki harfinden bayrak emojisi üretir.
// Örnek: ".../country/US" → "US" → 🇺🇸
// Her harf, "bölge harfi" denen özel bir karaktere çevrilir; iki bölge harfi yan yana bayrak olur.
function bayrakYap(ulkeAdresi) {
  const kod = ulkeAdresi.slice(-2); // son iki harf
  return String.fromCodePoint(...kod.split('').map((harf) => 127397 + harf.charCodeAt(0)));
}

// trend_score.direction değerini oka çevirir: 1 → ↑ (yükseliyor), -1 → ↓ (düşüyor)
function trendOku(yon) {
  if (yon > 0) return '↑';
  if (yon < 0) return '↓';
  return '–'; // değişim yoksa
}

// Detay ekranı. Seçilen oyuncuyu route.params içinden alır (global değişken yok).
export default function DetailScreen({ route }) {
  const { oyuncu } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: oyuncu.avatar }} style={styles.avatar} />
      <Text style={styles.kullaniciAdi}>{oyuncu.username}</Text>

      {/* Konu kartının Detayda istediği alanlar: name, title, country, trend_score, url */}
      {/* Bazı oyuncularda ad ya da unvan olmayabilir; o zaman "-" yazar */}
      <Text style={styles.bilgi}>Ad: {oyuncu.name || '-'}</Text>
      <Text style={styles.bilgi}>Unvan: {oyuncu.title || '-'}</Text>
      <Text style={styles.bilgi}>Ülke: {bayrakYap(oyuncu.country)}</Text>
      <Text style={styles.bilgi}>
        Trend: {trendOku(oyuncu.trend_score.direction)} {oyuncu.trend_score.delta}
      </Text>
      <Text style={styles.bilgi}>Profil: {oyuncu.url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, gap: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  kullaniciAdi: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  bilgi: { fontSize: 16 },
});
