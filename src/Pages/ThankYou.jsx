import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-sky-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669]">
          Thank You!
        </h1>
        <p className="text-slate-600 text-lg mb-8 font-medium">
          Your message has been received. I'll get back to you as soon as
          possible.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] text-white rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/20 active:scale-[0.98] shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
