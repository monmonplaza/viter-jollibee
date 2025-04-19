<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$advertisement = new Advertisement($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


$response = new Response();
$xx = [];


if (array_key_exists("advertisementid", $_GET)) {
    // get data
    $advertisement->advertisement_aid = $_GET['advertisementid'];
    $photoToDelete = $data['photo'];

    checkId($advertisement->advertisement_aid);
    $query = checkDelete($advertisement);

    if ($query->rowCount() > 0) {
        unlink('../../../../public/img/' . $photoToDelete);
    }

    returnSuccess($advertisement, "Advertisement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
