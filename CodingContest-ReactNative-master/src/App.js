import React, { useState } from "react";
import { View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppNavigator from "./navigators/AppNavigator";

const AppIndex = createAppContainer(AppNavigator)

const App = () => {
	return (
		<View style={{ flex: 1 }} >
			<AppIndex />
		</View>
	);
}

export default App;
