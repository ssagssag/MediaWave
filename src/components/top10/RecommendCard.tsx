import RecommendItem from "./RecommendItem";

export default function RecommendCard({movie}:MovieItem) {
  return (
    <div>
      <RecommendItem movie={movie}/>
    </div>
  )
}
