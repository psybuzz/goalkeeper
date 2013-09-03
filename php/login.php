<?php
	require_once("functions.php");

	if (isset($_POST["loginsubmit"])) {
		$error = array();

		if (!$_POST["loginname"] || !$_POST["loginpass"]) {
			$error[] = "All fields must be filled in";
		}
		
		$username = stripslashes(mysqli_real_escape_string($con, $_POST["loginname"]));
		
		$query = "SELECT username, email, password FROM users WHERE username = '$username'";
		$result = mysqli_query($con, $query);
		$num = mysqli_num_rows($result);
		
		if ($num == 1) {
			$result_row = mysqli_fetch_object($result);
			
			if (SHA1(stripslashes(mysqli_real_escape_string($con, $_POST["loginpass"]))) == $result_row->password) {
				/*if ($_POST['rememberMe'] == '1') { //rememberMe doesn't work currently
					$cookiehash = md5(sha1($username . 7));
					setcookie($username, $cookiehash, time() + (2 * 7 * 24 * 60 * 60));
				}*/
				session_name('goalkeeper');
				session_start();
				$_SESSION['user_name'] = $result_row->username;
				$_SESSION['user_email'] = $result_row->email;
				redirect('members.php');
				exit();
			}
			else {
				$error[] = "Wrong password. Try again.";
			}
		}
		else {
			$error[] = "This user does not exist";
		}
		 
		/*if ($error) {
			foreach ($error as $msg) {
				echo "$msg<br /> \n";
			}
		}*/
	}
?>