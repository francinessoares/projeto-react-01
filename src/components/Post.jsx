import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'; 
import { useState } from 'react';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css';


export function Post({ author, publishedAt, content }) {

    const [comments, setComments] = useState([
        'Poste muito bacana, hein?'
    ]);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(publishedAt[0], "dd 'de' LLLL 'às' HH:mm'h'", {
       locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt[0], {
        locale: ptBR,
        addSuffix: true,
    } )

    function handleCreateNewComment() {
        event.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange() {
        event.target.setCustomValidity('');

        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete) {
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeleteOne);
    }

    function handleNewCommentInvalid() {
        event.target.setCustomValidity('Esse campo e obrigatorio!');
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={author[0].avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author[0].name}</strong>
                        <span>{author[0].role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt[0].toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content[0].map((line) => {
                    if (line.type === 'paragraph') {
                        return <p>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p><a href="#">{line.content}</a></p>;
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name="comment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button 
                        type="submit" 
                        disabled={isNewCommentEmpty}
                        > Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment 
                        key={comment} 
                        content={comment} 
                        deleteComment={deleteComment}
                    />
                })}

            </div>
        </article>
    )
}