<?php
	require_once('php/functions.php');
	require_once('php/connect.php');
	require_once('php/login.php'); //can't get out of login.php?

	if (isset($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn'] == 1) {
		header('Location: members.php');
	}
	else {
		header('Location: index.html');
	}
	exit();
?>