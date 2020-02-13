<?php

header("Access-Control-Allow-Origin: *");

include "konek.php";
$query = mysqli_query($konek,"SELECT * FROM user");
$dataUser=array();
while($data = mysqli_fetch_array($query)){
	$dataUser[]=$data;
}
echo json_encode($dataUser);
?>