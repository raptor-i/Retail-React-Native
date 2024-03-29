import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { fp, hp, wp } from "../utils/responsive";
import Text from "./Text";
import { Ionicons } from "@expo/vector-icons";
import navigationRef from "../utils/navigationRef";
const Card = ({ title, description, name, id }) => {
  const onPress = () => {
    navigationRef?.current?.navigate(`${id}`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {name && (
        <Ionicons name={name} size={wp(20)} style={styles.icon} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: wp(70),
    height: hp(20),
    backgroundColor: "#6666ff",
    marginVertical: hp(2),
    borderRadius: wp(5),
    padding: wp(2),
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
  },
  title: {
    fontSize: fp(3),
    color: "white",
    fontFamily: "Gilroy-SemiBold",
  },
  description: {
    fontSize: fp(2),
    color: "#e0e0ff",
    fontFamily: "Gilroy-Medium",
  },
  icon: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
