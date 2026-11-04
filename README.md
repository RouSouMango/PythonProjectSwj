
# Student Assignment Tracker

## Project Overview

The Student Assignment Tracker is a web-based application designed to help students organize their school assignments and keep track of upcoming due dates. Students can enter an assignment name, course, and due date to keep their academic responsibilities organized in one place.

The application uses Python and Flask for the backend, SQLite for database storage, and HTML, CSS, and JavaScript for the frontend. Docker is used to containerize the application.

## Live Application

[Student Assignment Tracker - View Live Application](https://pythonprojectswj.onrender.com/)

## Features

- Add new assignments.
- Enter assignment names and associated courses.
- Select assignment due dates.
- View saved assignments.
- Store assignment information using an SQLite database.
- Access the application through a web browser.
- Run the application using Docker.

## Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Flask | Web application framework |
| SQLite | Database management |
| HTML | Webpage structure |
| CSS | Application styling |
| JavaScript | Frontend functionality |
| Docker | Application containerization |
| Render | Application deployment and hosting |

## Project Structure

```text
PythonProjectSwj/
│
├── static/              # CSS, JavaScript, and static files
├── templates/           # HTML templates
├── Dockerfile           # Docker configuration
├── README.md            # Project documentation
├── app.py               # Flask application
├── assignments.db       # SQLite database
├── main.py              # Main Python file
└── requirements.txt     # Project dependencies
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RouSouMango/PythonProjectSwj.git
```

### 2. Navigate to the Project Directory

```bash
cd PythonProjectSwj
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

```bash
python app.py
```

Open your browser and visit:

http://localhost:5000

## Running with Docker

### Build the Docker Image

```bash
docker build -t student-assignment-tracker .
```

### Run the Docker Container

```bash
docker run -p 5000:5000 student-assignment-tracker
```

Open the application at:

http://localhost:5000

## Database

The application uses SQLite to store assignment information. The database file is named `assignments.db`.

Each assignment includes:

- Assignment Name
- Course
- Due Date

The database allows assignment information to be stored and retrieved when using the application.

## Project Purpose

The purpose of this project is to develop a practical student productivity application while demonstrating how backend programming, database management, frontend development, and containerization work together.

This project provides hands-on experience with Python, Flask, SQLite, HTML, CSS, JavaScript, and Docker.

## Author

**Ridouane Soumana Gregory Shorter Montrell Spears**


## License

Created for educational purposes as part of a assignment.
