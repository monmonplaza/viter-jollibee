<?php
$conn = null;
$conn = checkDbConnection();
$food = new Food($conn);

if (array_key_exists("foodid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$food->food_title = checkIndex($data, "food_title");
$food->food_image = $data["food_image"];
$food->food_price = checkIndex($data, "food_price");
$food->food_category_id = checkIndex($data, "food_category_id");
$food->food_is_active = 1;
$food->food_created = date("Y-m-d H:i:s");
$food->food_datetime = date("Y-m-d H:i:s");

isNameExist($food, $food->food_title);

$query = checkCreate($food);

returnSuccess($food, "Food", $query);
