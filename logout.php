<?php
	session_name("chocolatechip");
	session_start();
	//destroy all of the variables we've stored in session
	$_SESSION = array();

	session_destroy();
	header("Location: index.php");
?>