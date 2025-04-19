<?php
class Food
{
    // data
    public $food_aid;
    public $food_title;
    public $food_image;
    public $food_price;
    public $food_category_id;

    public $food_is_active;
    public $food_created;
    public $food_datetime;

    public $product_quantity;

    public $food_start;
    public $food_total;
    public $food_search;

    public $connection;
    public $lastInsertedId;
    public $tblFood;
    public $tblCategory;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblFood = "jb_food";
        $this->tblCategory = "jb_category";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblFood} ";
            $sql .= "( food_title, ";
            $sql .= "food_image, ";
            $sql .= "food_category_id, ";
            $sql .= "food_price, ";
            $sql .= "food_is_active, ";
            $sql .= "food_created, ";
            $sql .= "food_datetime ) values ( ";
            $sql .= ":food_title, ";
            $sql .= ":food_image, ";
            $sql .= ":food_category_id, ";
            $sql .= ":food_price, ";
            $sql .= ":food_is_active, ";
            $sql .= ":food_created, ";
            $sql .= ":food_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "food_title" => $this->food_title,
                "food_image" => $this->food_image,
                "food_category_id" => $this->food_category_id,
                "food_price" => $this->food_price,
                "food_is_active" => $this->food_is_active,
                "food_created" => $this->food_created,
                "food_datetime" => $this->food_datetime,
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
            $sql .= "from {$this->tblFood} as f, ";
            $sql .= "{$this->tblCategory} as c ";
            $sql .= "where f.food_category_id = c.category_aid ";
            $sql .= "order by f.food_is_active desc, ";
            $sql .= "f.food_title asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function readAllActiveCategory()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblCategory} ";
            $sql .= "where category_is_active = 1 ";
            $sql .= "order by category_title asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readById()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblFood} as f, ";
            $sql .= "{$this->tblCategory} as c ";
            $sql .= "where f.food_category_id = c.category_aid ";
            $sql .= "and f.food_aid = :food_aid ";
            $sql .= "order by f.food_is_active desc, ";
            $sql .= "f.food_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "food_aid" => $this->food_aid,
            ]);
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
            $sql .= "from {$this->tblFood} as f, ";
            $sql .= "{$this->tblCategory} as c ";
            $sql .= "where f.food_category_id = c.category_aid ";
            $sql .= "order by f.food_is_active desc, ";
            $sql .= "f.food_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->food_start - 1,
                "total" => $this->food_total,
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
            $sql .= "from {$this->tblFood} ";
            $sql .= "where food_title like :food_title ";
            $sql .= "order by food_is_active desc, ";
            $sql .= "food_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "food_title" => "%{$this->food_search}%",
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
            $sql = "update {$this->tblFood} set ";
            $sql .= "food_title = :food_title, ";
            $sql .= "food_image = :food_image, ";
            $sql .= "food_category_id = :food_category_id, ";
            $sql .= "food_price = :food_price, ";
            $sql .= "food_datetime = :food_datetime ";
            $sql .= "where food_aid = :food_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "food_title" => $this->food_title,
                "food_image" => $this->food_image,
                "food_category_id" => $this->food_category_id,
                "food_price" => $this->food_price,
                "food_datetime" => $this->food_datetime,
                "food_aid" => $this->food_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblFood} set ";
            $sql .= "food_is_active = :food_is_active, ";
            $sql .= "food_datetime = :food_datetime ";
            $sql .= "where food_aid = :food_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "food_is_active" => $this->food_is_active,
                "food_datetime" => $this->food_datetime,
                "food_aid" => $this->food_aid,
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
            $sql = "delete from {$this->tblFood} ";
            $sql .= "where food_aid = :food_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "food_aid" => $this->food_aid,
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
            $sql = "select food_title from {$this->tblFood} ";
            $sql .= "where food_title = :food_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "food_title" => "{$this->food_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
