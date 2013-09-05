<?php
	session_name('chocolatechip');
	session_start(); //starts the session when we get to the members page
	echo $_SESSION['uname'];
?>