<?php
class Advertisement
{
    // data
    public $advertisement_aid;
    public $advertisement_title;
    public $advertisement_image;
    public $advertisement_is_active;

    public $advertisement_created;
    public $advertisement_datetime;


    public $advertisement_start;
    public $advertisement_total;
    public $advertisement_search;

    public $connection;
    public $lastInsertedId;
    public $tblAdvertisement;
    public $tblCustomer;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblAdvertisement = "jb_advertisement";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblAdvertisement} ";
            $sql .= "( advertisement_title, ";
            $sql .= "advertisement_image, ";
            $sql .= "advertisement_is_active, ";
            $sql .= "advertisement_created, ";
            $sql .= "advertisement_datetime ) values ( ";
            $sql .= ":advertisement_title, ";
            $sql .= ":advertisement_image, ";
            $sql .= ":advertisement_is_active, ";
            $sql .= ":advertisement_created, ";
            $sql .= ":advertisement_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "advertisement_title" => $this->advertisement_title,
                "advertisement_image" => $this->advertisement_image,
                "advertisement_is_active" => $this->advertisement_is_active,
                "advertisement_created" => $this->advertisement_created,
                "advertisement_datetime" => $this->advertisement_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblAdvertisement} ";
            $sql .= "order by advertisement_is_active desc, ";
            $sql .= "advertisement_title asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all limit
    public function readLimit()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblAdvertisement} ";
            $sql .= "order by advertisement_is_active desc, ";
            $sql .= "advertisement_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->advertisement_start - 1,
                "total" => $this->advertisement_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search
    public function search()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblAdvertisement} ";
            $sql .= "where advertisement_title like :advertisement_title ";
            $sql .= "order by advertisement_is_active desc, ";
            $sql .= "advertisement_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "advertisement_title" => "%{$this->advertisement_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblAdvertisement} ";
            $sql .= "where advertisement_aid = :advertisement_aid ";
            $sql .= "order by advertisement_aid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "advertisement_aid" => $this->advertisement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // // update
    public function update()
    {
        try {
            $sql = "update {$this->tblAdvertisement} set ";
            $sql .= "advertisement_title = :advertisement_title, ";
            $sql .= "advertisement_image = :advertisement_image, ";
            $sql .= "advertisement_datetime = :advertisement_datetime ";
            $sql .= "where advertisement_aid = :advertisement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "advertisement_title" => $this->advertisement_title,
                "advertisement_image" => $this->advertisement_image,
                "advertisement_datetime" => $this->advertisement_datetime,
                "advertisement_aid" => $this->advertisement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblAdvertisement} set ";
            $sql .= "advertisement_is_active = :advertisement_is_active, ";
            $sql .= "advertisement_datetime = :advertisement_datetime ";
            $sql .= "where advertisement_aid = :advertisement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "advertisement_is_active" => $this->advertisement_is_active,
                "advertisement_datetime" => $this->advertisement_datetime,
                "advertisement_aid" => $this->advertisement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblAdvertisement} ";
            $sql .= "where advertisement_aid = :advertisement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "advertisement_aid" => $this->advertisement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // // name
    public function checkName()
    {
        try {
            $sql = "select advertisement_title from {$this->tblAdvertisement} ";
            $sql .= "where advertisement_title = :advertisement_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "advertisement_title" => "{$this->advertisement_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
