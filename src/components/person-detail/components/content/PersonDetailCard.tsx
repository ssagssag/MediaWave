import { Link } from "react-router";
import { T_movieCast, T_movieCrew, T_personProfile, T_tvCast, T_tvCrew } from "../../../../types/person";
import { IMAGE_BASE_URL } from "../../../../constants/urls";

export default function PersonDetailCard({
  movie,
  tvProgram,
  profile,
}: {
  movie?: T_movieCast | T_movieCrew;
  tvProgram?: T_tvCast | T_tvCrew;
  profile?: T_personProfile;
}) {
  return (
    <>
      {movie !== undefined && (
        <Link to={`/movie/${movie.id}`}>
          <article className="rounded-xl">
            <img
              src={`${IMAGE_BASE_URL}/original/${movie.poster_path}`}
              alt="포스터 이미지"
              className="w-full h-full object-cover rounded-xl"
            />
          </article>
        </Link>
      )}
      {tvProgram !== undefined && (
        <Link to={`/tv/${tvProgram.id}`}>
          <article className="rounded-xl">
            <img
              src={`${IMAGE_BASE_URL}/original/${tvProgram.poster_path}`}
              alt="포스터 이미지"
              className="w-full h-full object-cover rounded-xl"
            />
          </article>
        </Link>
      )}
      {profile !== undefined && (
        <article className="rounded-xl">
          <img
            src={`${IMAGE_BASE_URL}/original/${profile.file_path}`}
            alt="포스터 이미지"
            className="w-full h-full object-cover rounded-xl"
          />
        </article>
      )}
    </>
  );
}
