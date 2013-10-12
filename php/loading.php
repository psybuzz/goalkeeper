<?php
	require_once('connect.php');
	//look at register.php
	$name = $_POST['name'];
	$userId = $_POST['userId'];

	$query = "SELECT title, description FROM goals WHERE id = '$userId'";
	$result = mysqli_query($con, $query);
	$goals = mysqli_fetch_array($result);
	echo "done";
	echo $goals;
	//echo $goals['address'];
	//$goal = stripslashes(mysqli_real_escape_characters($param));		//sanitize
?>
