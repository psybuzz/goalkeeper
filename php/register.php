<?php
	include("connect.php");
	include("functions.php");
	
	/**
	* The registration script for the website. It checks for valid email, username, and password, then stores it
	* into our database.
	*/
	if (isset($_POST["rsubmit"])) {
		$error = array(); //an array of possible errors for each entry
		
		/*$email = $_POST["email"];
		$username = $_POST["username"];
		$password = $_POST["password"];
		$vpass = $_POST["rpass"];*/
		
		//email validation
		if (!filter_var(stripslashes(trim($_POST["email"])), FILTER_VALIDATE_EMAIL)) {
			$error[] = "Please provide a valid email address.";
		} else {
			$address = mysqli_real_escape_string($con, $_POST["email"]);
			$query = "SELECT COUNT(*) FROM users WHERE email = '$address'"; //MySQL script, gets the number of rows with the same email
			$num = mysqli_query($con, $query);
			
			//if there's an existing row with the same email, then it's already registered
			if ($num > 0) {
				$error[] = "The email you have provided has already been used.";
			} else {
				$email = mysqli_real_escape_string($_POST["email"]); //stores the email in a variable
			}
		}
		
		//username validation
		if (!valid_user(stripslashes(trim($_POST["username"])))){ 
			$error[] = "Your username must contain valid characters and 3-15 characters long.";
		} else {
			$user = mysqli_real_escape_string($con, $_POST["username"]);
			$query = "SELECT COUNT(*) FROM users WHERE username = '$user'"; //MySQL script, gets the number of rows with the same username
			$num = mysqli_query($con, $query);
			
			//if there's an existing row with the same username, then it's been taken
			if ($num > 0) {
				$error[] = "The username you have chosen has already been taken. Please try again.";
			} else {
				$username = mysqli_real_escape_string($con, $_POST["username"]);
			}
		}
		
		//password validation
		if (!valid_pass($_POST["password"])) {
			$error[] = "Your password must contain valid characters and be 6-30 characters long.";
		} else {
			//check if the password matches the re-entered password
			if ($_POST["password"] != $_POST["password2"]) {
				$error[] = "The passwords you provided do not match.";
			} else {
				$password = $_POST["password"];
			}
		}
		
		//if there aren't any errors, go ahead and store the information in the database
		if (empty($error)) {
			$encrypt = md5(uniqid(rand(), true)); //does an md5 hash key encryption
			$query = "INSERT INTO users (username, email, password, active) VALUES ('$username', '$email', SHA('$password'), $'encrypt')";
			
			$result = mysqli_query($con, $query);
			
			if (mysqli_affected_rows() == 1) {
				echo "<h3>Thank You!</h3> You have been registered!";
			} else {
				echo "You were not registered. Please contact us about the problem, and we'll try to fix it as soon as possible.";
			}
		}
		else {
			echo "Error! The following error(s) have occurred.: <br />";
				
			foreach ($error as $msg) {
				echo "$msg<br />\n";
			}
		}
	}
?>