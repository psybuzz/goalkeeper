<?php include('init.php');?>
<html>
	<head>
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link href='css/google-fonts.css' rel='stylesheet' type='text/css'>
		<link href='css/style.css' rel='stylesheet' type='text/css'>

		<script src="js/jquery-1.10.2.js"></script>
	</head>
	<body>
		<div id="loginpane">
			<h3>Login to Goalkeeper</h3>
			<form action="Login.php" method="post">
				<table>
					<tr>
						<tr><td>Username</td><td><input type="text" name="loginname"></td></tr>
						<tr><td>Password</td><td><input type="password" name="loginpass"></td></tr>
						<table><tr>
							<td><input type="checkbox" name="rememberMe" id="rememberMe" value="1"></td>
							<td><label for="rememberMe" class="checkLabel">Remember me</label></td>
						</tr></table>
						<td><input type="submit" name="loginsubmit" value="Submit"></td>
					</tr>
				</table>
			</form>
		</div>
		<!--need to add some kind of divider-->
		<div id="registerpane">
			<h3>Not a member? Sign up!</h3>
			<form action="Registration.php" method="post">
				<table>
					<tr><td>Email</td><td><input type="text" name="email"></td></tr>
					<tr><td>Username</td><td><input type="text" name="username"></td></tr>
					<tr><td>Password</td><td><input type="password" name="password"></td></tr>
					<tr><td>Re-enter Password</td><td><input type="password" name="password2"</td></tr>
					<table><tr>
						<td><input type="checkbox" name="terms-policy" id="t-pcheckbox" value="agree"></td>
						<td><label for="t-p checkbox" class="checkLabel">Do you agree to our non-existent terms and policies?</label></td>
					</tr></table>
					<tr><td><input type="submit" name="rsubmit" /></td></tr>
				</table>
			</form>
		<!--This displays any error messages from login or registration-->
		</div>
		<?php if (isset($_SESSION['errors'])): ?>
			<div id="form-errors">
				<?php foreach($_SESSION['errors'] as $error): ?>
					<p class="error-message"><?php echo $error ?></p>
				<?php endforeach; $_SESSION['errors'] = array();?>
			</div>
		<?php endif;?>
	</body>
</html>