<?php
// set http header
require '../../core/header.php';
//require '../../core/Response.php';
// use needed functions
require '../../core/functions.php';
// use needed classes
require '../../models/category/Category.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$category = new Category($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (empty($_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $category->category_search = checkIndex($data, "searchValue");
        $query = checkSearch($category);
        http_response_code(200);
        getQueriedData($query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
