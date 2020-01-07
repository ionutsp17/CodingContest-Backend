import React, { useState } from "React";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Colors from "../../constants/colors";

const LoginForm = props => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
			<View style={styles.credentialsContainer}>
				<TextInput
					style={styles.input}
					placeholder="Username"
					placeholderTextColor={Colors.lightGrey}
					onSubmitEditing={() => this.passwordInput.focus()}
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText={(usernameText) => setUsername(usernameText)} />
				<TextInput style={styles.input}
					placeholder="Password"
					placeholderTextColor={Colors.lightGrey}
					secureTextEntry
					returnKeyType="go"
					ref={input => this.passwordInput = input}
					onChangeText={(passwordText) => setPassword(passwordText)} />
				<TouchableOpacity style={styles.forgotPasswordContainer}>
					<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.touchableButton} onPress={() => props.onLogin(username, password)}>
					<Text style={styles.buttonText}>Log In</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	input: {
		backgroundColor: "white",
		marginTop: 16,
		marginHorizontal: 16,
		borderRadius: 12,
		color: Colors.lightGrey,
		paddingHorizontal: 24
	},
	forgotPasswordContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		marginRight: 16,
		marginTop: 4
	},
	forgotPasswordText: {
		fontSize: 12,
		lineHeight: 20,
		fontWeight: "bold",
		fontStyle: "normal",
		fontFamily: "Nunito",
		color: Colors.darkBlue
	},
	credentialsContainer: {
		flex: 2
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	touchableButton: {
		margin: 24,
		width: 140,
		height: 44,
		backgroundColor: Colors.orange,
		borderRadius: 150,
		alignItems: "center",
		justifyContent: "center"
	},
	buttonText: {
		fontSize: 16,
		color: "white"
	}
});

export default LoginForm;