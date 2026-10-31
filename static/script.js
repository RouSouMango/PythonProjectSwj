
const assignmentForm = document.getElementById("assignmentForm");
const assignmentList = document.getElementById("assignmentList");

async function loadAssignments() {
    try {
        const response = await fetch("/assignments");

        if (!response.ok) {
            throw new Error("Could not load assignments.");
        }

        const assignments = await response.json();
        assignmentList.innerHTML = "";

        assignments.forEach(addAssignmentToPage);
    } catch (error) {
        console.error("Error loading assignments:", error);
    }
}

function addAssignmentToPage(assignment) {
    const listItem = document.createElement("li");

    const details = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent = assignment.title;

    const course = document.createElement("div");
    course.textContent = "Course: " + assignment.course;

    const dueDate = document.createElement("div");
    dueDate.textContent = "Due Date: " + assignment.due_date;

    details.appendChild(title);
    details.appendChild(course);
    details.appendChild(dueDate);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.style.width = "auto";
    deleteButton.style.backgroundColor = "#b42318";

    deleteButton.addEventListener("click", async function () {
        try {
            const response = await fetch(
                "/assignments/" + assignment.id,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Could not delete assignment.");
            }

            listItem.remove();
        } catch (error) {
            console.error("Error deleting assignment:", error);
            alert("Could not delete the assignment. Please try again.");
        }
    });

    listItem.appendChild(details);
    listItem.appendChild(deleteButton);
    assignmentList.appendChild(listItem);
}

assignmentForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const course = document.getElementById("course").value.trim();
    const dueDate = document.getElementById("dueDate").value;

    if (!title || !course || !dueDate) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch("/assignments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                course: course,
                dueDate: dueDate
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Could not save assignment.");
        }

        addAssignmentToPage(result);
        assignmentForm.reset();
    } catch (error) {
        console.error("Error saving assignment:", error);
        alert("Could not save the assignment. Check that the application is running.");
    }
});

loadAssignments();
