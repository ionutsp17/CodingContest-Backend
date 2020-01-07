import React from "react";
import RoundLabel from "./RoundLabel";
import { StyleSheet, View } from "react-native";

const RoundLabelList = props => {
	return <View style={[styles.container, props.style]}>
		{
			props.items.map((item, index) => <RoundLabel key={index} data={item} />)
		}
	</View>
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center"
	}
});

export default RoundLabelList;