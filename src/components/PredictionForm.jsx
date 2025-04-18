import React, { useState } from 'react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    hero_product_ratings: '',
    max_negative_rating_percent: '',
    seller_brand_count: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          hero_product_ratings: parseFloat(formData.hero_product_ratings),
          max_negative_rating_percent: parseFloat(formData.max_negative_rating_percent),
          seller_brand_count: parseInt(formData.seller_brand_count),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Product Fraud Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Hero Product Ratings:</label>
          <input
            type="number"
            step="0.1"
            name="hero_product_ratings"
            value={formData.hero_product_ratings}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>
        <div>
          <label>Max Negative Rating %:</label>
          <input
            type="number"
            step="0.1"
            name="max_negative_rating_percent"
            value={formData.max_negative_rating_percent}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>
        <div>
          <label>Seller Brand Count:</label>
          <input
            type="number"
            name="seller_brand_count"
            value={formData.seller_brand_count}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 bg-green-700 rounded">
          <strong>Prediction Result:</strong>
          <div className="mt-2">
            <p><strong>Predicted Performance Score:</strong> {result.predicted_performance_score}</p>
            <p><strong>RMSE:</strong> {result.model_info.RMSE}</p>
            <p><strong>R² Score:</strong> {result.model_info.R2_Score}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
