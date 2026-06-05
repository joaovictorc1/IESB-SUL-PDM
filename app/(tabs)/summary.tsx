import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity
} from "react-native";

import {
 useEffect,
 useState
} from "react";

import {
 PieChart
} from "react-native-chart-kit";

import api from "../../services/api";


type Transaction={
 id:number;
 description:string;
 amount:number;
 type:"RECEITA"|"DESPESA";
 category?:{
   name:string;
 };
 date:string;
};



export default function Summary(){


const [transactions,setTransactions]=useState<Transaction[]>([]);


const [month,setMonth]=useState(
 new Date().getMonth()
);

const [year,setYear]=useState(
 new Date().getFullYear()
);



async function load(){

 const response =
 await api.get("/transactions");


 setTransactions(response.data);

}



useEffect(()=>{
 load();
},[]);



const filtered =
transactions.filter(item=>{

 const date =
 new Date(item.date);


 return (
  date.getMonth()===month &&
  date.getFullYear()===year
 );

});



const grouped:any={};


filtered.forEach(item=>{


 const category =
 item.category?.name ?? "Sem categoria";


 if(!grouped[category]){
   grouped[category]=0;
 }


 if(item.type==="DESPESA"){
   grouped[category]+=Number(item.amount);
 }


});



const chartData =
Object.keys(grouped).map(
 key=>({

 name:key,
 population:grouped[key],
 color:"#"+Math.floor(
 Math.random()*16777215
 ).toString(16),
 legendFontColor:"#000",
 legendFontSize:12

 })
);



return (

<View style={styles.container}>


<Text style={styles.title}>
Resumo
</Text>


<View style={styles.filter}>


<TouchableOpacity
onPress={()=>
 setMonth(
 month===11?0:month+1
 )
}
>
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
}
>
<Text>
Ano +
</Text>
</TouchableOpacity>


</View>



<PieChart

data={chartData}

width={330}

height={220}

chartConfig={{
 backgroundGradientFrom:"#fff",
 backgroundGradientTo:"#fff",
 color:(opacity=1)=>
 `rgba(0,0,0,${opacity})`
}}

accessor="population"

backgroundColor="transparent"

paddingLeft="10"

/>



</View>

)

}



const styles=StyleSheet.create({

container:{
 flex:1,
 padding:20
},

title:{
 fontSize:24,
 fontWeight:"bold"
},

filter:{
 flexDirection:"row",
 justifyContent:"space-between",
 marginVertical:20
}

});