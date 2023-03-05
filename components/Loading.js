import React from "react";

export default function Loading({ loading }) {

    return (
        <div className={`spinner-container ${loading ? 'true-loading' : ''}`}>
            <div className="loading-spinner"></div>
        </div>
    );
}