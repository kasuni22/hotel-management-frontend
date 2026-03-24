import { useState, useEffect } from "react";
import axios from "axios";

export default function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeedbacks = () => {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication error: No login token found.");
            setIsLoading(false);
            return;
        }

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/feedback", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            // Mapping defensively assuming res.data.feedbacks or res.data as the array
            setFeedbacks(res.data.feedbacks || res.data || []);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching feedbacks:", err);
            setError("Failed to fetch feedback data from the server.");
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-4 flex text-lg font-semibold text-gray-700">Loading Feedback...</span>
            </div>
        );
    }
  
    if (error) {
        return (
            <div className="w-full text-center py-20">
                <div className="text-red-600 font-bold text-xl">{error}</div>
                <button 
                    onClick={fetchFeedbacks}
                    className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded shadow hover:bg-red-200 font-semibold transition"
                >
                    Retry API Request
                </button>
            </div>
        );
    }

    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">Guest Feedback</h2>
        
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Message</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feedbacks.length === 0 ? (
                  <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium">
                          No feedback available in the database.
                      </td>
                  </tr>
              ) : (
                  feedbacks.map((feedback) => (
                    <tr key={feedback._id || feedback.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium whitespace-nowrap">{feedback.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{feedback.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {/* Handling variable payload bindings matching standard string outputs */}
                        {feedback.message || feedback.description || feedback.comment}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {feedback.date 
                            ? new Date(feedback.date).toLocaleDateString() 
                            : feedback.createdAt 
                                ? new Date(feedback.createdAt).toLocaleDateString() 
                                : "-"}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
}