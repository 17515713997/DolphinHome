<?php
    $_output = array();
    //连接数据库
    $_conn = mysqli_connect("localhost","root","","dolphin");
    $_sql = "SET NAMES UTF8";
    mysqli_query($_conn,$_sql);
    $_sql = "SELECT * FROM fenlei";
    $_result = mysqli_query($_conn,$_sql);
    while(($_rows = mysqli_fetch_assoc($_result)) != NULL){
        $_output[] = $_rows;
    }
    echo json_encode($_output);
?>