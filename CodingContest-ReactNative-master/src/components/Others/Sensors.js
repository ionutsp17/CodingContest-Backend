import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../constants/colors";
import Card from "../../components/others/Card";
import ParameterBlock from "./ParameterBlock";
import RoundLabelList from "./RoundLabelList";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Sensors = props => {
	return (
		<Card cardStyle={styles.cardStyle} onCardSelect={() => {}}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Sensors & Condition</Text>
			</View>
			<ParameterBlock style={styles.parametersBlock} />
			<View style={styles.roundLabel}>
				<RoundLabelList items={props.medicalIssues} />
			</View>
		</Card>
	);

};

export default Sensors;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: 12
	},
	titleContainer: {
		justifyContent: "center",
	},
	title: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 12,
		lineHeight: 16,
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		letterSpacing: 0.02,
		textTransform: "uppercase",
		color: colors.lightestGrey
	},
	cardStyle: {
		flexDirection: "column",
		marginTop: 50,
		justifyContent: "space-between"
	},
	horizontalLine: {
		borderBottomColor: Colors.backgroundColor,
		borderBottomWidth: StyleSheet.hairlineWidth,
		width: "100%",
		marginVertical: 12
	},
	roundLabel: {
		justifyContent: "flex-start"
	}
});