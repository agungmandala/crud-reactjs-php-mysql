<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "konek.php";

$data = json_decode(file_get_contents("php://input"));
$iduser = $data->dataUser->id;
$nama = $data->dataUser->nama;
$username = $data->dataUser->username;
$password = $data->dataUser->password;

// $iduser = $_PUT['id'];
// $nama = $_PUT['nama'];
// $username = $_PUT['username'];
// $password = $_PUT['password'];

$query = mysqli_query($konek,"UPDATE user SET nama='$nama',username='$username',password='$password' WHERE iduser='$iduser'");

?>