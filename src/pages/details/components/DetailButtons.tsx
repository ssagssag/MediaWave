import { useState } from 'react';

interface DetailButtonsProps {
  tvId?: number;
  movieId?: number;
  onFavoriteClick: () => void;
  onReviewClick: () => void;
  onCommentClick: () => void;
  onShareClick: () => void;
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

  // Web Share API를 사용하여 콘텐츠 공유하기
  const handleShare = async () => {
    // 현재 도메인 + 영화 ID로 공유할 URL 생성
    const movieUrl = `${window.location.origin}/movie/${movieId}`;
    
    // navigator.share()를 지원하는지 확인
    if (navigator.share) {
      try {
        // Share API 호출
        await navigator.share({
          title: '이 영화 어때요?', // 공유 시 표시될 제목
          text: '제가 발견한 재미있는 영화를 공유합니다!', // 공유 시 표시될 설명
          url: movieUrl, // 공유할 URL
        });
        onShareClick?.(); // 공유 완료 후 콜백 실행
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          // 사용자가 공유를 취소한 경우
          return;
        }
        // 공유 실패 시 클립보드 복사로 대체
        handleClipboardCopy(movieUrl);
      }
    } else {
      // Share API를 지원하지 않는 브라우저에서는 클립보드 복사 사용
      handleClipboardCopy(movieUrl);
    }
  };

  // 클립보드에 URL 복사하기
  const handleClipboardCopy = async (url: string) => {
    try {
      // navigator.clipboard API를 사용하여 URL 복사
      await navigator.clipboard.writeText(url);
      alert('링크가 클립보드에 복사되었습니다!');
      onShareClick?.();
    } catch (error) {
      console.error('링크 복사 실패:', error);
      alert('링크 복사에 실패했습니다. 다시 시도해주세요.');
    }
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
      action: handleShare,
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