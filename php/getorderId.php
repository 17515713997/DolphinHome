<?php

    header('Content-type:text/html;charset=utf8');

    $_orderId=$_REQUEST['orderId'];
    echo $_orderId;
    $_conn=mysqli_connect("localhost","root","","dolphin");

    $_arr=array();

    $_sql="SET NAMES UTF8";

    mysqli_query($_conn,$_sql);

    $_sql="SELECT * FROM orderdata WHERE orderId='$_orderId'";

    $_result=mysqli_query($_conn,$_sql);
    while(($_rows = mysqli_fetch_assoc($_result))!=null){
        $_arr[] = $_rows;
    }
    echo json_encode($_arr);
?>