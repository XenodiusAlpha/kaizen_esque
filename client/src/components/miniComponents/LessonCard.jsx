import "../../assets/css/lessonCard.css";

export default function LessonCard(props) {
  return (
    <div className="LessonCard">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  );
}
