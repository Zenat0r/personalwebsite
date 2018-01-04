<?php
	$name = $_POST["name"];	
	$mail = $_POST["email"];
	$message = $_POST["description"];

	
    $headers = 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= 'From: '. $mail . "\r\n";

	$rendu = "
	<html>
		<head>
			<title>Mail généré par le formulaire contact</title>
		</head>
		<body>
			<h2>Mail généré par le formulaire contact</h2>
			<h3><u>Envoyé par</u> : ". $name . "</h3>		
			<h4>Message : </h4>
			<p>" . $message . "</p>
		</body>
	</html>
	";

    mail("contact@christophe-sieradzki.fr", "Mail de c-s.fr généré par le formulaire contact", $rendu, $headers);
?>