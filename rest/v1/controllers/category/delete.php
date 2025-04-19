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
    // get data
    $category->category_aid = $_GET['categoryid'];
    $photoToDelete = $data['photo'];

    checkId($category->category_aid);
    $query = checkDelete($category);


    if ($query->rowCount() > 0) {
        unlink('../../../../public/img/' . $photoToDelete);
    }


    returnSuccess($category, "Category", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
