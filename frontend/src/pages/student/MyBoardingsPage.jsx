// src/pages/student/MyBoardingsPage.jsx
import BoardingGrid from "../../components/BoardingGrid/BoardingGrid";
import BoardingCard from "../../components/BoardingCard/BoardingCard";
import "./MyBoardingsPage.css";

export default function MyBoardingsPage() {
  const boardings = [
    {
      id: "b1",
      title: "Cozy Room in Colombo 05",
      location: "Colombo 05",
      price: 15000,
      gender: "unisex",
      thumbnail: "/room-sample.jpg",
    },
    {
      id: "b2",
      title: "Shared Room for Female Students",
      location: "Colombo 07",
      price: 12000,
      gender: "female",
      thumbnail: "/room-sample-2.jpg",
    },
  ];

  return (
    <div className="myboardings-page">

      <h2 className="myboardings-title">My Boardings</h2>

      <BoardingGrid
        items={boardings.map((b) => ({
          id: b.id,
          component: (
            <BoardingCard
              id={b.id}
              title={b.title}
              location={b.location}
              price={b.price}
              gender={b.gender}
              thumbnail={b.thumbnail}
            />
          ),
        }))}
      />

    </div>
  );
}
