import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Image } from "react-native";
import LoginForm from "../components/login/LoginForm";
import Colors from "../constants/colors";
import UsersRepo from "../data/users";

const LoginScreen = ({ navigation }) => {
	const onLoginHandler = (usernameParam, passwordParam) => {
		const user = UsersRepo.users.find(user => user.username === usernameParam && user.password === passwordParam);
		if (typeof (user) !== "undefined") {
			navigation.navigate("App");
		}
		else {
			Alert.alert("Uknown credentials.");
		}
	};

	return (
		<View style={styles.screenContainer}>
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={require("../../assets/images/logo.png")} />
			</View>
			<View style={styles.formContainer}>
				<LoginForm onLogin={onLoginHandler} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		backgroundColor: Colors.backgroundColor,
		flex: 1
	},
	logoContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	logo: {
		width: "30%",
		height: "30%",
		resizeMode: "contain"
	},
	formContainer: {
		flex: 1
	}
});

export default LoginScreen;