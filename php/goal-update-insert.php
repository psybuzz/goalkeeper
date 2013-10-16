<?php
	require_once('php/connect.php');
	
	$user_id = mysqli_real_escape_string($con, $_POST['userId']);
	$title = mysqli_real_escape_string($con, $_POST['title']);
	$description = mysqli_real_escape_string($con, $_POST['description']);

	$result = mysqli_query($sql, $con);	$query = "UPDATE goals SET (id, title, description) = ('$user_id', '$title', '$description')";

	$num_rows = mysqli_num_rows($result);
	
	if ($num_rows != 1) {
		echo "Goal was not updated. Please report this error by contacting us. Thanks :D."
	}
?>