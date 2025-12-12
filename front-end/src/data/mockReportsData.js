// src/data/mockReportsData.js

export const initialReportsData = {
  pending: [
    {
      id: 1,
      title: "Safety Concern - Poor Electrical Wiring",
      type: "Safety",
      reporter: { name: "Saman Kumara", role: "Student", email: "saman@example.com", status: "active" },
      reported: { name: "Kamal Perera", role: "Owner", email: "kamal@example.com", status: "active", listings: 3, joined: "2023-05-15" },
      priority: "High",
      status: "pending",
      date: "2024-01-15",
      description: "There are exposed electrical wires in the common area that pose serious safety risks. Multiple students have reported getting minor shocks. The owner has been informed but no action taken for 2 weeks."
    },
    {
      id: 2,
      title: "Harassment Claim",
      type: "Conduct",
      reporter: { name: "Nimali Fernando", role: "Student", email: "nimali@example.com", status: "active" },
      reported: { name: "Priya Silva", role: "Student", email: "priya@example.com", status: "active" },
      priority: "High",
      status: "pending",
      date: "2024-01-16",
      description: "Priya has been sending unsolicited, harassing messages to Nimali regarding a dispute over a shared space. Requires immediate investigation."
    },
  ],
  investigating: [
    {
      id: 3,
      title: "False Advertisement - Price Mismatch",
      type: "Listing Issue",
      reporter: { name: "Anura Bandara", role: "Student", email: "anura@example.com", status: "active" },
      reported: { name: "Sunil Ratnayake", role: "Owner", email: "sunil@example.com", status: "active", listings: 5, joined: "2022-11-01" },
      priority: "Medium",
      status: "investigating",
      date: "2024-01-10",
      description: "The advertised price on the platform is Rs. 15,000, but the owner demanded Rs. 20,000 upon arrival. Currently contacting the owner for clarification.",
      notes: "Contacted owner on 2024-01-11. Awaiting response."
    },
  ],
  resolved: [
    {
      id: 4,
      title: "Broken Gate Lock",
      type: "Maintenance",
      reporter: { name: "Isuru Dilshan", role: "Student", email: "isuru@example.com", status: "active" },
      reported: { name: "Owner Name", role: "Owner", email: "owner@example.com", status: "active", listings: 1, joined: "2024-01-01" },
      priority: "Low",
      status: "resolved",
      date: "2023-12-25",
      resolution: "Issue confirmed and fixed by the owner on 2023-12-27. Report closed.",
      dismissalReason: "Resolved externally",
      resolvedDate: "2023-12-28"
    }
  ]
};