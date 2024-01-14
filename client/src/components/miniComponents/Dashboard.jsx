import placeHolder from "../../assets/img/UserImg.png";

export default function Dashboard(props) {
  return (
    <div className={props.className}>
      <img className="UserPic" src={placeHolder} alt="UserPicture" />
    </div>
  );
}
