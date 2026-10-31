
from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

DATABASE = "assignments.db"


def get_db_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_db_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            course TEXT NOT NULL,
            due_date TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/assignments", methods=["GET"])
def get_assignments():
    connection = get_db_connection()

    assignments = connection.execute(
        "SELECT * FROM assignments ORDER BY due_date"
    ).fetchall()

    connection.close()

    return jsonify([dict(assignment) for assignment in assignments])


@app.route("/assignments", methods=["POST"])
def add_assignment():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No assignment data provided"}), 400

    title = data.get("title", "").strip()
    course = data.get("course", "").strip()
    due_date = data.get("dueDate", "").strip()

    if not title or not course or not due_date:
        return jsonify({"error": "Please fill in all fields"}), 400

    connection = get_db_connection()

    cursor = connection.execute(
        """
        INSERT INTO assignments (title, course, due_date)
        VALUES (?, ?, ?)
        """,
        (title, course, due_date)
    )

    connection.commit()
    assignment_id = cursor.lastrowid
    connection.close()

    return jsonify({
        "id": assignment_id,
        "title": title,
        "course": course,
        "due_date": due_date
    }), 201


@app.route("/assignments/<int:assignment_id>", methods=["DELETE"])
def delete_assignment(assignment_id):
    connection = get_db_connection()

    cursor = connection.execute(
        "DELETE FROM assignments WHERE id = ?",
        (assignment_id,)
    )

    connection.commit()
    deleted = cursor.rowcount
    connection.close()

    if deleted == 0:
        return jsonify({"error": "Assignment not found"}), 404

    return jsonify({"message": "Assignment deleted"})


# Initialize the database
initialize_database()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
