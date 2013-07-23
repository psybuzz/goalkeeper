<?php
	include("connect.php");
	include("functions.php");
	
	if (isset($_POST["submit")) {
		$error = array();
		
		/*$email = $_POST["email"];
		$username = $_POST["username"];
		$password = $_POST["password"];
		$vpass = $_POST["rpass"];*/
		
		if (!filter_var(stripslashes(trim($_POST["email"])), FILTER_VALIDATE_EMAIL)) {
			$error[] = "Please provide a valid email address.";
		} else {
			$address = mysqli_real_escape_string($_POST["email"]);
			$query = "SELECT email FROM users WHERE email = '$address'";
			$result = mysqli_query($query);
			$num = mysqli_num_rows(result);
			
			if ($num > 0) {
				$error[] = "The email you have provided has already been used."
			} else {
				$email = mysqli_real_escape_string($_POST["email"]);
			}
		}
		
		if (!valid_user(stripslashes(trim($_POST["username"])))){ 
			$error[] = "Your username must contain valid characters and 3-15 characters long.";
		} else {
			$user = mysqli_real_escape_string($_POST["username"]);
			$query = "SELECT username FROM users WHERE username = '$user'";
			$result = mysqli_query($query);
			$num = mysqli_num_rows($result);
			
			if ($num > 0) {
				$error[] = "The username you have chosen has already been taken. Please try again.";
			} else {
				$username = mysqli_real_escape_string($_POST["username"]);
			}
		}
		
		if (!valid_pass($_POST["password"])) {
			$error[] = "Your password must contain valid characters and be 6-30 characters long.";
		} else {
			if ($password != $vpass) {
				$error[] = "The passwords you provided do not match.";
			} else {
				$password = $_POST["password"];
			}
		}
		
		if (empty($error)) {
			
		}
	}
?>