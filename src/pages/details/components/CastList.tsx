// components/CastList.tsx
export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

interface CastListProps {
  cast: CastMember[];
}

import getPersonImg from '../../../utils/getPersonImg';

export default function CastList({ cast }: CastListProps) {
  // 15명까지만 필터링한 배열
  const limitedCast = cast.slice(0, 15);

  return (
    <div className="pt-28 max-w-[1520px] m-auto bg-background">
      <h2 className="mb-6 text-title-md text-white">출연진 / 감독</h2>
      <div className="flex flex-wrap gap-6">
        {limitedCast.map((member) => (
          <div key={member.id} className="flex flex-col items-center w-32">
            <div className="w-32 h-32 mb-2 overflow-hidden rounded-full">
              {member.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full">
                  {getPersonImg()}
                </div>
              )}
            </div>
            <p className="font-medium text-main-100 text-info-base">{member.name}</p>
            <p className="text-gray-400 text-main-100 text-info-base">{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}