import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Kaydedilen oyuncuları telefonda bu anahtar (isim) altında saklıyoruz
const KAYIT_ANAHTARI = 'kaydedilenler';

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
  // Bu oyuncu kaydedilmiş mi? Düğmenin yazısı buna göre değişir.
  const [kayitli, setKayitli] = useState(false);

  // Ekran açılınca: kayıtlı listeyi oku, bu oyuncu içinde var mı bak
  useEffect(() => {
    async function kontrolEt() {
      const metin = await AsyncStorage.getItem(KAYIT_ANAHTARI); // kayıtlı metni oku
      const liste = metin ? JSON.parse(metin) : []; // metni diziye çevir (yoksa boş dizi)
      setKayitli(liste.some((o) => o.player_id === oyuncu.player_id));
    }
    kontrolEt();
  }, []);

  // Düğmeye basınca: kayıtlıysa listeden çıkar, değilse listeye ekle
  async function kaydetVeyaCikar() {
    const metin = await AsyncStorage.getItem(KAYIT_ANAHTARI);
    let liste = metin ? JSON.parse(metin) : [];

    if (kayitli) {
      liste = liste.filter((o) => o.player_id !== oyuncu.player_id); // bu oyuncu hariç hepsi
    } else {
      liste.push(oyuncu); // oyuncuyu listenin sonuna ekle
    }

    // AsyncStorage sadece metin saklar; diziyi JSON metnine çevirip kaydediyoruz
    await AsyncStorage.setItem(KAYIT_ANAHTARI, JSON.stringify(liste));
    setKayitli(!kayitli); // düğmenin yazısını değiştir
  }

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

      <Button
        title={kayitli ? 'Kaydedilenlerden çıkar' : 'Kaydet'}
        onPress={kaydetVeyaCikar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, gap: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  kullaniciAdi: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  bilgi: { fontSize: 16 },
});
