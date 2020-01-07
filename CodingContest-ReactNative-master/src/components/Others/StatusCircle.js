import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../constants/colors";

const StatusCircle = props => {
	switch (props.status) {
		case "warning":
			return (
				<Text style={styles.statusCircleWarning}></Text>
			);
		case "danger":
			return (
				<Text style={styles.statusCircleDanger}></Text>
			);
		default:
			return (
				<Text style={styles.statusCirclePrimary}></Text>
			);
	}
}

export default StatusCircle;

const styles = StyleSheet.create({
	statusCirclePrimary: {
		backgroundColor: colors.green,
		width: 24,
		height: 24,
		borderRadius: 50
	},
	statusCircleWarning: {
		backgroundColor: colors.yellow,
		width: 24,
		height: 24,
		borderRadius: 50
	},
	statusCircleDanger: {
		backgroundColor: colors.red,
		width: 24,
		height: 24,
		borderRadius: 50
	},
});