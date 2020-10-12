<?php

    header("Content-type:text/html;charset=utf8");
   
    session_start();
    @$_user= $_SESSION["username"];
    @$_orderId=getorderId();
    @$_price=$_REQUEST['allprice'];
    @$_ordername=$_REQUEST['ordername']; 
    @$_orderprice=$_REQUEST['orderprice']; 
    @$_orderImg=$_REQUEST['orderImg']; 
    @$_pid=$_REQUEST['pid'];
    @$_orderTime=time()*1000;
    @$_brand=$_REQUEST['sbrand'];
    
    
    @$_downTime=$_REQUEST['downTime'];
      $_conn=mysqli_connect("localhost","root","","dolphin");
 
     function getorderId(){
         $_arr=array("0","1","2","3","4","5","6","7","8","9");
         $_str="";
         for($i=0;$i<18;$i++){
             $_str.=$_arr[rand(0,16)];
         }
         return $_str;
     }
  
     
    if(!$_conn){
        $_arr["result"]="err";
        $_arr["msg"]=mysqli_error($_conn);
    }
   
    $_arr=array();
    $_sql="SET NAMES UTF8";
    mysqli_query($_conn,$_sql);
         $_sql="INSERT INTO ordera VALUES(null,'$_pid','$_user','$_orderId','$_price','$_ordername','$_orderImg','$_orderprice','1','$_orderTime','$_brand')";
            $_result=mysqli_query($_conn,$_sql);
            if($_result){
                $_arr["msg"]="ok";                
                $_arr["msgss"]=$_orderId;
            }else{
                $_arr["msg"]=mysqli_error($_conn);
            }
      
echo json_encode($_arr);
?>