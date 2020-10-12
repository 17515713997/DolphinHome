<?php
    $_output = array();
    $_conn = mysqli_connect("localhost","root","","dolphin");
    if(!$_conn){
        die("服务器连接错误");
    }
    $_sql = "SET NAMES UTF8";
    mysqli_query($_conn,$_sql);
    $_sql = "SELECT * FROM shppingall ";
    $_result = mysqli_query($_conn,$_sql);
    while(($_rows = mysqli_fetch_assoc($_result)) != NULL){
        $_output[] = $_rows;
    }
    echo json_encode($_output);
?>