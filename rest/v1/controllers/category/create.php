<?php
$conn = null;
$conn = checkDbConnection();
$category = new Category($conn);

if (array_key_exists("categoryid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$category->category_title = $data["category_title"];
$category->category_thumbnail = $data["category_thumbnail"];
$category->category_is_active = 1;
$category->category_created = date("Y-m-d H:i:s");
$category->category_datetime = date("Y-m-d H:i:s");

isNameExist($category, $category->category_title);

$query = checkCreate($category);

returnSuccess($category, "Category", $query);
