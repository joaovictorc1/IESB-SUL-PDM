import {
 View,
 Text,
 FlatList,
 Modal,
 TouchableOpacity,
 StyleSheet
} from "react-native";

import {
 useEffect,
 useState
} from "react";

import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import {router} from "expo-router";

type Transaction={
 id:number;
 description:string;
 amount:number;
 category?:any;
 date:string;
};


export default function Home(){

 const {userName}=useAuth();


 const [transactions,setTransactions]=useState<Transaction[]>([]);
 const [month,setMonth]=useState(
   new Date().getMonth()
 );

 const [year,setYear]=useState(
   new Date().getFullYear()
 );


 const [selected,setSelected]=useState<Transaction|null>(null);


 async function load(){

   const response =
     await api.get("/transactions");

   setTransactions(response.data);

 }


 useEffect(()=>{
   load();
 },[]);



 async function remove(){

   if(!selected) return;


   await api.delete(
     `/transactions/${selected.id}`
   );


   setTransactions(old =>
     old.filter(
       item=>item.id!==selected.id
     )
   );


   setSelected(null);
 }



 const filtered =
 transactions.filter(item=>{

 const date =
 new Date(item.date);


 return (
   date.getMonth()===month &&
   date.getFullYear()===year
 );

 });



 return (

 <View style={styles.container}>


 <Text style={styles.welcome}>
  Boas-vindas, {userName}
 </Text>



 <View style={styles.filter}>


 <TouchableOpacity
 onPress={()=>
   setMonth(
    month===11?0:month+1
   )
 }>
 <Text>
  Mês + 
 </Text>
 </TouchableOpacity>


 <Text>
 {month+1}/{year}
 </Text>


 <TouchableOpacity
 onPress={()=>
   setYear(year+1)
 }>
 <Text>
 Ano +
 </Text>
 </TouchableOpacity>


 </View>




 <FlatList

 data={filtered}

 keyExtractor={
 item=>String(item.id)
 }


 renderItem={({item})=>(


 <TouchableOpacity

 onLongPress={()=>
   setSelected(item)
 }

 style={styles.card}

 >

 <Text>
 {item.description}
 </Text>


 <Text>
 R$ {item.amount}
 </Text>


 </TouchableOpacity>

 )}

 />




 <Modal
 transparent
 visible={!!selected}
 animationType="fade"
 >

 <View style={styles.modal}>


 <TouchableOpacity

 style={styles.button}

 onPress={()=>{

  router.push({

  pathname:"/edit-transaction",

  params:{
   id:selected?.id,
   description:selected?.description,
   amount:selected?.amount,
   category:selected?.category
  }

  });

  setSelected(null);

 }}

 >

 <Text>
 Editar
 </Text>

 </TouchableOpacity>

 <TouchableOpacity
 style={styles.button}
 onPress={remove}
 >

 <Text>
 Excluir
 </Text>

 </TouchableOpacity>



 <TouchableOpacity
 onPress={()=>
 setSelected(null)
 }
 >

 <Text>
 Cancelar
 </Text>

 </TouchableOpacity>


 </View>


 </Modal>



 </View>

 )

}


const styles=StyleSheet.create({

container:{
 flex:1,
 padding:20
},

welcome:{
 fontSize:22,
 fontWeight:"bold",
 marginBottom:20
},

filter:{
 flexDirection:"row",
 justifyContent:"space-between",
 marginBottom:20
},

card:{
 padding:18,
 borderWidth:1,
 borderRadius:10,
 marginBottom:10
},

modal:{
 flex:1,
 justifyContent:"center",
 alignItems:"center",
 backgroundColor:"#0005"
},

button:{
 backgroundColor:"white",
 padding:20,
 borderRadius:10,
 marginBottom:10
}

});