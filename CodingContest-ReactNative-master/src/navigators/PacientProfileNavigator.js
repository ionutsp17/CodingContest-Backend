import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Image, StyleSheet } from "react-native";
import Profile from "../screens/Profile";
import Sensors from "../screens/Sensors";
import Preferences from "../screens/Preferences";
import Records from "../screens/Records";
import colors from "../constants/colors";

export default PacientProfileNavigator = createBottomTabNavigator({
	Profile: {
		screen: Profile,
		navigationOptions: {
			tabBarLabel: "Profile",
			tabBarIcon: ({ iconColor }) => (<Image style={styles.icon} source={require("../../assets/images/icons/profile.png")} />),
			tabBarOptions: {
				labelStyle: {
					fontSize: 12,
					fontFamily: "Roboto",
					fontStyle: "normal",
					fontWeight: "normal",
					lineHeight: 20,
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				},
				activeTintColor: colors.lightBlue,
				inactiveTintColor: colors.tabBlue,
			}
		}
	},
	Sensors: {
		screen: Sensors,
		navigationOptions: {
			tabBarLabel: "Sensors",
			tabBarIcon: ({ iconColor }) => (<Image style={styles.icon} source={require("../../assets/images/icons/sensors.png")} />),
			tabBarOptions: {
				labelStyle: {
					fontSize: 12,
					fontFamily: "Roboto",
					fontStyle: "normal",
					fontWeight: "normal",
					lineHeight: 20,
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				},
				activeTintColor: colors.lightBlue,
				inactiveTintColor: colors.tabBlue,

			}
		}
	},
	Preferences: {
		screen: Preferences,
		navigationOptions: {
			tabBarLabel: "Preferences",
			tabBarIcon: ({ iconColor }) => (<Image style={styles.icon} source={require("../../assets/images/icons/preferences.png")} />),
			tabBarOptions: {
				labelStyle: {
					fontSize: 12,
					fontFamily: "Roboto",
					fontStyle: "normal",
					fontWeight: "normal",
					lineHeight: 20,
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				},
				activeTintColor: colors.lightBlue,
				inactiveTintColor: colors.tabBlue,
			}
		}
	},
	Records: {
		screen: Records,
		navigationOptions: {
			tabBarLabel: "Records",
			tabBarIcon: ({ iconColor }) => (<Image style={styles.icon} source={require("../../assets/images/icons/records.png")} />),
			tabBarOptions: {
				labelStyle: {
					fontSize: 12,
					fontFamily: "Roboto",
					fontStyle: "normal",
					fontWeight: "normal",
					lineHeight: 20,
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				},
				activeTintColor: colors.lightBlue,
				inactiveTintColor: colors.tabBlue,
			}
		}
	}
});

const styles = StyleSheet.create({
	icon: {
		width: 25,
		height: 25,
	}
});