import {
 View,
 TextInput,
 Button,
 Alert
} from "react-native";


import {
 useState
} from "react";


import api from "../services/api";


export default function Categories(){


const [name,setName]=useState("");
const [icon,setIcon]=useState("");
const [color,setColor]=useState("");
const [type,setType]=useState<
"RECEITA"|"DESPESA"
>("DESPESA");



async function create(){


try{


await api.post(
"/categories",
{

 name,

 display:name,

 icon,

 color,

 type

});


Alert.alert(
"Categoria criada"
);


setName("");


}catch(e){

Alert.alert(
"Erro ao criar"
);

}

}




return (

<View
style={{
padding:20
}}
>


<TextInput
placeholder="Nome"
value={name}
onChangeText={setName}
/>



<TextInput
placeholder="Ícone"
value={icon}
onChangeText={setIcon}
/>



<TextInput
placeholder="Cor"
value={color}
onChangeText={setColor}
/>



<TextInput
placeholder="RECEITA ou DESPESA"
value={type}
onChangeText={
v=>setType(
v as any
)
}
/>



<Button
title="Criar categoria"
onPress={create}
/>


</View>

)

}