import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../constants/colors";

const ParameterItem = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.value}>{props.value}</Text>
			<Text style={styles.unit}>{props.unit}</Text>
		</View>

	);
}

export default ParameterItem;


const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center"
	},
	value: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 24,
		lineHeight: 36,
		letterSpacing: -0.02,
		color: colors.blue
	},
	unit: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 10,
		lineHeight: 14,
		textAlign: "center",
		color: colors.darkGrey
	}
});