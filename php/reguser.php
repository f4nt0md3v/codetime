<?php
//host:port, user, password, db_name
$conn = mysqli_connect("srv-pleskdb18.ps.kz:3306","beamk_script","qaWSedRF1234","beamkz_newusers");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	exit();
}

if(isset($_POST['courses'])) {
    $sql = "INSERT INTO formsubmited (username, email, interestedin, yourlevel, comment)
        VALUES (?,?, ?,?,?)";
    
    $stmt = $conn->prepare($sql);

    $t1=implode(',', $_POST['courses']);
    if (!$stmt->bind_param("sssss", $_POST['username'], $_POST['email'], $t1, $_POST['level'], $_POST['comment'])){
        echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    $stmt->execute();
    echo "Ваша заявка успешно отправлена. Мы скоро свяжемся с Вами.";
}

if(isset($_POST['comment2'])) {
    $sql = "INSERT INTO formsubmited (username, email, interestedin, yourlevel, comment)
        VALUES (?,?, ?,?,?)";

    $stmt = $conn->prepare($sql);
	$t1=" ";
    if (!$stmt->bind_param("sssss", $_POST['username'], $_POST['email'], $t1, $_POST['level'], $_POST['comment2'])){
        echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    $stmt->execute();
    echo "Ваша заявка успешно отправлена. Мы скоро свяжемся с Вами.";
}

$stmt->close();
$conn->close();

?>
