export default function FeedbackList() {
    const feedbacks = [
      {
        id: 1,
        guestName: "Alice Brown",
        rating: 5,
        comment: "Excellent service and beautiful rooms!",
        date: "2024-12-20",
        status: "Published"
      },
      {
        id: 2,
        guestName: "Bob Johnson",
        rating: 4,
        comment: "Great experience overall, but room service was a bit slow.",
        date: "2024-12-18",
        status: "Under Review"
      }
    ];
  
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">Guest Feedback</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Guest Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Comment</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{feedback.guestName}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{feedback.rating} ⭐</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{feedback.comment}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{feedback.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      feedback.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feedback.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 hover:font-bold mr-2">Reply</button>
                    <button className="text-red-600 hover:text-red-800 hover:font-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }