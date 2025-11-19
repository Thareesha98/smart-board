import React from 'react';

const teamMembers = [
    { name: 'Shareesha Perera', role: 'Full-Stack Developer', img: 'https://randomuser.me/api/portraits/women/50.jpg' },
    { name: 'K. D. C. G. Kapugama', role: 'Project Supervisor', img: 'https://randomuser.me/api/portraits/men/41.jpg' },
    { name: 'Rashmi Fernando', role: 'Frontend Engineer', img: 'https://randomuser.me/api/portraits/women/45.jpg' },
    { name: 'Isuru Jayasinghe', role: 'UI/UX Designer', img: 'https://randomuser.me/api/portraits/men/57.jpg' },
];

const TeamSection = () => {
    return (
        <section id="team" className="py-16 bg-[#DED0B8] md:py-12">
            <div className="max-w-[1200px] mx-auto p-6">
                <h2 className="text-3xl font-bold text-center text-primary mb-4">Our Team</h2>
                <p className="text-center text-muted mb-8">Meet the team behind SmartBoAD's development.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="bg-white p-6 rounded-xl shadow-custom text-center w-full transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-2xl">
                            <img src={member.img} alt={member.name} className="w-[100px] h-[100px] rounded-full object-cover mb-4 mx-auto border-4 border-secondary-accent" />
                            <h4 className="text-lg font-bold text-primary mb-1">{member.name}</h4>
                            <p className="text-muted text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;