<?php
require "conn.php";
$branddata=$conn->query("select * from brand");
$arr=array();
for($i=0;$i<$branddata->num_rows;$i++){
    $arr[$i]=$branddata->fetch_assoc();
}
echo json_encode($arr);

