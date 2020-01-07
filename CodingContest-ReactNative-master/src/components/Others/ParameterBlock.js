import React from "react";
import { StyleSheet, View } from "react-native";
import ParameterItem from "./ParameterItem";

const ParameterBlock = () => {
	return (
		<View style={styles.container}>
			<ParameterItem value="42.2" unit="C"></ParameterItem>
			<ParameterItem value="87" unit="BPM"></ParameterItem>
			<ParameterItem value="130/70" unit="mmHg"></ParameterItem>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
	}
});

export default ParameterBlock;