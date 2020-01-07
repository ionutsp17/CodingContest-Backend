import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import Colors from "../../constants/colors";

const StreamPlayer = props => {
	return (
		<WebView source={{ uri: props.uri }} style={styles.backgroundVideo} automaticallyAdjustContentInsets={false} />
	);
}

export default StreamPlayer;

const styles = StyleSheet.create({
	backgroundVideo: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: Colors.streamVideoPlaceholderColor
	}
});