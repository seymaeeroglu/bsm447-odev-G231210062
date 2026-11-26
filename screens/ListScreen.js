import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

// Konu kartımızdaki adres (K16, varyant a: Blitz)
const API_URL = 'https://api.chess.com/pub/leaderboards';

export default function ListScreen({ navigation }) {
  // Oyuncu listesini tutan durum (state). Başta boş dizi.
  const [oyuncular, setOyuncular] = useState([]);
  // Arama kutusuna yazılan metni tutan durum. Başta boş.
  const [arama, setArama] = useState('');

  // Veriyi API'den çeken fonksiyon
  async function veriyiCek() {
    try {
      const cevap = await fetch(API_URL); // isteği gönder
      const veri = await cevap.json(); // cevabı JSON'a çevir
      setOyuncular(veri.live_blitz); // cevap bir nesne; bizim dizimiz live_blitz
    } catch (hata) {
      console.log('Veri çekilemedi:', hata);
    }
  }

  // Ekran ilk açıldığında bir kez veriyi çek ([] = sadece bir kez)
  useEffect(() => {
    veriyiCek();
  }, []);

  // Listedeki tek bir satırın nasıl görüneceği
  function satirCiz({ item }) {
    return (
      // Satıra dokununca Detay açılır, oyuncu route.params ile gider
      <Pressable style={styles.satir} onPress={() => navigation.navigate('Detay', { oyuncu: item })}>
        <Text style={styles.sira}>{item.rank}</Text>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.ad}>{item.username}</Text>
        <Text style={styles.puan}>{item.score}</Text>
      </Pressable>
    );
  }

  // Aramaya göre süzülmüş liste. İki taraf da küçük harfe çevrilir,
  // böylece arama büyük/küçük harfe duyarsız olur ("magnus" = "Magnus").
  const suzulmusOyuncular = oyuncular.filter((oyuncu) =>
    oyuncu.username.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <View style={styles.ekran}>
      <TextInput
        style={styles.aramaKutusu}
        placeholder="Oyuncu ara..."
        value={arama} // kutuda görünen metin
        onChangeText={setArama} // her harf yazılınca arama durumunu güncelle
      />
      <FlatList
        data={suzulmusOyuncular} // artık süzülmüş dizi gösteriliyor
        keyExtractor={(item) => String(item.player_id)} // her satırın anahtarı: player_id
        renderItem={satirCiz} // her satırı çizen fonksiyon
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ekran: { flex: 1 }, // ekranın tamamını kapla
  aramaKutusu: {
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  satir: {
    flexDirection: 'row', // öğeleri yan yana diz
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  sira: { width: 30, fontWeight: 'bold' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  ad: { flex: 1, fontSize: 16 }, // kalan boşluğu kaplasın
  puan: { fontWeight: 'bold' },
});
