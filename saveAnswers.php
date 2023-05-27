<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "surveyDB";

// Crea la conexión con la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Recoge los datos enviados desde el formulario
$nomina = $_POST['nomina'];
$surveyName = $_POST['surveyName'];
$answers = $_POST['answers'];

$id = 'nomina-' . $nomina . '-survey-' . $surveyName;

$sql = "INSERT INTO responses (id, surveyName, answers)
VALUES ('$id', '$surveyName', '$answers')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
