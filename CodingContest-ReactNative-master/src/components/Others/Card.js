import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";

const Card = props => {
	return (
		<TouchableOpacity style={[styles.container, props.cardStyle]} onPress={() => props.onCardSelect(props.cardId)}>{props.children}</TouchableOpacity >
	);
}
export default Card;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		margin: 16,
		padding: 14,
		height: 170,
		borderRadius: 8,
		backgroundColor: colors.white,
		shadowColor: colors.white,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.6,
		shadowRadius: 1.41,
		elevation: 1,
	}
});