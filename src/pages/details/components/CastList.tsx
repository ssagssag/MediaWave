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

export default function CastList({ cast }: CastListProps) {
  return (
    <div className="mt-28">
      <h2 className="mb-6 text-2xl font-bold text-white">출연진 / 감독</h2>
      <div className="flex flex-wrap gap-6"> {/* space-x 대신 gap 사용 */}
        {cast.map((member) => (
          <div key={member.id} className="flex flex-col items-center w-32"> {/* w-full 대신 고정 너비 사용 */}
            <div className="w-32 h-32 mb-2 overflow-hidden rounded-full">
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="font-medium text-main-100 text-info-base">{member.name}</p>
            <p className="text-gray-400 text-main-100 text-info-base">{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}