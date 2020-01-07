import { createStackNavigator } from "react-navigation-stack";
import Pacients from "../screens/Pacients";
import PacientProfileNavigator from "../navigators/PacientProfileNavigator";

export default StackNavigator = createStackNavigator({
	Pacients: Pacients,
	PacientProfileNavigator: {
		screen: PacientProfileNavigator,
		navigationOptions: {
			//header: ({navigation}) => (<ProfileHeader />)
		}
	},
},
	{
		defaultNavigationOptions: {
			header: null
		}
	});
