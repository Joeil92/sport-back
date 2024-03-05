CREATE TABLE user (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    weigth int(3) NOT NULL,
    size int(3) NOT NULL,
    imageUrl varchar(255),
    roles JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);