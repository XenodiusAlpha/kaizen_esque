import placeHolder from "../../assets/img/UserImg.png";
import "../../assets/css/profile.css";

export default function Dashboard(props) {
  return (
    <div className={props.className} id={props.id}>
      <figure>
        <img className="UserPic" src={placeHolder} alt="UserPicture" />
        <figcaption>User</figcaption>
      </figure>
      <h2>SignUp date:</h2>
      <h2>Number of enrolled Courses</h2>
    </div>
  );
}
