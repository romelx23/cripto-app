import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,TextInput,StatusBar} from "react-native";
import CoinItem from "./components/CoinItem";

export default function App() {
  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false)
  const loadData = async () => {
    console.log("load");
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoin(data);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
        <StatusBar style={styles.status}/>
      <View style={styles.header}>
        <Text style={styles.title}>Application for Coins</Text>
        <TextInput style={styles.search}
        placeholder="Search coin....🎤"
        placeholderTextColor='#fff'
        onChangeText={text=>setSearch(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        data={
          coin.filter(
            crip=>(crip.name.toLowerCase().includes(search) || 
            crip.symbol.toLowerCase().includes(search))
          )
        }
        renderItem={({ item }) => {
          // console.log(item)
          return <CoinItem coin={item} />;
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refresh}
        onRefresh={ async()=>{
          setRefresh(true);
          await loadData();
          setRefresh(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(16, 144, 255)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    marginTop:10,
    fontSize:20,
  },
  status:{
    backgroundColor:'#141414'
  },
  list:{
    width:'90%'
  },
  header:{
    flexDirection:'row',
    justifyContent:"space-between",
    width:'90%',
    marginBottom:10,
  },
  search:{
    color:'#fff',
    borderBottomColor:'#4657ce',
    borderBottomWidth:1,
    width:'40%',
    textAlign:'center'
  }
});
