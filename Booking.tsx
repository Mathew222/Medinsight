import React, { useState } from 'react';
import { Search, Calendar, Clock, Stethoscope, GraduationCap, Download, Lightbulb, CheckCircle, X } from 'lucide-react';
import * as XLSX from 'xlsx';
import Analyze from './Analyze';
import App from './Account';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    education: string;
    experience: string;
    image: string;
    availability: string[];
}

const doctors: Doctor[] = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialization: "Cardiologist",
        education: "MD - Cardiology, MBBS",
        experience: "15 years",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
        availability: ["Mon - Fri", "9:00 AM - 5:00 PM"]
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialization: "Neurologist",
        education: "MD - Neurology, PhD",
        experience: "12 years",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
        availability: ["Tue - Thu", "10:00 AM - 6:00 PM"]
    },
    {
        id: 3,
        name: "Dr. Emily Wilson",
        specialization: "Pediatrician",
        education: "MD - Pediatrics",
        experience: "8 years",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
        availability: ["Mon - Wed - Fri", "8:00 AM - 4:00 PM"]
    }
];

interface BookingProps {
    onClose: () => void;
    analysisData: {
        summary?: string;
        diagnosis?: string;
        key_findings?: string[];
        urgent_concerns?: string;
    };
}

interface BookingDetails {
    doctorName: string;
    patientName: string;
    date: string;
    time: string;
    phone: string;
    email: string;
    reason: string;
}

function Booking({ onClose, analysisData }: BookingProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [bookingStep, setBookingStep] = useState(0);
    const [bookings, setBookings] = useState<BookingDetails[]>([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        date: '',
        time: '',
        name: '',
        phone: '',
        email: '',
        reason: analysisData.diagnosis || '' // Pre-fill with diagnosis if available
    });

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBooking = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setBookingStep(1);
        setShowConfirmation(false);
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBooking: BookingDetails = {
            doctorName: selectedDoctor?.name || '',
            patientName: bookingDetails.name,
            date: bookingDetails.date,
            time: bookingDetails.time,
            phone: bookingDetails.phone,
            email: bookingDetails.email,
            reason: bookingDetails.reason
        };

        setBookings([...bookings, newBooking]);

        // Export to Excel
        const ws = XLSX.utils.json_to_sheet([...bookings, newBooking]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Bookings");
        XLSX.writeFile(wb, "doctor-appointments.xlsx");

        setShowConfirmation(true);
    };

    const resetForm = () => {
        setBookingStep(0);
        setSelectedDoctor(null);
        setShowConfirmation(false);
        setBookingDetails({
            date: '',
            time: '',
            name: '',
            phone: '',
            email: '',
            reason: analysisData.diagnosis || ''
        });
    };

    const exportToExcel = () => {
        if (bookings.length === 0) {
            alert("No bookings to export");
            return;
        }
        const ws = XLSX.utils.json_to_sheet(bookings);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Bookings");
        XLSX.writeFile(wb, "doctor-appointments.xlsx");
    };

    const suggestDoctor = () => {
        if (analysisData.diagnosis) {
            // Suggest based on diagnosis if available
            const suggestedSpecialization = analysisData.diagnosis.includes('cardiac') ? 'Cardiologist' :
                                          analysisData.diagnosis.includes('neuro') ? 'Neurologist' :
                                          'General Physician';
            
            const suggestedDoctors = doctors.filter(d => 
                d.specialization === suggestedSpecialization
            );
            
            if (suggestedDoctors.length > 0) {
                const doctor = suggestedDoctors[0];
                alert(`Based on your diagnosis, we recommend consulting ${doctor.name}, ${doctor.specialization}`);
                return;
            }
        }
        
        // Fallback to random suggestion
        const randomIndex = Math.floor(Math.random() * doctors.length);
        const suggestedDoctor = doctors[randomIndex];
        alert(`We suggest consulting ${suggestedDoctor.name}, ${suggestedDoctor.specialization}`);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4">
            <div className="w-full max-w-6xl max-h-[90vh] bg-white rounded-xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-white shadow-sm sticky top-0 z-10 p-4 flex justify-between items-center border-b">
                    <h1 className="text-2xl font-bold text-gray-900">Doctor Appointment Booking</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={suggestDoctor}
                            className="flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                            title="Get doctor recommendation"
                        >
                            <Lightbulb size={16} className="mr-1" />
                            Suggest
                        </button>
                        <button
                            onClick={exportToExcel}
                            className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                            title="Export bookings to Excel"
                        >
                            <Download size={16} className="mr-1" />
                            Export
                        </button>
                        <button
                            onClick={onClose}
                            className="flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                            title="Close booking"
                        >
                            <X size={16} className="mr-1" />
                            Close
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="overflow-y-auto flex-1 p-4">
                    {/* Analysis Summary */}
                    {analysisData && (
                        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2 text-blue-800">Your Medical Summary</h2>
                            {analysisData.diagnosis && (
                                <p className="mb-2">
                                    <span className="font-medium">Diagnosis:</span> {analysisData.diagnosis}
                                </p>
                            )}
                            {analysisData.urgent_concerns && (
                                <p className="text-red-600 font-medium">
                                    <span className="font-bold">Urgent:</span> {analysisData.urgent_concerns}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search doctors by name or specialization..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {showConfirmation ? (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md text-center">
                                <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                                <p className="text-gray-600 mb-4">Your appointment has been scheduled successfully.</p>
                                <button
                                    onClick={resetForm}
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Book Another Appointment
                                </button>
                            </div>
                        </div>
                    ) : bookingStep === 0 ? (
                        /* Doctor Listing */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredDoctors.map(doctor => (
                                <div key={doctor.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <img 
                                        src={doctor.image} 
                                        alt={doctor.name} 
                                        className="w-full h-40 object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Doctor+Image';
                                        }}
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-gray-900">{doctor.name}</h2>
                                        <div className="flex items-center mt-1 text-gray-600 text-sm">
                                            <Stethoscope size={14} className="mr-1.5" />
                                            <span>{doctor.specialization}</span>
                                        </div>
                                        <div className="flex items-center mt-1 text-gray-600 text-sm">
                                            <GraduationCap size={14} className="mr-1.5" />
                                            <span>{doctor.education}</span>
                                        </div>
                                        <div className="flex items-center mt-1 text-gray-600 text-sm">
                                            <Clock size={14} className="mr-1.5" />
                                            <span>{doctor.experience}</span>
                                        </div>
                                        <div className="mt-3">
                                            <button
                                                onClick={() => handleBooking(doctor)}
                                                className="w-full bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Booking Form */
                        <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-4">
                            <h2 className="text-xl font-semibold mb-4">
                                Book Appointment with <span className="text-blue-600">{selectedDoctor?.name}</span>
                            </h2>
                            <p className="text-gray-600 mb-4">{selectedDoctor?.specialization}</p>
                            
                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input
                                            type="date"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={bookingDetails.date}
                                            onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                        <select
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={bookingDetails.time}
                                            onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                                        >
                                            <option value="">Select time</option>
                                            <option value="09:00">09:00 AM</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="14:00">02:00 PM</option>
                                            <option value="15:00">03:00 PM</option>
                                            <option value="16:00">04:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={bookingDetails.name}
                                        onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={bookingDetails.phone}
                                            onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={bookingDetails.email}
                                            onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                                    <textarea
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                        value={bookingDetails.reason}
                                        onChange={(e) => setBookingDetails({ ...bookingDetails, reason: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setBookingStep(0)}
                                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                    >
                                        Back to Doctors
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
