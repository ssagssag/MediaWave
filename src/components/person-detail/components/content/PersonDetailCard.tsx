import { Link } from "react-router";
import { T_movieCast, T_movieCrew, T_personProfile, T_tvCast, T_tvCrew } from "../../../../types/person";

export default function PersonDetailCard({
  media,
  profile,
}: {
  media?: T_movieCast | T_movieCrew | T_tvCast | T_tvCrew;
  profile?: T_personProfile;
}) {
  return (
    <>
      {media !== undefined && (
        <Link to={`/movie/${media.id}`}>
          <article className="rounded-3xl">
            <img
              src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
              alt="포스터 이미지"
              className="w-full h-full object-cover rounded-3xl"
            />
          </article>
        </Link>
      )}
      {profile !== undefined && (
        <article className="rounded-3xl">
          <img
            src={`https://image.tmdb.org/t/p/original/${profile.file_path}`}
            alt="포스터 이미지"
            className="w-full h-full object-cover rounded-3xl"
          />
        </article>
      )}
    </>
  );
}
