DROP DATABASE IF EXISTS ct5;

CREATE DATABASE ct5;

USE ct5;

CREATE TABLE student (
    roll_no INT,
    name VARCHAR(50),
    marks INT,
    grade VARCHAR(1),
    city VARCHAR(20)
);

ALTER TABLE student
ADD COLUMN fees INT DEFAULT 1200;

SELECT *
FROM student;

ALTER TABLE student
ADD COLUMN branch VARCHAR(10) DEFAULT 'CT';

ALTER TABLE student
MODIFY branch VARCHAR(5) DEFAULT 'CT';

DESCRIBE student;

ALTER TABLE student
RENAME TO ct5;

ALTER TABLE ct5
MODIFY branch CHAR(5) DEFAULT 'CT';

DESCRIBE ct5;

SELECT *
FROM ct5;

ALTER TABLE ct5
MODIFY COLUMN roll_no INT PRIMARY KEY;

ALTER TABLE ct5
MODIFY COLUMN fees INT CHECK (fees > 1000);

SET SQL_SAFE_UPDATES = 0;

DELETE FROM ct5
WHERE branch = 'CT';

TRUNCATE TABLE ct5;

INSERT INTO ct5
(roll_no, name, marks, grade, city, branch, fees)
VALUES
(101, 'panu', 54, 'E', 'nagpur', 'CT', 10000),
(102, 'tanu', 64, 'D', 'pune', 'AI_ML', 50000),
(103, 'manu', 74, 'C', 'kamptee', 'EE', 78000),
(104, 'vanu', 41, 'F', 'nagpur', 'ME', 66700),
(105, 'tinu', 84, 'B', 'kamptee', 'ME', 50000),
(106, 'lanu', 90, 'A', 'nagpur', 'CT', 56000);

SELECT *
FROM ct5;

SELECT COUNT(DISTINCT branch)
FROM ct5;

SELECT branch, COUNT(roll_no) AS no_of_student
FROM ct5
GROUP BY branch;

UPDATE ct5
SET marks = 92
WHERE roll_no = 106;

SELECT MAX(marks)
FROM ct5;

SELECT *
FROM ct5
WHERE city != 'nagpur';

SELECT *
FROM ct5
WHERE marks + 10 > 100;

START TRANSACTION;

DELETE FROM ct5
WHERE roll_no = 106;

ROLLBACK;

CREATE VIEW student_marks AS
SELECT roll_no, name, marks
FROM ct5;

SELECT *
FROM student_marks;

SELECT *
FROM student_marks
WHERE marks >= 70;

DROP VIEW student_marks;

SELECT *, marks + 5 AS new_marks
FROM ct5;

SELECT *, fees / 2 AS half_fees, fees - 10000 AS new_fees
FROM ct5;

SELECT *
FROM ct5
WHERE branch IN ('CE', 'ETC');

SELECT *
FROM ct5
WHERE branch NOT IN ('CE', 'ETC');

SELECT *
FROM ct5
WHERE marks BETWEEN 60 AND 90;

SELECT *
FROM ct5
WHERE marks NOT BETWEEN 60 AND 90;

SELECT *
FROM ct5
WHERE name LIKE 'v%';

SELECT *
FROM ct5
WHERE name NOT LIKE 'v%';

SELECT *
FROM ct5
WHERE name LIKE 'van_';

SELECT *
FROM ct5
WHERE name NOT LIKE 'van_';

SELECT *
FROM ct5
WHERE name LIKE '_a%';

UPDATE ct5
SET grade = NULL
WHERE roll_no = 106;

SELECT *
FROM ct5
WHERE grade IS NULL;

SELECT *
FROM ct5
WHERE grade IS NOT NULL;

CREATE INDEX idx_fees
ON ct5(fees);

SHOW INDEX FROM ct5;

SELECT roll_no, name
FROM ct5

UNION ALL

SELECT roll_no, name
FROM ct5;

SELECT name
FROM ct5
WHERE marks > (
    SELECT AVG(marks)
    FROM ct5
);

SELECT name, marks
FROM ct5
WHERE marks = (
    SELECT MAX(marks)
    FROM ct5
);

SELECT *
FROM ct5
WHERE branch IN (
    SELECT branch
    FROM ct5
    WHERE marks >= 90
);

CREATE TABLE fees (
    branch VARCHAR(5),
    roll_no INT,
    fees INT,
    FOREIGN KEY (roll_no) REFERENCES ct5(roll_no)
);

SELECT *
FROM fees;