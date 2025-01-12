import getPersonImg from '../../../utils/getPersonImg';

const DetailComment = () => {
  
  // 더미 데이터
  const comments = [
    {
      id: 1,
      rating: 4,
      content: "아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치"
    },
    {
      id: 2,
      rating: 5,
      content: "아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치"
    },
    {
      id: 3,
      rating: 3,
      content: "아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치"
    },
    {
      id: 4,
      rating: 5,
      content: "아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치아무말이나 막 해~ 왜들 그리 다운되있어 분위기가 겁나 싹싹 김치"
    },
  ];

  return (
    <div className="w-full max-w-[1520px] mx-auto max-[1519px]:p-8 pb-24">
      <h2 className="pt-6 pb-4 text-white text-title-md">댓글 목록</h2>
      <div className="flex flex-wrap gap-4">
        {comments.map((comment) => (
          <article 
            key={comment.id} 
            className="flex gap-4 p-6 text-white border border-white/10 rounded-2xl basis-[calc(50%-8px)]"
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                <img 
                  src={getPersonImg()}
                  alt="User profile" 
                  className="object-cover w-full h-full" 
                />
              </div>
            </div>
            
            {/* Comment Content */}
            <div className="flex flex-col flex-1 gap-2">
              {/* Stars */}
              <ul className="flex gap-0.5">
                {[...Array(comment.rating)].map((_, i) => (
                  <li key={i}>⭐️</li>
                ))}
              </ul>
              
              {/* Comment Text */}
              <div className="font-light leading-relaxed break-words whitespace-pre-wrap opacity-90">
                {comment.content}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DetailComment;