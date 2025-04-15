<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$category = new Category($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("categoryid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $category->category_aid = $_GET['categoryid'];
    $category->category_title = checkIndex($data, "category_title");
    $category->category_thumbnail = checkIndex($data, "category_thumbnail");
    $category->category_datetime = date("Y-m-d H:i:s");
    
    checkId($category->category_aid);
    $query = checkUpdate($category);
    returnSuccess($category, "category", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
