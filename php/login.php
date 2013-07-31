<?php
	include("connect.php");
	if (isset($_POST["loginsubmit"])) {
		session_start();
		$error = array();
		
		if (!$_POST["loginname"] || !$_POST["loginpass"]) {
			$error[] = "All fields must be filled in";
		}
		
		$username = mysqli_real_escape_string($con, $_POST["loginname"]);
		$password = mysqli_real_escape_string($con, $_POST["loginpass"]);
		
		$query = "SELECT id FROM users WHERE username = '$username' AND password = SHA1('$password')";
		$result = mysqli_query($con, $query);
		$row = mysqli_fetch_assoc($result);
		
		if ($num <= 0) {
			$error[] = "Sorry, there is no username $username with the specified password"
		}
		
		if (empty($error)) {
			$_SESSION["username"] = $username;
		}
		else {
		
		}
	}
?>