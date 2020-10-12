<?php

    @$_name = $_GET["name"];//联系人
    @$_tel = $_GET["tel"];//电话
    @$_Doorplate = $_GET["doorplate"];//门牌号

    @$_dName = $_GET["dName"];
    @$_dtel = $_GET["dtel"];
    @$_dDoorplate = $_GET["ddoorplate"];

    $_output = array();
    $_conn = mysqli_connect("localhost", "root","","dolphin");	
    if(!$_conn){
        die("服务器连接错误");
    }	
    $_sql = "SET NAMES UTF8";
    mysqli_query($_conn,$_sql);

    $_sql = "UPDATE shopcarorder SET name = '$_name',tel = '$_tel',Doorplate = '$_Doorplate'  WHERE name = '$_dName' AND  tel = '$_dtel'   AND Doorplate = '$_dDoorplate' ";
    $_result = mysqli_query($_conn,$_sql);
    if(!$_result){
        $_output["result"] = "fail";
        $_output["msg"] = "失败";
        return;
    }else{
        $_output["result"] = "ok";
        $_output["msg"] = "修改成功";
    }
    echo json_encode($_output);
?>