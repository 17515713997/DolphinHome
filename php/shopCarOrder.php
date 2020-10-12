<?php
@$_shopnumber = getOrderId();
@$_shopName = $_GET["shopName"];
@$_shopnum = $_GET["shopnum"];
@$_shopprice = $_GET["shopprice"];
@$_shopimg = $_GET["shopimg"];

@$_Deliveryphone = $_GET["Deliveryphone"];
@$_DeliveryAddr = $_GET["DeliveryAddr"];
@$_DeliveryName = $_GET["DeliveryName"];

function getOrderId() {
	$_arr = array("q", "w", "e", "r", "t", "y", "u", "i", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "L", "K", "J", "H", "G", "F", "D", "S", "A", "Z", "X", "C", "V", "B", "N", "M");
	$_str = "";
	for ($i = 0; $i < 18; $i++) {
		$_str .= $_arr[rand(0, 62)];
	}
	return $_str;
}

$_conn = mysqli_connect("localhost", "root", "", "dolphin");
if (!$_conn) {
	die("服务器连接错误");
}
$_sql = "SET NAMES UTF8";
mysqli_query($_conn, $_sql);
$_sql = "INSERT INTO shopcarorder (shopnumber,shopName,shopnum,shopprice,shopimg) VALUES ('$_shopnumber','$_shopName','$_shopnum','$_shopprice','$_shopimg')";

$_result = mysqli_query($_conn, $_sql);

if ($_result) {
	$_output["result"] = "ok";
	//在数据库中获取到最新生成的订单编号 并返回
	$_output["orderid"] = $_shopnumber;
} else {
	$_output["result"] = "fail";
	$_output["msg"] = "添加失败" . $_sql;
}
echo json_encode($_output);
?>