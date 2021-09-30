import React, { useState } from "react";
import PropTypes from "prop-types";
export const Arrow = () => {
    const [arrowUp, setArrowUp] = useState(true);
    return (
        <button className="btn-secondary" onClick={() => setArrowUp(!arrowUp)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                {arrowUp ? (
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                ) : (
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />

                )}
            </svg>
        </button>
    );
};
Arrow.prototype = {
    arrowUp: PropTypes.bool.isRequired,
    setArrowUp: PropTypes.func.isRequired
};
