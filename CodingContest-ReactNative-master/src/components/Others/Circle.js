import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../constants/colors";

const Circle = (props) => {
	return (
		<View style={styles.custom}></View>
	);
}

export default Circle;

const styles = StyleSheet.create({
	custom: {
		backgroundColor: colors.lighterGrey,
		width: 60,
		height: 60,
		borderRadius: 50
	},
});