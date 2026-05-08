import React, { useState } from "react";
import api from "../../lib/api";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const ReturnExchangeForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);

  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
    reason: "",
    resolution: "",
    additionalDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agree) {
      setError("Please agree to the data collection policy");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.post(`/contact`, {
        type: "return-exchange",
        ...formData,
      });

      setSuccess(true);
      setFormData({
        orderNumber: "",
        email: "",
        reason: "",
        resolution: "",
        additionalDetails: "",
      });
      setAgree(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 md:p-10 shadow-lg shadow-blue-100/30 border-2 border-slate-100 space-y-6 backdrop-blur-sm"
      onSubmit={handleSubmit}
    >
      {/* Form Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-2">Quick Return Request</h3>
        <p className="text-slate-600 text-sm">Fill in the details below and we'll process your request within 24 hours</p>
      </div>

      {/* Row 1: Order & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-3">Order Number *</label>
          <input
            type="text"
            name="orderNumber"
            placeholder="e.g., ORD-2026-001234"
            value={formData.orderNumber}
            onChange={handleChange}
            required
            className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-3">Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          />
        </div>
      </div>

      {/* Row 2: Reason & Resolution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-3">Reason for Return *</label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          >
            <option value="">Select a reason</option>
            <option value="wrongItem">Received the wrong item</option>
            <option value="damaged">Item arrived damaged</option>
            <option value="defective">Item is defective</option>
            <option value="missingParts">Missing parts</option>
            <option value="orderedByMistake">Ordered by mistake</option>
            <option value="other">Other reason</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-3">Preferred Resolution *</label>
          <select
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
            required
            className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          >
            <option value="">Select an option</option>
            <option value="refund">Refund</option>
            <option value="replacement">Replacement</option>
            <option value="storeCredit">Store Credit</option>
          </select>
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-3">Additional Details</label>
        <textarea
          name="additionalDetails"
          value={formData.additionalDetails}
          onChange={handleChange}
          placeholder="Provide any helpful information such as packaging condition, issue details, or notes for our support team."
          className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium resize-none"
          rows="4"
        ></textarea>
      </div>

      {/* Checkbox */}
      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
        <input
          type="checkbox"
          id="dataAgree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="w-5 h-5 mt-0.5 rounded cursor-pointer accent-blue-600"
          required
        />
        <label htmlFor="dataAgree" className="text-sm text-slate-700 font-medium cursor-pointer">
          I agree that my data is collected and stored according to the privacy policy for processing this return request.
        </label>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border-2 border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-700 text-sm">Error</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-2xl border-2 border-green-200">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-green-700 text-sm">Success!</p>
            <p className="text-green-600 text-sm">Your return request has been submitted successfully. We'll contact you within 24 hours.</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !agree}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-600 text-white font-black py-4 px-6 rounded-2xl hover:shadow-lg hover:shadow-blue-200/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          "Submit Return Request"
        )}
      </button>

      {/* Footer Note */}
      <p className="text-xs text-slate-500 text-center">
        We typically respond to return requests within 24 hours during business days.
      </p>
    </form>
  );
};

export default ReturnExchangeForm;
