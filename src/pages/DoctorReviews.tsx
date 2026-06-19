import React, { useEffect, useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";

const DoctorReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await doctorDashboardAPI.getReviews({ page, limit: 10 });
        setReviews(res.data.reviews || []);
        setAverageRating(res.data.averageRating || 0);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patient Reviews</h1>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className={i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{averageRating.toFixed(1)}</p>
          <p className="text-gray-600">{total} reviews</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-white rounded-lg">
            <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
            <p>No reviews yet</p>
          </div>
        ) : (
          reviews.map((review: any) => (
            <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{review.patientId?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {total > 10 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {Math.ceil(total / 10)}
          </span>
          <button
            onClick={() => setPage(Math.min(Math.ceil(total / 10), page + 1))}
            disabled={page === Math.ceil(total / 10)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorReviews;
