import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import SavedScreen from './screens/SavedScreen';

// İki gezgin (navigator) oluşturuyoruz:
const Stack = createNativeStackNavigator(); // ekranları üst üste açar (Detay için)
const Tab = createBottomTabNavigator(); // alttaki sekme çubuğu

// Alt sekmeler: Liste ve Kaydedilenler
function Sekmeler() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Liste"
        component={ListScreen}
        options={{ title: 'Satranç Liderleri ♟️', tabBarLabel: 'Liste' }}
      />
      <Tab.Screen name="Kaydedilenler" component={SavedScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Sekmeler, Stack'in ilk ekranı. Kendi başlıkları olduğu için Stack başlığını gizliyoruz. */}
        <Stack.Screen name="Sekmeler" component={Sekmeler} options={{ headerShown: false }} />
        {/* Detay, sekmelerin ÜSTÜNE açılır; geri tuşu otomatik gelir. */}
        <Stack.Screen name="Detay" component={DetailScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
