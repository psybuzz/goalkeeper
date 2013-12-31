<?php
	require_once('connect.php');
	//look at register.php
	$name = $_POST['name'];
	$userId = $_POST['userId'];

	$query = "SELECT title, description FROM goals";
	$result = mysqli_query($con, $query);
	
	while($row = mysqli_fetch_assoc($result))
	{
		echo "|||";
	    echo $row["title"];
	}
	//echo $goals['address'];
	//$goal = stripslashes(mysqli_real_escape_characters($param));		//sanitize
?>

