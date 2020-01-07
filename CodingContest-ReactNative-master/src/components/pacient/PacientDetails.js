import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../constants/colors";
import Sensors from "../others/Sensors";
import PacientHabbits from "./PacientHabbits";
import Status from "../others/Status";

const PacientDetails = props => {
	return (
		<View style={styles.container}>
			<Status status={props.pacientInfo.status} styleStatus={styles.statusStyle} />
			<Sensors medicalIssues={props.pacientInfo.medicalIssues} />
			<PacientHabbits habbits={props.pacientInfo.habbits} />
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "space-evenly",
		backgroundColor: colors.backgroundColor
	},
	status: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		color: colors.black
	},
	location: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 10,
		lineHeight: 16,
		letterSpacing: 0.02,
		textTransform: "uppercase",
		color: colors.darkGrey,
		paddingHorizontal: 14,
	},
	statusStyle: {
		textAlign: "left",
		paddingHorizontal: 14,
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		width: "90%",
		alignSelf: "center"
	}
});

export default PacientDetails;