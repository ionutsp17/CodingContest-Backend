import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Colors from "../../constants/colors";

const Header = props => {
	return (
		<View style={styles.headerContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.headerTitle}>{props.title}</Text>
			</View>

			<TouchableOpacity style={styles.buttonContainer} onPress={() => { }}>
				<Image source={require("../../../assets/images/header_icon_menu.png")} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		width: "100%",
		height: "10%",
		paddingHorizontal: 16,
		backgroundColor: Colors.backgroundColor,
		justifyContent: "space-between",
		alignItems: "center"
	},
	headerTitle: {
		fontFamily: "Nunito",
		color: Colors.blue,
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 28,
	},
	titleContainer: {

	},
	buttonContainer: {

	},
	button: {

	}
});

export default Header;