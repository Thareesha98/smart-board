import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBar = ({ title, subtitle, notificationCount, userAvatar, userName, userProfilePath = "/ownerLayout/profile" }) => {
    return (
        <header
            className="content-header flex justify-between items-center p-6 rounded-[25px] shadow-lg sticky top-0 z-10"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                boxShadow: "var(--shadow)",
            }}
        >
            <div className="header-left flex flex-col">
                <h1 className="text-[1.8rem] font-bold leading-tight" style={{ color: "var(--primary)" }}>
                    {title}
                </h1>
                <p className="text-base" style={{ color: "var(--muted)" }}>
                    {subtitle}
                </p>
            </div>

            <div className="header-right flex items-center gap-6">
                <div className="notification-bell relative cursor-pointer p-3 rounded-full"
                    style={{ backgroundColor: "var(--light)", color: "var(--text)" }}>
                    <i className="fas fa-bell"></i>
                    {notificationCount > 0 && (
                        <span className="notification-count absolute top-[-5px] right-[-5px] w-5 h-5 text-[0.75rem] flex items-center justify-center font-bold rounded-full"
                            style={{ backgroundColor: "var(--error)", color: 'white' }}>
                            {notificationCount}
                        </span>
                    )}
                </div>

                <Link to={userProfilePath}>
                    <div className="user-menu flex items-center gap-3 cursor-pointer p-2 px-4 rounded-[25px] transition duration-300"
                        style={{ backgroundColor: "var(--light)", color: "var(--text)" }}>
                        <img src={userAvatar} alt={userName} className="user-avatar w-10 h-10 rounded-full object-cover"
                            style={{ border: `2px solid ${"var(--accent)"}` }} />
                        <span>{userName}</span>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default HeaderBar;