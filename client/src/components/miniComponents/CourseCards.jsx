import "../../assets/css/courseCard.css";
import placeholder from "../../assets/img/CookingCourse.png";

export default function CourseCard(props) {
  return (
    <div className="CourseCard">
      <h1>{props.title}</h1>
      <img src={placeholder}></img>
      {/* This is just a placeholder picture until we can get the database setup */}
      <p>{props.desc}</p>
      <p>{props.price}</p>
    </div>
  );
}

// {
//     name: "Introduction to Programming",
//     slug: "intro-to-programming",
//     description: "Learn the basics of programming.",
//     price: 19.99,
//     image: "/avatar.png",
//     category: "Programming",
//     published: true,
//     paid: true,
//     instructor: "8832F265FBDC234CDEAD5926",
//     lessons: [],
//   },
