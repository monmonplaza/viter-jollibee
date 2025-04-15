<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$advertisement = new Advertisement($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("advertisementid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $advertisement->advertisement_aid = $_GET['advertisementid'];
    $advertisement->advertisement_title = checkIndex($data, "advertisement_title");
    $advertisement->advertisement_image = checkIndex($data, "advertisement_image");
    $advertisement->advertisement_datetime = date("Y-m-d H:i:s");

    checkId($advertisement->advertisement_aid);
    $query = checkUpdate($advertisement);
    returnSuccess($advertisement, "advertisement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
