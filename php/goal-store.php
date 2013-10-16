<?php
	require_once('php/connect.php');
	//look at register.php
	$name = $_POST['name'];
	$content = $_POST['content'];

	$query = "SELECT address from students where name='".$name."' AND rno=".$rno;
	$result = mysqli_query($sql,$con);
	$row=mysqli_fetch_array($result);
	echo $row['address'];

	$goal = stripslashes(mysqli_real_escape_characters($param));		//sanitize
?>

