<?php
$conn = null;
$conn = checkDbConnection();
$advertisement = new Advertisement($conn);

if (array_key_exists("advertisementid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$advertisement->advertisement_title = $data["advertisement_title"];
$advertisement->advertisement_image = $data["advertisement_image"];
$advertisement->advertisement_is_active = 1;
$advertisement->advertisement_created = date("Y-m-d H:i:s");
$advertisement->advertisement_datetime = date("Y-m-d H:i:s");

isNameExist($advertisement, $advertisement->advertisement_title);

$query = checkCreate($advertisement);

returnSuccess($advertisement, "Advertisement", $query);
