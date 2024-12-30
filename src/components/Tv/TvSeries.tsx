import TopRated from "./TopRated";
import TvPopular from "./TvPopular";
import OnTheAir from "./OnTheAir";

export default function TvSeries() {

  return (
    <div className="mt-10">
      <TvPopular />
      <TopRated />
      <OnTheAir />
    </div>
  )
}
