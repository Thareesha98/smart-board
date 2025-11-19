import React from 'react';

const roles = [
    { icon: 'fas fa-graduation-cap', title: 'Student', description: 'Search, compare, and book verified boardings. View payment history and raise issues.', loginText: 'Student Login' },
    { icon: 'fas fa-home', title: 'Boarding Owner', description: 'List and manage boardings. Accept/reject bookings, manage tenants, and receive payments.', loginText: 'Owner Login' },
    { icon: 'fas fa-building', title: 'University Admin', description: 'Verify boarding owners and listings. Oversee platform activity and resolve disputes.', loginText: 'Admin Login' },
];

const RolesSection = () => {
    return (
        <section id="roles" className="py-16 bg-light md:py-12">
            <div className="max-w-[1200px] mx-auto p-6">
                <h2 className="text-3xl font-bold text-center text-primary mb-4">User Roles</h2>
                <p className="text-center text-muted mb-8">SmartBoAD caters to three main user types, each with tailored functionality.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roles.map((role) => (
                        <div key={role.title} className="bg-white p-6 rounded-xl text-center shadow-custom flex flex-col justify-between">
                            <div>
                                <i className={`${role.icon} text-4xl text-accent mb-6`}></i>
                                <h3 className="text-2xl font-semibold mb-2">{role.title}</h3>
                                <p className="text-muted mb-4">{role.description}</p>
                            </div>
                            <a href="login.html" className="mt-4 w-full px-6 py-3 rounded-xl font-semibold text-white bg-primary transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-xl">
                                {role.loginText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RolesSection;