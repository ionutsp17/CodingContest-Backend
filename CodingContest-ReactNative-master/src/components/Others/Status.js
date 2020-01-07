import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatusList from "./StatusList";
import colors from "../../constants/colors";

const Status = props => {
	const currentStatus = props.status;
	return (
		<View style={[styles.status]}>
			<Text style={[styles.statusText, styles[currentStatus], props.styleStatus]}>{StatusList[currentStatus]}</Text>
		</View>
	);
}

export default Status;

const styles = StyleSheet.create({
	primary: {
		backgroundColor: colors.headerBackgroundColor,
		height: 30,
	},
	warning: {
		backgroundColor: colors.yellow,
		height: 30,
		color: colors.white
	},
	danger: {
		backgroundColor: colors.red,
		height: 30,
		color: colors.white
	},
	status: {
		borderTopColor: colors.headerBackgroundColor,
		borderTopWidth: 1,
	},
	statusText: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 14,
		color: colors.darkGrey,
		textAlign: "center",
		textAlignVertical: "center",
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8
	}
});