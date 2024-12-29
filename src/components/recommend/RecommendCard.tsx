import RecommendItem from "./RecommendItem";

export default function RecommendCard({movie}:RecommendProps) {
  return (
    <div>
      <RecommendItem movie={movie}/>
    </div>
  )
}
