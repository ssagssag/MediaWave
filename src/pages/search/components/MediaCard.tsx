import MediaCardItem from "./MediaCardItem";

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <div className="grid grid-cols-2 gap-y-14 gap-x-16">
      {media.map((item) => 
        <MediaCardItem key={item.id} item={item} />
      )}
    </div>
  );
}
