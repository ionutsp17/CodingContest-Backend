import React from "react";
import { View, StyleSheet } from "react-native";
import StreamPlayer from "../components/video/StreamPlayer";
import PacientDetails from "../components/pacient/PacientDetails";
import Colors from "../constants/colors";
import Settings from "../constants/settings";

const Profile = props => {
	const { navigation } = props;
	const pacientInfo = navigation.getParam("pacientInfo");
	return (
		<View style={styles.screenContainer}>
			<View style={styles.videoContainer}>
				<StreamPlayer uri={Settings.serverVideoFeedUrl + "?sourceIndex=" + pacientInfo.cameraIndex}></StreamPlayer>
			</View>
			<View>
				<PacientDetails pacientInfo={pacientInfo} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		flex: 1,
		backgroundColor: Colors.backgroundColor
	},
	videoContainer: {
		height: 200,
	},
});

export default Profile;