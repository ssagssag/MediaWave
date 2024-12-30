import Nowplaying from "./Nowplaying";
import Popular from "./Popular";
import Upcoming from "./Upcoming";

export default function Movies() {
  return (
    <div className="mt-10">
      <Nowplaying />
      <Popular />
      <Upcoming />
    </div>
  );
}
