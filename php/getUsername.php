<?php

    header('Content-type:text/html;charset=utf8');

    session_start();  

    @$_names=$_SESSION["username"];
    if(!$_names){
      $_names=null;
    }
    echo $_names;
?>