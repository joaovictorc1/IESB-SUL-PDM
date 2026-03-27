import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {Text} from 'react-native';
import GerenciarDespesa from './screens/GerenciarDespesa';
import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';

export default function App() {

  const Tab = createBottomTabNavigator();

  function BottonTabScreen(){
    return(
      <Tab.Navigator>
        <Tab.Screen name='DespesasRecentes' component={DespesasRecentes}
        options={{tabBarIcon: ({color,size}) => (<Ionicons name="hourglass"
          size={size} color={color} />),
        tabBarLabel: 'Recentes',
        title: 'Despesas Recentes',
        tabBarLabelStyle: {fontSize: 12}}}
        />
        <Tab.Screen name='TodasDespesas' component={TodasDespesas}
        options={{tabBarIcon: ({coloz, size}) => (<Ionicons name="wallet-outline"
        size={size} color={color} />),
        tabBarLabel: 'Todas',
        title: 'Todas as Despesas',
        tabBarLabelStyle: { fontSize: 12}}}
        />
      </Tab.Navigator>
    )
  }

  function IconButton({ icon, size, color})

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name ="Despesas" component={BottonTabScreen}
          options={{headerShown:false}} />
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
