import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DashboardNavigator from "./DashboardNavigator";
import Login from "../screens/Login";
import Header from "../components/common/Header";

export default AppNavigator = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
			header: null
		}
	},
	App: {
		screen: DashboardNavigator,
		navigationOptions: {
			header: () => (<Header title="Dashboard"/>),
			tabBarVisible: true,
		}
	}
});
