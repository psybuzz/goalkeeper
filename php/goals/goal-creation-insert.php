<?php
	require_once('php/connect.php');
	//look at register.php
	$user_id = mysqli_real_escape_string($con, $_POST['userId']);
	$title = mysqli_real_escape_string($con, $_POST['title']);
	$description = mysqli_real_escape_string($con, $_POST['description']);
	$time_created = date('Y-m-d H:i:s');

	$query = "INSERT INTO goals (id, title, description, created_time) VALUES ('$user_id', '$title', '$description', '$time_created')";
	$result = mysqli_query($sql, $con);
	$num_rows = mysqli_num_rows($result);

	if ($num_rows != 1) {
		echo "Goal was not inserted. Please report this error by contacting us. Thanks :D."
	}
?>