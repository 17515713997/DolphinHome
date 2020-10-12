<?php
    $_output = array();
    $_conn = mysqli_connect("localhost","root","","dolphin");
    $_sql = "SET NAMES UTF8";
    mysqli_query($_conn,$_sql);

    $_sql = "SELECT * FROM alldatas order by rand() limit 10";

    // $_result 报错 证明$_sql 查询语句有问题
    $_result = mysqli_query($_conn,$_sql);
    
    while(($_rows = mysqli_fetch_assoc($_result)) != NULL){
        $_output[] = $_rows;
    }
    echo json_encode($_output);
?>
