import "../../styles/CoursePage.css";
import image from "../../assets/img/CookingCourse.png";

export default function CoursePage() {
  return (
    <div className="CoursePageBox">
      <div className="CoursePage">
        <h1>Innovative Cooking: Fusion Cuisine from Around the World</h1>

        <img src={image} className="CourseImg"></img>
        <h2>Chef Emily Robinson</h2>
        <p>
          Dive into the world of fusion cuisine with (Innovative Cooking: Fusion
          Cuisine from Around the World), expertly guided by renowned Chef Emily
          Robinson. This course is designed for food enthusiasts and aspiring
          chefs who wish to explore the art of combining flavors from different
          cultures to create unique, mouth-watering dishes. Throughout the
          course, you will learn about the history and philosophy of fusion
          cooking, ingredient selection, flavor pairing, and innovative cooking
          techniques. Each module is packed with high-quality video tutorials,
          recipe guides, and interactive assignments to ensure a hands-on
          learning experience.
        </p>
        <p>8 Weeks (3 hours per week)</p>
        <p>$199</p>
        <button>Enroll Now</button>
      </div>
    </div>
  );
}
