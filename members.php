<html>
	<head>
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link href='css/google-fonts.css' rel='stylesheet' type='text/css'>
		<link href='css/style.css' rel='stylesheet' type='text/css'>
	</head>
	<body style="margin:0; background-color: #F2F2F2;">
		<header></header>

		<!-- Left side: goals, mostly -->
		<div id="leftpane">
			<div id='createGoalBtn'>Create +</div>

			<div id="goalContainer"></div>
		</div>
		
		<!-- Right side: main content, stuff... -->
		<div id="rightpane">
			<div id="bigContainer">
				
			</div>
			<input id="cmd-input" type="text" placeholder="what happened?">
		</div>

		<button class='btn btn-info' id='switchBtn'>switch</button>

		<?php
			if (isset($_SESSION['user_name']))
				echo "session works!";
			else
				echo "session not working =(";
		?>

		<script src="js/jquery-1.10.2.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/underscore-1.5.1.js"></script>
		<script src="js/backbone-min.js"></script>

		<script src="js/models/models.js"></script>
		<script src="js/collections/collections.js"></script>
		<script src="js/views/appView.js"></script>
		<script src="js/views/content.js"></script>
		<script src="js/views/goals.js"></script>
		<script src="js/views/heading.js"></script>
		<script src="js/app.js"></script>
	</body>
</html>	