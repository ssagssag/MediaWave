import { useState } from 'react';

interface DetailButtonsProps {
  movieId: number;
  onFavoriteClick?: () => void;
  onReviewClick?: () => void;
  onCommentClick?: () => void;
  onShareClick?: () => void;
}

interface ButtonConfig {
  id: string;
  icon: string;
  label: string;
  action: () => void;
}

export default function DetailButtons({
  movieId,
  onFavoriteClick,
  onReviewClick,
  onCommentClick,
  onShareClick,
}: DetailButtonsProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavoriteClick?.();
  };

  const buttons: ButtonConfig[] = [
    {
      id: 'favorite',
      icon: 'favorite.svg',
      label: 'Favorite',
      action: handleFavoriteClick,
    },
    {
      id: 'review',
      icon: 'review.svg',
      label: 'Review',
      action: () => onReviewClick?.(),
    },
    {
      id: 'comment',
      icon: 'comment.svg',
      label: 'Comment',
      action: () => onCommentClick?.(),
    },
    {
      id: 'share',
      icon: 'share.svg',
      label: 'Share',
      action: () => onShareClick?.(),
    },
  ];

  return (
    <div className="flex items-center gap-6">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={button.action}
          className="flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
        >
          <img
            src={`/src/assets/detailPage/${button.icon}`}
            alt={button.label}
            className={`w-8 h-8 ${
              button.id === 'favorite' && isFavorite ? 'filter brightness-0 invert' : ''
            }`}
          />
          <span className="text-white text-info-sm font-pretendard">{button.label}</span>
        </button>
      ))}
    </div>
  );
}