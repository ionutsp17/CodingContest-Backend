import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import RoundLabelList from "../others/RoundLabelList";
import Card from "../others/Card";
import colors from "../../constants/colors";
import Status from "../others/Status";
import ProfileImage from "../others/ProfileImage";

const PacientBrief = props => {
	return (
		<Card cardStyle={styles.cardStyle} cardId={props.id} onCardSelect={props.onSelectPacient}>
			<View style={styles.container}>
				<View style={styles.circle}>
					<ProfileImage pacientId={props.id}></ProfileImage>
				</View>
				<View style={styles.detailsWrapper}>
					<View style={styles.headerDetails}>
						<Text style={styles.name}>{props.name}</Text>
						<Text style={styles.age}>{props.age}y, {props.genre}</Text>
					</View>
					<Text style={styles.locationDetails}>Floor {props.floor}, Saloon {props.salon}</Text>
					<RoundLabelList items={props.medicalIssues} style={styles.roundLabels}></RoundLabelList>
				</View>
			</View>
			<Status status={props.status} />
		</Card>
	);
}

const styles = StyleSheet.create({
	cardStyle: {
		flexDirection: "column",
		padding: 0,
		justifyContent: "space-around",
		height: 100
	},
	container: {
		flexDirection: "row",
		padding: 16
	},
	circle: {
		flex: 1
	},
	roundLabels: {
		justifyContent: "flex-start"
	},
	detailsWrapper: {
		flexDirection: "column",
		flex: 2
	},
	headerDetails: {
		flexDirection: "row"
	},
	statusCircle: {
		alignSelf: "flex-end",
		flex: 1,
		padding: 16
	},
	name: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
	},
	age: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 12,
		lineHeight: 20,
		color: colors.lightestGrey,
		marginLeft: 6
	},
	locationDetails: {
		fontFamily: "Roboto",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 10,
		lineHeight: 16,
		letterSpacing: 0.05,
		textTransform: "uppercase",
		color: colors.lightGrey
	},
	roundLabelContainer: {
		justifyContent: "flex-start"
	}
});

export default PacientBrief;
