<?php
    

    @$_start = $_GET["start"];
    if(!$_start){
        $_start = 0;
    }
    @$_shopCount = $_GET["shopCount"];
    if(!$_shopCount){
        $_shopCount = 2;
    }
    $_output = array();

    //连接数据库
    $_conn = mysqli_connect("localhost","root","","dolphin");
    //如果连接数据库出错
    if(!$_conn){
        die("服务器连接错误");//返回错误信息
        return;//停止继续向下执行
    }

    $_sql = "SET NAMES UTF8";
    mysqli_query($_conn,$_sql);

    $_sql = "SELECT * FROM wangshop LIMIT $_start,$_shopCount";

    $_result = mysqli_query($_conn,$_sql);
    while(($_rows = mysqli_fetch_assoc($_result)) != NULL){
        $_output[] = $_rows;
    }
    
    echo json_encode($_output);



?>