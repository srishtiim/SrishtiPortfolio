<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';

$query = "SELECT * FROM projects";
$stmt = $conn->prepare($query);
$stmt->execute();

$projects = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // Extracting fields for the Project interface
    $project_item = array(
        "id" => (int)$row['id'],
        "title" => $row['title'],
        "description" => $row['description'],
        "link" => $row['link']
    );
    array_push($projects, $project_item);
}

http_response_code(200);
echo json_encode($projects);
?>
