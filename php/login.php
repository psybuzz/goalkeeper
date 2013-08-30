<?php
	include("connect.php");
	
	if (isset($_POST["loginsubmit"])) {
		session_name("GoalKeeper");
		//session_set_cookie_params(2 * 7 * 24 * 60 * 60); //cookie lives for 2 weeks
		session_start();
		$error = array();
		if (!$_POST["loginname"] || !$_POST["loginpass"]) {
			$error[] = "All fields must be filled in";
		}
		
		$username = mysqli_real_escape_string($con, $_POST["loginname"]);
		$password = mysqli_real_escape_string($con, $_POST["loginpass"]);
		//$_POST["rememberME"] = (int)$_POST["rememberME"];
		
		$query = "SELECT username, email, password FROM users WHERE username = '$username'";
		$result = mysqli_query($con, $query);
		$num = mysqli_num_rows($result);
		
		if ($num == 1) {
			$result_row = mysqli_fetch_object($result);
			
			if ($password == $result_row->password) {
				$_SESSION['user_name'] = $result_row->username;
				$_SESSION['user_email'] = $result_row->email;
				$_SESSION['user_logged_in'] = 1;
				
				$user_is_logged_in = true;
			}
			else {
				$error[] = "Wrong password. Try again.";
			}
		}
		else {
			$error[] = "This user does not exist";
		}
		 
		if (!empty($error)) {
			$_SESSION["msg"]["login-err"] = implode("<br />", $error); //save the error messages in the session
		}
		
		exit;
	}
?>