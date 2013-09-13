<?php
	if (isset($_POST["loginsubmit"])) {
		$error = array();
		session_name('chocolatechip');
		session_start();

		if (!$_POST["loginname"] || !$_POST["loginpass"]) {
			$error[] = "All fields must be filled in";
		}
		else
		{
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
					/*Session expires after leaving this page!
					  Todo: use cookie to keep session going?
					*/
					$_SESSION['uname'] = $result_row->username;
					$_SESSION['id'] = $result_row->id;
					$_SESSION['isLoggedIn'] = "1";
				}
				else {
					$error[] = "Your username or password was incorrect.";
				}
			}
			else {
				$error[] = "Your username or password was incorrect.";
			}
		}
		 
		if ($error) {
			foreach ($error as $msg) {
				$_SESSION['errors'] = array($msg);
			}

			$_SESSION['isLoggedIn'] = "0";
		}
	}
?>