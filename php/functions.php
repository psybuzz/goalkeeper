<?php
	/**
	* Checks for password validation. Accepts uppercase, lowercase letters, numbers, and special characters
	*/
	function valid_pass($password) {
		$r1 = '/[A-Z]/'; //uppercase
		$r2 = '/[a-z]/'; //lowercase
		$r3 = '/[!@#$%^&*()\-_=+{};:,<.>]/'; //special characters
		$r4 = '/[0-9]/'; //numbers

		if ((!preg_match($r1, $password) &&
		     !preg_match($r2, $password) &&
		     !preg_match($r3, $password) &&
		     !preg_match($r4, $password)) || 
		    (strlen($password) < 6 || strlen($password) > 30)) 
			return FALSE;

		return TRUE;
	}
	
	/**
	* Checks for username validation. Accepts uppercase, lowercase letters and numbers.
	*/
	function valid_user($username) {
		$r1 = '/[A-Z]/'; //uppercase
		$r2 = '/[a-z]/'; //lowercase
		$r3 = '/[!@#$%^&*()\-_=+{};:,<.>]/'; //special characters
		$r4 = '/[0-9]/'; //numbers
		if ((!preg_match($r1, $username) &&
			 !preg_match($r2, $username) &&
			 !preg_match($r4, $username)) ||
			  preg_match($r3, $username) ||
			(strlen($username) < 3 || strlen($username) > 15))
			return FALSE;
			
		return TRUE;
	}

	/**
	* Redirects the page to the given parameter.
	*/
	function redirect($url) { 
    	echo "<script type='text'/javascript'>window.location.href='" . $url . "';</script>";
	}
?>