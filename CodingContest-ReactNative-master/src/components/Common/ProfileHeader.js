import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import ProfileImage from "../others/ProfileImage";

const ProfileHeader = props => {
	return (
		<View style={styles.container}>
			<View style={styles.profileImage}>
				<ProfileImage pacientId={props.id}></ProfileImage>
			</View>
			<View style={styles.detailsWrapper}>
				<Text style={styles.name}>{props.name}</Text>
				<Text style={styles.text}>{props.age} years, {props.genre}</Text>
			</View>
		</View>);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		flexDirection: "row",
	},
	name: {
		color: colors.white,
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20
	},
	text: {
		color: colors.lightestGrey,
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "300",
		fontSize: 12,
		lineHeight: 16
	},
	detailsWrapper: {
		marginTop: 10,
		paddingBottom: 5
	},
	profileImage: {
		marginLeft: 20,
		marginRight: 30,
		marginTop: 10,
		marginBottom: -30
	}
});

export default ProfileHeader;