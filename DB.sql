-- Create the database

DROP DATABASE IF EXISTS events;
CREATE DATABASE IF NOT EXISTS events;
USE events;

-- Create the roles table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);
INSERT INTO roles (name) VALUES ('admin'), ('user');
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

INSERT INTO users (email, password, role_id) VALUES 
('admin@example.com', '$2b$10$hYsuYYFswAZzxi2FW/b2KuINCNVnJJ4bBtJIZXpKn4UT74w.ElFaK', 1),
('user1@example.com', '$2b$10$hYsuYYFswAZzxi2FW/b2KuINCNVnJJ4bBtJIZXpKn4UT74w.ElFaK', 2),
('user2@example.com', '$2b$10$hYsuYYFswAZzxi2FW/b2KuINCNVnJJ4bBtJIZXpKn4UT74w.ElFaK', 2);

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

INSERT INTO events (name, description, category_id, date, created_by) VALUES
('Rock Concert', 'A rock concert featuring local bands.', 1, '2023-06-01', 1),
('Tech Expo', 'An exhibition showcasing the latest in technology.', 2, '2023-07-15', 1),
('Modern Art Show', 'A display of modern art from local artists.', 3, '2023-08-20', 2),
('Gourmet Food Fair', 'A fair featuring gourmet food from around the world.', 4, '2023-09-10', 2),
('Fashion Week', 'A week-long event showcasing the latest fashion trends.', 5, '2023-10-05', 3),
('Startup Networking', 'A networking event for startups and investors.', 6, '2023-11-01', 3);

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    rated_by INT,
    rating INT NOT NULL,    
    FOREIGN KEY (rated_by) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

INSERT INTO ratings (event_id, rated_by, rating) VALUES
(1, 2, 5),
(1, 3, 4),
(2, 2, 5),
(3, 1, 4),
(4, 1, 3),
(5, 2, 4),
(5, 3, 5),
(6, 2, 4),
(6, 3, 5);

-- Insert initial roles


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

