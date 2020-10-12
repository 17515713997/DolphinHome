<?php
    header("Content-type:text/html;charset=utf8");
    session_start();
    @$_name=$_REQUEST['name'];
    @$_headimg=$_REQUEST['headimg'];
    @$_orderTime=time()*1000;

    $_conn=mysqli_connect("localhost","root","","Dolphin");
    if(!$_conn){
        $_arr["result"]="err";
        $_arr["msg"]=mysqli_error($_conn);
    }
    $_arr=array();
    $_sql="SET NAMES UTF8";

    mysqli_query($_conn,$_sql);
    $_sql="SELECT * FROM userName WHERE name='$_name'";
    $_result=mysqli_query($_conn,$_sql);
    if(($_rows = mysqli_fetch_assoc($_result))!=null){
        $_arr[] = $_rows;
    }else{
        $_sql="INSERT INTO userName (name,headImg,orderTime) VALUES('$_name','$_headimg','$_orderTime')";
        $_result=mysqli_query($_conn,$_sql);
        if($_result){
            $_arr["msg"]="ok";
            $_SESSION["username"]=$_name;
        }else{
            $_arr["msg"]=mysqli_error($_conn);
        }
    }
    

    echo json_encode($_arr);
?>