import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import PacientBrief from "../components/pacient/PacientBrief";
import data from "../data/pacients";
import Colors from "../constants/colors";
import PacientsRepo from "../data/pacients";

const Pacients = ({ navigation }) => {
	const onSelectPacientHandler = pacientId => {
		const pacient = PacientsRepo.pacients.find(p => p.id === pacientId);
		if (typeof (pacient) !== undefined) {
			navigation.navigate("PacientProfileNavigator", { pacientInfo: pacient });
		}
	};

	return (
		<View style={styles.screen}>
			<FlatList
				data={data.pacients}
				renderItem={({ item }) =>
					<PacientBrief
						id={item.id}
						name={item.name}
						age={item.age}
						genre={item.genre}
						salon={item.salon}
						floor={item.floor}
						medicalIssues={item.medicalIssues}
						status={item.status}
						onSelectPacient={onSelectPacientHandler} />}
				keyExtractor={item => item.id.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: Colors.backgroundColor
	}
});

export default Pacients;