import { View, Text } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'lightgray', padding: 8 }}>
      <Text>{periodo}</Text>
      <Text style={{ fontWeight: 'bold' }}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

export default DespesaSumario;