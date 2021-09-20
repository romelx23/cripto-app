import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CoinItrem = ({ coin }) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.containerFlex}>
      <Image style={styles.imagen} source={{ uri: coin.image }} />
      <View style={styles.ContainerName}>
      <Text style={styles.title}>{coin.name}</Text>
      <Text style={styles.textSymbol}>{coin.symbol}</Text>
      </View>
      </View>
      <View>
      <Text style={styles.title}>${coin.current_price}</Text>
      <Text style={[styles.title,
      coin.price_change_percentage_24h>0? styles.priceUp:styles.priceLow
      ]}>{coin.price_change_percentage_24h}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    containerFlex:{
        flexDirection:'row'
    },
  containerItem: {
    backgroundColor: "rgb(14, 137, 245)",
    paddingTop: 10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title: {
    color: "#fff",
    textAlign:'right'
  },
  imagen: {
    width: 30,
    height: 30,
  },
  textSymbol:{
      marginLeft:10,
      color:'#434343',
      textTransform:'uppercase'
  },
  ContainerName:{
    marginLeft:10,
    flexDirection:'row'
  },
  priceUp:{
    color:'rgb(9, 255, 0)'
  },
  priceLow:{
    color:'rgb(255, 38, 0)'
  }
});

export default CoinItrem;
