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
			<button class='btn btn-info' id='createGoalBtn'>Create +</button>

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
			if (!$_SESSION['id']):
				//user is currently not logged in.
		?>
		
		<button class="btn btn-info" id="rlBtn">Login or Register</button>
		
		<!--The overlay that pops up when you click the login/register button-->
		<div id="login-overlay">
			<div class="cover"></div>
			<div class="pop-up">
				<?php
					if ($_SESSION['msg']['login-err'])
					{
						echo '<div class="error">'.$_SESSION['msg']['login-err'].'</div>';
						unset($_SESSION['msg']['login-err']);
						//this outputs error from login
					}
				?>
				<div id="loginpane">
					<h3>Login</h3>
					<form action="Login.php" method="post"><!--Todo: add login script-->
						<table>
							<tr>
								<tr><td>Username</td><td><input type="text" name="loginname"></td></tr>
								<tr><td>Password</td><td><input type="password" name="loginpass"></td></tr>
								<table><tr>
									<td><input type="checkbox" name="rememberME" id="remCheckbox" ></td>
									<td><label for="remCheckbox" class="checkLabel";>Remember me</label></td>
								</tr></table>
								<td><input type="submit" name="loginsubmit"></td>
							</tr>
						</table>
					</form>
				</div>
				<!--need to add some kind of divider-->
				<div id="registerpane">
					<h3>Register</h3>
					<form action="Registration.php" method="post">
						<table>
							<tr><td>Email</td><td><input type="text" name="email"></td></tr>
							<tr><td>Username</td><td><input type="text" name="username"></td></tr>
							<tr><td>Password</td><td><input type="password" name="password"></td></tr>
							<tr><td>Re-enter Password</td><td><input type="password" name="password2"</td></tr>
							<table><tr>
								<td><input type="checkbox" name="terms-policy" id="t-p checkbox" value="agree"></td>
								<td><label for="t-p checkbox" class="checkLabel">Do you agree to our non-existent terms and policies?</label></td>
							</tr></table>
							<tr><td><input type="submit" name="rsubmit"></td></tr>
						</table>
					</form>
				</div>
			</div>
		</div>
		<?php
			endif;
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