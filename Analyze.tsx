import { useState, useEffect } from "react";
import axios from "axios";
import {
  Stethoscope,
  ClipboardCheck,
  Activity,
  AlertTriangle,
  X,
  CalendarCheck, // Booking icon
} from "lucide-react";
import { Cardio } from "ldrs/react"; // Import Cardio animation
import "ldrs/react/Cardio.css"; // Import Cardio CSS

function Analyze() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filePath = localStorage.getItem("filePath") || "";

  const fetchSummary = async () => {
    if (!filePath) {
      setError("No file path found. Please upload a file first.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      console.log("Fetching summary for file:", filePath);

      const response = await axios.post("http://localhost:5000/analyze", {
        file_path: filePath,
      });

      console.log("API Response:", response.data);

      if (response.data.error) {
        setError(response.data.error);
        setSummary(null);
      } else {
        setSummary(response.data);
        setIsOpen(true);
      }
    } catch (err) {
      console.error("Error fetching summary:", err);
      setError("Failed to load summary. Please check if the backend is running.");
    }

    setLoading(false);
  };

  const handleBooking = () => {
    alert("Booking system coming soon! 🚀");
  };

  useEffect(() => {
    fetchSummary();
  }, [filePath]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <button
        onClick={fetchSummary}
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
        disabled={loading}
      >
        {loading ? <Cardio size="50" stroke="4" speed="2" color="white" /> : <Stethoscope className="h-6 w-6" />}
        <span>{loading ? "Analyzing..." : "Analyze Medical Report"}</span>
      </button>

      {/* Full-Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="w-full h-full bg-white shadow-lg overflow-y-auto p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 bg-gray-200 p-4 rounded-full hover:bg-gray-300 transition duration-200"
            >
              <X className="h-7 w-7 text-gray-700" />
            </button>

            {/* Bigger Booking Button at the Top Right */}
            <button
              onClick={handleBooking}
              className="absolute top-6 right-24 px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-xl flex items-center space-x-3 shadow-lg hover:bg-green-700 transition duration-200"
            >
              <CalendarCheck className="h-6 w-6" />
              <span>Book a Specialist</span>
            </button>

            {/* Header */}
            <div className="flex items-center space-x-4 border-b pb-4">
              <Stethoscope className="h-12 w-12 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Medical Report Analysis</h1>
                <p className="text-gray-500 text-lg">Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Content Area */}
            <div className="mt-6 space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                  <Cardio size="80" stroke="4" speed="1.5" color="blue" />
                  <p className="mt-4 text-gray-500 text-lg">Generating summary...</p>
                </div>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : summary ? (
                <div className="space-y-6">
                  {/* Summary Panel */}
                  <div className="bg-gray-100 shadow-lg rounded-xl p-6 border-l-4 border-purple-500">
                    <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
                    <p className="text-gray-700">{summary.summary || "No summary available."}</p>
                  </div>

                  {/* Diagnosis Panel */}
                  <div className="bg-gray-100 shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
                    <h2 className="text-2xl font-semibold text-gray-800">Diagnosis</h2>
                    <p className="text-gray-700">{summary.diagnosis || "No diagnosis available."}</p>
                  </div>

                  {/* Key Findings Panel */}
                  <div className="bg-gray-100 shadow-lg rounded-xl p-6 border-l-4 border-green-500">
                    <h2 className="text-2xl font-semibold text-gray-800">Key Findings</h2>
                    <ul className="list-disc list-inside text-gray-700">
                      {summary.key_findings && Array.isArray(summary.key_findings) ? (
                        summary.key_findings.map((item: string, index: number) => <li key={index}>{item}</li>)
                      ) : (
                        <p>No key findings available.</p>
                      )}
                    </ul>
                  </div>

                  {/* Urgent Concerns Panel */}
                  {summary.urgent_concerns && (
                    <div className="bg-gray-100 shadow-lg rounded-xl p-6 border-l-4 border-red-500">
                      <h2 className="text-2xl font-semibold text-red-800">Urgent Concerns</h2>
                      <p className="text-red-700">{summary.urgent_concerns}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-500">No summary available. Try uploading a different file.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analyze;
