import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import pacientsImages from "../../data/images";

const ProfileImage = props => {
	let imagePath = pacientsImages[props.pacientId];
	return (
		<Image style={styles.custom} source={imagePath} />
	);
}

export default ProfileImage;

const styles = StyleSheet.create({
	custom: {
		backgroundColor: colors.lighterGrey,
		width: 60,
		height: 60,
		borderRadius: 50
	},
});