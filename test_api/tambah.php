<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

include "konek.php";

$q1 = mysqli_query($konek,"SELECT * FROM user ORDER BY iduser DESC");
$jmlq1 = mysqli_num_rows($q1);
if($jmlq1 < 1){
    $id = "U001";
}elseif($jmlq1 > 0 ){
    $d1 = mysqli_fetch_array($q1);
    $subid = substr($d1['iduser'],2);
    if($subid>0 && $subid<=8){
        $sub = $subid+1;
        $id='U00'.$sub;
    }elseif($subid>=9 && $subid<=100){
        $sub = $subid+1;
        $id='U0'.$sub;
    }elseif($subid>=99 && $subid<=1000){
        $sub = $subid+1;
        $id='U'.$sub;
    }
}

$data = json_decode(file_get_contents("php://input"));
$nama = $data->dataUser->nama;
$username = $data->dataUser->username;
$password = $data->dataUser->password;

$query = mysqli_query($konek,"INSERT INTO user VALUES('$id','$nama','$username','$password')");

?>