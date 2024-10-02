import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './RequestPopup.css';

const RequestPopup = ({ department, onClose }) => {
    const [requests, setRequests] = useState([]);
    const [selectedRequests, setSelectedRequests] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/locations')
            .then(res => setLocations(res.data))
            .catch(err => console.error('Error fetching locations:', err));
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8081/requests', {
            params: { department, location: selectedLocation }
        })
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching requests:', err);
                setLoading(false);
            });
    }, [selectedLocation, department]);

    const handleCheckboxChange = (id, status) => {
        setSelectedRequests(prev => ({
            ...prev,
            [id]: status
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8081/approve-requests', { approvals: selectedRequests });
            onClose();
        } catch (err) {
            console.error('Error submitting approvals:', err);
        }
    };

    return (
        <div className="request-popup">
            <div className="modal-overlay">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Request Approvals</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="filter-section">
                                <label htmlFor="location-select">Location:</label>
                                <select
                                    id="location-select"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                >
                                    <option value="">All Locations</option>
                                    {locations.map((location, index) => (
                                        <option key={index} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <div className="table-container">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Sno</th>
                                                <th>Product</th>
                                                <th>Project</th>
                                                <th>Student Name</th>
                                                <th>Student ID</th>
                                                <th>Location</th>
                                                <th>Quantity</th>
                                                <th>Type</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests.length > 0 ? (
                                                requests.map((request, index) => (
                                                    <tr key={index}>
                                                        <td data-label="Sno">{index + 1}</td>
                                                        <td data-label="Product">{request.product}</td>
                                                        <td data-label="Project">{request.project}</td>
                                                        <td data-label="Student Name">{request.student_name}</td>
                                                        <td data-label="Student ID">{request.student_id}</td>
                                                        <td data-label="Location">{request.location}</td>
                                                        <td data-label="Quantity">{request.quantity}</td>
                                                        <td data-label="Type">{request.type}</td>
                                                        <td data-label="Actions">
                                                            <div className="action-buttons">
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`status-${request.Sno}`}
                                                                        checked={selectedRequests[request.Sno] === 'approve'}
                                                                        onChange={() => handleCheckboxChange(request.Sno, 'approve')}
                                                                    /> Approve
                                                                </label>
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`status-${request.Sno}`}
                                                                        checked={selectedRequests[request.Sno] === 'reject'}
                                                                        onChange={() => handleCheckboxChange(request.Sno, 'reject')}
                                                                    /> Reject
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="9">No requests available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

RequestPopup.propTypes = {
    department: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default RequestPopup;
