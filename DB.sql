-- Create the database

DROP DATABASE IF EXISTS events;
CREATE DATABASE IF NOT EXISTS events;
USE events;

-- Create the roles table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the permissions table
CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the has_permissions table
CREATE TABLE has_permissions (
    role_id INT,
    permission_id INT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Create the event_categories table
CREATE TABLE event_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO event_categories (name) VALUES
('Music Concert'),
('Technology Conference'),
('Art Exhibition'),
('Food Festival'),
('Fashion Show'),
('Business Networking'),
('Educational Workshop'),
('Charity Event'),
('Sports Event');

-- Create the events table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category_id INT,
    date DATE NOT NULL,
    created_by INT,
    FOREIGN KEY (category_id) REFERENCES event_categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    rated_by INT,
    rating INT NOT NULL,    
    FOREIGN KEY (rated_by) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Insert initial roles
INSERT INTO roles (name) VALUES ('admin'), ('user');

-- Insert initial permissions
INSERT INTO permissions (name) VALUES ('create_event'), ('edit_event'), ('delete_event'), ('view_event'), ('delete_user');

-- Assign permissions to roles
INSERT INTO has_permissions (role_id, permission_id) VALUES 
(1, 1), -- admin can create_event
(1, 2), -- admin can edit_event
(1, 3), -- admin can delete_event
(1, 4), -- admin can view_event
(2, 4), -- user can view_event
(2,1); -- user can create_event
