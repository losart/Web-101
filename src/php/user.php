<?php
require('conn.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == "register") {
	$pdo->beginTransaction();
	try {
		$sql = 'INSERT INTO user(idnumber, firstname, lastname, gender, bday, program, yearlevel) VALUES(:idnumber, :firstname, :lastname, :gender, :bday, :program, :yearlevel)';
		$statement = $pdo->prepare($sql);
		$statement->execute([
			':idnumber' => $_POST['userdata']['idnumber'],
			':firstname' => $_POST['userdata']['firstname'],
			':lastname' => $_POST['userdata']['lastname'],
			':gender' => (int) $_POST['userdata']['gender'],
			':bday' => $_POST['userdata']['bday'],
			':program' => $_POST['userdata']['program'],
			':yearlevel' => (int) $_POST['userdata']['yearlevel'],
		]);

		echo $pdo->lastInsertId();
		$pdo->commit();
	} catch (Exception $e) {
		$pdo->rollback();
	}
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] == "getusers") {
	$sql = "SELECT * FROM user";
	$statement = $pdo->query($sql);
	$users = $statement->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($users);

} else if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == "deleteuser") {
	$id = $_POST['userId'];
	$sql = "DELETE FROM user WHERE id=$id";
	$statement = $pdo->prepare($sql);

	if ($statement->execute()) {
		echo 'Delete success';
	}
} else if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == "updateuser") {

	$user_id = $_POST["user_id"];
    $update_idnumber = $_POST['update_idnumber'];
    $update_firstName = $_POST['update_firstName'];
    $update_lastName = $_POST['update_lastName'];
    $update_gender = (int)$_POST['update_gender'];
    $update_bday = $_POST['update_bday'];
    $update_program = $_POST['update_program'];
    $update_yearLevel = (int)$_POST['update_yearLevel'];

	try {
		$sql = "UPDATE user SET idnumber='$update_idnumber', firstname='$update_firstName', lastname='$update_lastName', gender='$update_gender', bday='$update_bday',
			program='$ update_program', yearLevel='$update_yearLevel'WHERE id='$user_id'";

		$statement = $pdo->query($sql);

		$result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if($result){   
            echo 'Update success';
		
		}

		$pdo->commit();
	} catch (Exception $e) {
		$pdo->rollback();
	}
}