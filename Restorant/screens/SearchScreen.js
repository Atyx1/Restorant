import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

export default function SearchScreen() {
  const [searchApi, results, errorMessage] = useResults();

  const [term, setTerm] = useState("");

  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.price === price;
    });
  };
  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? (
        <Text style={{ fontSize: 30, color: "red" }}>{errorMessage}</Text>
      ) : null}

      {results.length === 0 ? (
        <>
          <Text style={styles.notFoundText}>Alakalı Restorant bulunamadı</Text>
        </>
      ) : (
        <>
          <View>
            <ResultsList
              title="Ucuz Restoranlar"
              results={filterResultsByPrice("₺")}
            />
          </View>

          <View>
            <ResultsList
              title="Uygun Restoranlar"
              results={filterResultsByPrice("₺₺")}
            />
          </View>

          <View>
            <ResultsList
              title="Pahalı Restoranlar"
              results={filterResultsByPrice("₺₺₺")}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notFoundText: {
    fontSize: 40,
    color: "red", // veya istediğiniz renk
    textAlign: "center",
    alignItems: "center",
    marginTop: 20, // isteğe bağlı olarak metni bir miktar aşağıda konumlandırabilirsiniz
  },
});
