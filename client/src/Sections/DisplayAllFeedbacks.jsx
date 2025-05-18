import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Toast from '../Components/Toast';

const DisplayAllFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editDialog, setEditDialog] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });

    // Fetch feedbacks from API
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('/api/feedbacks');
                setFeedbacks(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    // Handle delete feedback
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            try {
                setLoading(true)
                await axios.delete(`/api/feedbacks/${id}`);
                setFeedbacks(feedbacks.filter(fb => fb.id !== id));
                Toast('Feedback removed permanently!', '❌');
                setLoading(false)
            } catch (error) {
                console.error('Error deleting feedback:', error);
                Toast('Failed to delete feedback!', '❌');
                setLoading(false)
            }
        }
    };

    // Handle edit feedback
    const handleEdit = (feedback) => {
        setSelectedFeedback(feedback);
        setFormData({
            name: feedback.name,
            email: feedback.email,
            message: feedback.message
        });
        setEditDialog(true);
    };

    // Update feedback
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `/api/feedbacks/${selectedFeedback.id}`,
                formData
            );
            setFeedbacks(feedbacks.map(fb =>
                fb.id === selectedFeedback.id ? response.data : fb
            ));
            Toast('Changes saved successfully!', '✅');
            setEditDialog(false);
        } catch (error) {
            console.error('Error updating feedback:', error);
            Toast('Failed to update feedback!', '❌');
        }
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;

    return (
        <div className="p-4 max-w-full mx-auto">
            <h1 className="text-2xl font-bold mb-6">All Feedbacks</h1>

            <div className="overflow-x-auto rounded-lg border">
                <div className="bg-gray-50 grid grid-cols-12 gap-4 p-3 font-semibold">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-2">Name</div>
                    <div className="col-span-4">Email</div>
                    <div className="col-span-3">Time</div>
                    <div className="col-span-2">Actions</div>
                </div>

                {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="grid grid-cols-12 gap-4 p-3 border-t hover:bg-gray-50 text-sm">
                        <div className="col-span-1">{feedback.id}</div>
                        <div className="col-span-2">{feedback.name}</div>
                        <div className="col-span-4">{feedback.email}</div>
                        <div className="col-span-3">
                            {format(new Date(feedback.created_at), 'dd/MM/yy HH:mm')}
                        </div>
                        <div className="col-span-2 flex gap-2">
                            <button
                                onClick={() => handleEdit(feedback)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(feedback.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Dialog */}
            {editDialog && (
                <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-lg flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Feedback</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Feedback</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full p-2 border rounded h-24"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditDialog(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {feedbacks.length === 0 && !loading && (
                <div className="text-center p-8 text-gray-500">
                    No feedbacks found
                </div>
            )}
        </div>
    );
};

export default DisplayAllFeedbacks;