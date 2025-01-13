import MediaCardItem from "./MediaCardItem";

export default function MediaCard({ media }: MediaCardProps) {
  
  return (
    <div className={`
      grid grid-cols-1 sm:grid-cols-2 gap-y-14 gap-x-14 
      w-full max-w-screen-lg overflow-hidden mt-10
      `}>
      {media.map((item) => 
        <MediaCardItem key={item.id} item={item}  />
      )}
    </div>
  );
}
