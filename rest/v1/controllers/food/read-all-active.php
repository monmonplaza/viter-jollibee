<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// use needed classes
require '../../models/food/Food.php';
// check database connection
require 'functions.php';

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$food = new Food($conn);
// get $_GET data
$error = [];
$returnData = [];


if (empty($_GET)) {
    $query = checkReadAllActiveCategory($food);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
