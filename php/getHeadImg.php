<?php

    header('Content-type:text/html;charset=utf8');
    $_hid=$_REQUEST['hid'];
    $_conn=mysqli_connect("localhost","root","","dolphin");

    $_arr=array();

    $_sql="SET NAMES UTF8";

    mysqli_query($_conn,$_sql);

    $_sql="SELECT * FROM headportrait WHERE hid='$_hid'";

    $_result=mysqli_query($_conn,$_sql);
    while(($_rows = mysqli_fetch_assoc($_result))!=null){
        $_arr[] = $_rows;
    }
    echo json_encode($_arr);
?>