import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ResolutionConfirmation() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function confirmResolution() {
        try {
            setLoading(true);

            await api.put(
                `/user/requests/${id}/status`,
                null,
                {
                    params: {
                        status: "CLOSED"
                    }
                }
            );

            setMessage("Resolution confirmed successfully.");

            setTimeout(() => {
                navigate(`/requests/${id}`);
            }, 1000);

        } catch (error) {
            console.error("Failed to confirm resolution:", error);
            setMessage("Failed to confirm resolution.");
        } finally {
            setLoading(false);
        }
    }

    function handleNotResolved() {
        setMessage("Issue marked as not resolved.");
    }

    return (
        <div>
            <h1>Resolution Confirmation</h1>

            <p>
                The request has been marked as resolved.
            </p>

            <p>
                Please confirm whether your issue has been resolved.
            </p>

            <button
                onClick={confirmResolution}
                disabled={loading}
            >
                {loading ? "Confirming..." : "Confirm Resolution"}
            </button>

            <button
                onClick={handleNotResolved}
                disabled={loading}
            >
                Issue Not Resolved
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default ResolutionConfirmation;