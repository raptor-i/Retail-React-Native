import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import Constants from "expo-constants";
import wave from "../assets/img/wave2.png";
import { fp, hp, wp } from "../utils/responsive";
import Text from "../components/Text";
import { cartAtom, productsAtom, totalPriceAtom } from "../utils/atoms";
import { useAtom, useAtomValue } from "jotai";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import { useToast } from "react-native-toast-notifications";

const MarketScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [resultProduct, setResult] = useState(null);

  const [products, setProducts] = useAtom(productsAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [totalPrice, setTotalPrice] = useAtom(totalPriceAtom);

  const toast = useToast();

  const onAddPress = (item) => {
    const index = products.findIndex((prod) => prod.sku === item.sku);
    if (products[index].remained <= 0)
      return toast.show(`Yetersiz Stok `, {
        type: "danger",
        placement: "top",
      });

    if (cart.find((prod) => prod.sku === item.sku)) {
      const index = cart.findIndex((prod) => prod.sku === item.sku);
      cart[index].amount += 1;
      setCart(cart);
    } else setCart([...cart, { ...item, amount: 1 }]);

    products[index].remained -= 1;
    setProducts(products);
    setTotalPrice((prev) => (prev += parseFloat(item.price)));
  };

  const renderItem = ({ item, index }) => {
    return (
      <ProductCard
        type="Market"
        title={item.title}
        price={item.price}
        remained={item.remained}
        sku={item.sku}
        onAddPress={onAddPress}
      />
    );
  };

  const onCartPress = () => {
    navigation.navigate("Cart", { cart });
  };

  const onRecordPress = () => {
    navigation.navigate("Record");
  };

  const onSearch = () => {
    if (!search) return setResult(products);

    const result = products.filter(
      (item) => item.title.toUpperCase() === search.toUpperCase()
    );
    if (result.length > 0) {
      setResult(result);
      return;
    }
    setResult(products);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.wave} source={wave} />
      <Text style={styles.title}>Satış</Text>
      <SearchBar
        style={{ borderColor: "orange" }}
        search={search}
        setSearch={setSearch}
        onPress={onSearch}
      />
      <ScrollView
        style={{ marginBottom: hp(8) }}
        showsVerticalScrollIndicator={false}
        horizontal
      >
        <FlatList
          style={{ marginTop: hp(2) }}
          data={resultProduct || products}
          renderItem={renderItem}
          keyExtractor={(item) => item.sku}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.button, { backgroundColor: "#ff681f" }]}
          text="Raporlama"
          onPress={onRecordPress}
        />
        <Button
          style={[styles.button, { backgroundColor: "#ff681f" }]}
          text={totalPrice > 0 ? `${totalPrice} TL` : "Sepet"}
          onPress={onCartPress}
        />
      </View>
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  wave: {
    position: "absolute",
    top: 0,
    width: wp(100),
    height: hp(30),
  },
  title: {
    color: "white",
    fontSize: fp(4),
    fontFamily: "Gilroy-Bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: hp(1),
    flexDirection: "row",
  },
  button: {
    width: wp(45),
    marginHorizontal: wp(2),
    borderColor: "#ff9562",
  },
});
