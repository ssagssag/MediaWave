import Nowplaying from "./Nowplaying";
import Popular from "./Popular";
import Upcoming from "./Upcoming";

export default function Movies() {
  return (
    <div>
      <div>
        <Nowplaying />
        <Popular />
        <Upcoming />
      </div>
    </div>
  );
}
