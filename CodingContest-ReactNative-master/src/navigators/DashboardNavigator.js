import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import TasksScreen from "../screens/Tasks";
import StackNavigator from "../navigators/StackNavigator";
import Colors from "../constants/colors";

const DashboardNavigator = createMaterialTopTabNavigator(
	{
		Pacients: StackNavigator,
		Tasks: TasksScreen
	},
	{
		navigationOptions: {
			tabBarVisible: true,
			title: "Title",
			headerLeft: null,
			gesturesEnabled: false,
			left: null
		},
		backBehavior: "none",
		swipeEnabled: true,
		animationEnabled: true,
		tabBarOptions: {
			labelStyle: {
				fontSize: 12,
				fontFamily: "Roboto",
				fontStyle: "normal",
				fontWeight: "bold",
				fontSize: 14,
				lineHeight: 20,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				fontFamily: "Nunito",
				color: Colors.lightBlue
			},
			indicatorStyle: {
				backgroundColor: Colors.tabBlue,
				height: "100%",
				borderRadius: 50
			},
			style: {
				backgroundColor: Colors.backgroundColor,
				paddingHorizontal: 18
			}
		},
	});

export default DashboardNavigator;
