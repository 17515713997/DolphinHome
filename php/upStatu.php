<?php
    header("Content-type:text/html;charset:utf8");
    session_start();
    @$_user=$_SESSION["username"];
    
    @$_orderId=$_REQUEST['orderId'];
    @$_orderstatu=$_REQUEST['orderstatu'];
    $_conn=mysqli_connect("localhost","root","","dolphin");
    if(!$_conn){
        echo "数据库连接错误";
    }
    $_arr=array();
    $_sql="SET NAMES UTF8";
    mysqli_query($_conn,$_sql);
    if($_orderstatu==4){
        $_oldOrderState=0;
    }else{
        $_oldOrderState=$_orderstatu-1;
    }
    

    $_sql="SELECT * FROM orderdata WHERE orderId ='$_orderId' AND username ='$_user'";

    $_result=mysqli_query($_conn,$_sql);
    $_rows=mysqli_fetch_assoc($_result);
    if($_rows>=1){
        $_sql="UPDATE orderdata SET orderstatu='$_orderstatu' WHERE orderId ='$_orderId' AND username ='$_user' AND orderstatu='$_oldOrderState'";
        $_result=mysqli_query($_conn,$_sql);

        if($_result){
            $_arr["msg"]="ok";
        }else{
            $_arr["msg"]=mysqli_error($_conn);
        }
    }else{
        $_arr["msg"]=1111;
    }

   
    echo json_encode($_arr);
?>