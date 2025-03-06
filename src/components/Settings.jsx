import React, { useState } from "react";
import "./Settings.css";

const Settings = ({ displayMode, setDisplayMode }) => {
	return (
        <div className="settings-container">
            <h1>Settings</h1>
            <div>
                <label>
                    <input type="radio" value="sharps" checked={displayMode === "sharps"}
                        onChange={() => setDisplayMode("sharps")}
                    />
                    Sharps (#)
                </label>
                <label>
                    <input type="radio" value="flats" checked={displayMode === "flats"}
                        onChange={() => setDisplayMode("flats")}
                    />
                    Flats (b)
                </label>
            </div>

        </div>
    );
}

export default Settings;