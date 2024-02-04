import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import yelp from "../api/yelp";
import { Linking } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ResultShowScreen({ route }) {
  //id yi al
  const id = route.params.id;

  const handleUrlPress = () => {
    if (result.url) {
      Linking.openURL(result.url);
    }
  };

  //result state i olustur
  const [result, setResult] = useState(null);

  //id ye gore yemekleri getir
  const getResults = async (id) => {
    const response = await yelp.get(`/${id}`);
    console.log(response.data);
    setResult(response.data);
  };

  //bir kere istek atmasını istiyoruz
  useEffect(() => {
    getResults(id);
  }, []);
  //eger result yoksa null dondur
  if (!result) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{result.name}</Text>

      <Text>
        {result.rating} ★ ({`${result.review_count} Değerlendirme `})
      </Text>

      <View style={styles.icon}>
        {result.is_closed ? (
          <AntDesign name="closecircleo" size={40} color="black" />
        ) : (
          <MaterialIcons name="delivery-dining" size={40} color="black" />
        )}
      </View>

      <Text style={styles.phone}>Ara:{result.phone}</Text>
      <TouchableOpacity onPress={handleUrlPress} style={styles.urlButton}>
        <Text style={styles.urlButtonText}>Restoran Web Sitesi</Text>
      </TouchableOpacity>

      <Text style={styles.sehir}>{result.location.city}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={result.photos}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    marginVertical: 5,
    padding: 5,
  },

  container: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f2f2f2", // Hafif gri-beyaz arası renk
  },
  containerClosed: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f2f2f2", // Hafif gri-beyaz arası renk
    opacity: 0.5, // Soluklaştırma efekti için opaklık
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 20,
    alignSelf: "center",
  },
  rating: {
    fontSize: 20,
    marginVertical: 10, // Yatay boşluk ekle
    alignSelf: "center",
  },
  image: {
    width: 400,
    height: 300,
    borderRadius: 20,
    margin: 20,
  },
  phone: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 20,
    alignSelf: "center",
  },
  urlButton: {
    backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 40,
    marginVertical: 5,
  },
  urlButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  sehir: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 20,
    alignSelf: "center",
  },
});
