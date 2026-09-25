import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./CreateRequest.css";

function CreateRequest() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [priority, setPriority] = useState("");

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            setCategoriesLoading(true);

            const response = await api.get("/user/requests/categories");

            console.log("Available categories:", response.data);

            setCategories(response.data);

        } catch (error) {
            console.error("Failed to load categories:", error);

            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else if (!error.response) {
                setMessage("Unable to connect to the server.");
            } else {
                setMessage("Failed to load categories.");
            }
        } finally {
            setCategoriesLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/user/requests", {
                title: title,
                description: description,
                priority: priority,
                category: {
                    id: Number(categoryId)
                }
            });

            console.log("Request created:", response.data);

            setMessage("Request created successfully!");

            setTitle("");
            setDescription("");
            setCategoryId("");
            setPriority("");

            setTimeout(() => {
                navigate("/requests");
            }, 1000);

        } catch (error) {
            console.error("Request creation failed:", error);

            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else if (!error.response) {
                setMessage("Unable to connect to the server.");
            } else {
                setMessage("Failed to create request.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="create-request-page">

            <div className="create-request-header">

                <div>
                    <p className="create-request-eyebrow">
                        REQUESTS
                    </p>

                    <h1>Create Request</h1>

                    <p>
                        Submit a new request to your organization.
                    </p>
                </div>

                <Link
                    to="/requests"
                    className="create-request-back"
                >
                    ← My Requests
                </Link>

            </div>


            <div className="create-request-layout">

                <div className="create-request-card">

                    <div className="create-request-card-header">
                        <h2>Request Details</h2>

                        <p>
                            Provide the details needed to process your request.
                        </p>
                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="create-field">

                            <label htmlFor="request-title">
                                Title
                            </label>

                            <input
                                id="request-title"
                                type="text"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                placeholder="Enter a clear request title"
                                required
                            />

                        </div>


                        <div className="create-field">

                            <label htmlFor="request-description">
                                Description
                            </label>

                            <textarea
                                id="request-description"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder="Describe your request or issue in detail"
                                rows="6"
                                required
                            />

                            <small>
                                Include any information that may help
                                your organization understand the request.
                            </small>

                        </div>


                        <div className="create-fields-row">

                            <div className="create-field">

                                <label htmlFor="request-category">
                                    Category
                                </label>

                                <select
                                    id="request-category"
                                    value={categoryId}
                                    onChange={(event) =>
                                        setCategoryId(event.target.value)
                                    }
                                    disabled={categoriesLoading}
                                    required
                                >

                                    <option value="">
                                        {categoriesLoading
                                            ? "Loading categories..."
                                            : "Select Category"}
                                    </option>

                                    {!categoriesLoading &&
                                        categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}

                                </select>

                            </div>


                            <div className="create-field">

                                <label htmlFor="request-priority">
                                    Priority
                                </label>

                                <select
                                    id="request-priority"
                                    value={priority}
                                    onChange={(event) =>
                                        setPriority(event.target.value)
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Priority
                                    </option>

                                    <option value="LOW">
                                        LOW
                                    </option>

                                    <option value="MEDIUM">
                                        MEDIUM
                                    </option>

                                    <option value="HIGH">
                                        HIGH
                                    </option>

                                </select>

                            </div>

                        </div>


                        {message && (
                            <div
                                className={`create-request-message ${
                                    message.includes("successfully")
                                        ? "create-success"
                                        : "create-error"
                                }`}
                            >
                                {message}
                            </div>
                        )}


                        <div className="create-request-actions">

                            <Link
                                to="/requests"
                                className="create-cancel-button"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="create-submit-button"
                                disabled={
                                    loading ||
                                    categoriesLoading ||
                                    categories.length === 0
                                }
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Request"}
                            </button>

                        </div>

                    </form>

                </div>


                <div className="create-request-info">

                    <div className="create-info-icon">
                        ?
                    </div>

                    <h3>Before submitting</h3>

                    <p>
                        Make sure your request contains enough detail
                        for your organization to understand and process it.
                    </p>

                    <div className="create-info-list">

                        <div>
                            <span>01</span>
                            <p>Use a clear and specific title.</p>
                        </div>

                        <div>
                            <span>02</span>
                            <p>Describe the issue or requirement.</p>
                        </div>

                        <div>
                            <span>03</span>
                            <p>Select the appropriate priority.</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CreateRequest;