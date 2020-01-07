import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import colors from "../../constants/colors";

const Habbit = props => {
	return (
		<View style={styles.container}>
			<View style={styles.frequencyContainer}>
				<Text style={styles.frequencyLabel}>{props.frequency} times</Text>
			</View>
			<View style={styles.frequencyRateContainer}>
				<View>
					<Text style={styles.frequencyRateIcon}>
						<Image style={styles.icon} source={require("../../../assets/images/icons/triangle.png")} />
					</Text>
				</View>
				<Text style={styles.frequencyRateLabel}>{props.frequencyRate}</Text>
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
	},
	frequencyLabel: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontSize: 20,
		lineHeight: 20,
		fontWeight: "bold",
		color: colors.blue
	},
	frequencyRateLabel: {
		color: colors.blue,
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontSize: 9,
		lineHeight: 16,
		fontWeight: "normal",
	},
	frequencyRateContainer: {
		flexDirection: "row",
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontSize: 16,
		fontWeight: "normal",
	},
	descriptionContainer: {
		width: "80%"

	},
	descriptionLabel: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontSize: 12,
		lineHeight: 16,
		fontWeight: "normal",
		textAlign: "center",
		flexWrap: "wrap",
		color: "#999999"
	},
	icon: {
		// width: 6,
		// height: 4
	}
});

export default Habbit;