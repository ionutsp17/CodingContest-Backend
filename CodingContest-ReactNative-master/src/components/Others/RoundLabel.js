import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../constants/colors";

const RoundLabel = props => {
	return (
		<View>
			<Text style={styles.label}>{props.data}</Text>
		</View>
	);
}

export default RoundLabel;

const styles = StyleSheet.create({
	label: {
		backgroundColor: colors.lighterGrey,
		borderRadius: 20,
		margin: 4,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 4,
		paddingBottom: 4,
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: 10,
		lineHeight: 12,
		display: "flex",
		alignItems: "center",
		color: colors.darkGrey
	}
});