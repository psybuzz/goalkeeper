<?php
	function valid_pass($password) {
		$r1 = '/[A-Z]/'; //uppercase
		$r2 = '/[a-z]/'; //lowercase
		$r3 = '/[!@#$%^&*()\-_=+{};:,<.>]/'; //special characters
		$r4 = '/[0-9]/'; //numbers

		if (!preg_match_all($r1, $password) || 
		    !preg_match_all($r2, $password) ||
		    !preg_match_all($r3, $password) ||
		    !preg_match_all($r2, $password) ||
		    strlen($password) < 6 || strlen($password) > 30) 
			return FALSE;

		return TRUE;
	}
	
	function valid_user($username) {
		$r1 = '/[A-Z]/'; //uppercase
		$r2 = '/[a-z]/'; //lowercase
		$r3 = '/[0-9]/'; //numbers
		if (!preg_match_all($r1, $username) ||
			!preg_match_all($r2, $username) ||
			!preg_match_all($r3, $username) ||
			strlen($username) < 3 || strlen($username) > 15)
			return FALSE;
			
		return TRUE;
	}
?>