<?php
	if ($_SESSION['id'] && !isset($_COOKIE['gRemember']) && !$_SESSION['rememberMe']) {
		$_SESSION = array();
		session_destroy();
	}
?>