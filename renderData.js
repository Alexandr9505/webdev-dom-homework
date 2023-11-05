export const renderData = (ulElement, commentsArray) => {
	const renderComments = () => {
		return (ulElement.innerHTML = commentsArray
			.map((item, index) => {
				return ` <li class="comment">
          <div class="comment-header">
            <div>${item.author}</div>
            <div>${item.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${item.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${item.likes}</span>
              <button data-index='${index}' class="like-button ${item.paint}"</button>
            </div>
          </div>
        </li>
    `})
			.join(''));
	}
const likes = () => {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            likeButton.classList.add("loadingLike");
            delay(2000)
                .then(() => {
                    likeButton.classList.remove("loadingLike");
                    const index = likeButton.dataset.index;
                    if (commentsArray[index].isLiked === false) {
                        commentsArray[index].paint = '-active-like';
                        commentsArray[index].likes += 1;
                        commentsArray[index].isLiked = true;
                    } else {
                        commentsArray[index].paint = '';
                        commentsArray[index].likes -= 1;
                        commentsArray[index].isLiked = false;
                    }
                    renderComments();
                    likes();
                })
        });
    };
};
renderComments();
likes();
}