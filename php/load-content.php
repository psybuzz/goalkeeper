<?php
	require_once('connect.php');
	$name = mysqli_real_escape_string($con, $_POST['name']);
	$userId = mysqli_real_escape_string($con, $_POST['userId']);

	$query = "SELECT label, log, uploaded_files FROM content WHERE id = '$userId'";
	$result = mysqli_query($con, $query);

	$rows = array();
	while($row = mysqli_fetch_assoc($result)) {
	    $rows[] = $row;
	}

	echo json_encode($rows);
?>