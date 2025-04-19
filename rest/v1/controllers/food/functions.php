<?php

// Update email
function checkReadAllActiveCategory($object)
{
    $query = $object->readAllActiveCategory();
    checkQuery($query, "There's a problem processing your request. (read all active category)");
    return $query;
}
