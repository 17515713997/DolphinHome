<?php
	session_start();
	$_user=$_SESSION['username'];
    $_conn = mysqli_connect("localhost", "root","","dolphin");
    @$_Deliveryphone = $_GET["tel"];
    @$_DeliveryAddr = $_GET["DeliveryAddr"];
    @$_DeliveryName = $_GET["name"];
    @$_Deliveryhouse = $_GET["doorplate"];
	if(!$_conn){
		die("服务器连接错误");
	}	

	$_output=array();
	$_sql = "SET NAMES UTF8";
	mysqli_query($_conn,$_sql);
	
	$_sql="SELECT * FROM username WHERE name='$_user'";
	$_result = mysqli_query($_conn,$_sql);
    if(($_rows = mysqli_fetch_assoc($_result)) != NULL){
		$_output[] = $_rows;
		$_sql = "UPDATE username SET  Deliveryphone = '$_Deliveryphone',DeliveryAddr = '$_DeliveryAddr',DeliveryName = '$_DeliveryName',Deliveryhouse ='$_Deliveryhouse' WHERE name='$_user'";
		$_result = mysqli_query($_conn,$_sql);

		if($_result){
		    $_output["result"] = "ok";
			$_output["orderid"] = "成功";
		}else{
			$_output["result"] = "fail";
			$_output["msg"] = "添加失败";
		}
    }
   
    echo json_encode($_output);
?>