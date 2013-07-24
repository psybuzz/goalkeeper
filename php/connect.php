<?php
	//this script is for connecting to the MySQL database
	//defined words to make things easy
	DEFINE ('DB_USER', 'root');
	DEFINE ('DB_PASSWORD', '');
	DEFINE ('DB_HOST', 'localhost');
	DEFINE ('DB_NAME', 'goaldata');
	//tries to connect to the database, else it closes
	$con = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) OR
			die ('Could not connect to MySQL: ' . mysqli_error());
	//finds the database or else it dies
	mysqli_select_db(DB_NAME) OR
			die ('Could not select the database: ' . mysqli_error());
?>