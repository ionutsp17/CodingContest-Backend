import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import Habbit from "./Habbit";
import colors from "../../constants/colors";

const maxDisplayedHabbits = 2;
const getHabbitsToDisplay = (allHabitsList) => {
	let habbitsList = [];

	if (!(typeof (allHabitsList) === "undefined") && allHabitsList.length > 0) {
		// We only want to display maximum 2 habbits (e.g. most relevant ones)
		const noDisplayedHabbits = Math.min(maxDisplayedHabbits, allHabitsList.length);
		habbitsList = allHabitsList.slice(0, noDisplayedHabbits);
	}

	return habbitsList;
};

const PacientHabbits = props => {
	const habbitsToDisplay = getHabbitsToDisplay(props.habbits);

	return (
		<View style={styles.container}>
			{
				habbitsToDisplay.map((h, index) =>
					<Habbit key={index}
						frequency={h.frequency}
						frequencyRate={h.frequencyRate}
						description={h.description}
					/>)
			}
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginHorizontal: 16,
		backgroundColor: colors.backgroundColor,
		marginTop: 30
	}
});

export default PacientHabbits;