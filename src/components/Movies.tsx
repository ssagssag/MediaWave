import Nowplaying from "./Nowplaying";
import Popular from "./Popular";
import Upcoming from "./Upcoming";
import Recommend from "./top10/Recommend";

export default function Movies() {
  return (
    <div>
      {/* 메인 베너 */}
      <Recommend />
      <div>
        <Nowplaying />
        <Popular />
        <Upcoming />
      </div>
    </div>
  );
}
