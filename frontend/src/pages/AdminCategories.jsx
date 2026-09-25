import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminCategories.css";

function AdminCategories() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function loadCategories() {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/admin/categories");

            console.log("Categories:", response.data);

            setCategories(response.data);

        } catch (error) {
            console.error("Failed to load categories:", error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (!error.response) {
                setError("Unable to connect to the server.");
            } else {
                setError("Failed to load categories.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");
        setSaving(true);

        try {
            const response = await api.post("/admin/categories", {
                name: name,
                description: description
            });

            console.log("Category created:", response.data);

            setMessage("Category created successfully!");

            setName("");
            setDescription("");

            await loadCategories();

        } catch (error) {
            console.error("Category creation failed:", error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (!error.response) {
                setError("Unable to connect to the server.");
            } else {
                setError("Failed to create category.");
            }
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="admin-categories-page">

            <div className="admin-categories-header">

                <div>
                    <p className="admin-categories-eyebrow">
                        ADMINISTRATION
                    </p>

                    <h1>Categories</h1>

                    <p>
                        Create and manage request categories for your organization.
                    </p>
                </div>

            </div>


            <div className="admin-categories-layout">

                {/* Create Category */}

                <div className="category-create-card">

                    <div className="category-card-header">
                        <h2>Create Category</h2>

                        <p>
                            Add a category that users can select when creating requests.
                        </p>
                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="category-field">

                            <label htmlFor="category-name">
                                Category Name
                            </label>

                            <input
                                id="category-name"
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="e.g. IT Support"
                                required
                            />

                        </div>


                        <div className="category-field">

                            <label htmlFor="category-description">
                                Description
                            </label>

                            <textarea
                                id="category-description"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder="Describe what this category is used for"
                                rows="5"
                                required
                            />

                        </div>


                        {message && (
                            <div className="category-success">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="category-error">
                                {error}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="category-submit"
                            disabled={saving}
                        >
                            {saving ? "Adding..." : "Add Category"}
                        </button>

                    </form>

                </div>


                {/* Existing Categories */}

                <div className="category-list-card">

                    <div className="category-list-header">

                        <div>
                            <h2>Your Categories</h2>

                            <p>
                                Categories available in your organization.
                            </p>
                        </div>

                        <span className="category-count">
                            {categories.length}
                        </span>

                    </div>


                    {loading && (
                        <div className="category-loading">
                            <div className="category-spinner"></div>
                            <p>Loading categories...</p>
                        </div>
                    )}


                    {!loading && categories.length === 0 && (
                        <div className="category-empty">

                            <div className="category-empty-icon">
                                +
                            </div>

                            <h3>No categories yet</h3>

                            <p>
                                Create your first category using the form.
                            </p>

                        </div>
                    )}


                    {!loading && categories.length > 0 && (
                        <div className="category-list">

                            {categories.map((category) => (

                                <div
                                    className="category-item"
                                    key={category.id}
                                >

                                    <div className="category-item-icon">
                                        ◫
                                    </div>

                                    <div className="category-item-content">

                                        <div className="category-item-title">
                                            <h3>
                                                {category.name}
                                            </h3>

                                            <span
                                                className={
                                                    category.active
                                                        ? "category-active"
                                                        : "category-inactive"
                                                }
                                            >
                                                {category.active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </div>

                                        <p>
                                            {category.description}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default AdminCategories;