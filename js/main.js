
let articlesArr = [];
let mergedArray = [];

const firstArticles = 'http://64.225.73.88:9078/articles/';
const secondArticles = 'http://64.225.73.88:9078/articles/2';

$(document).ready(() => {
    getArticles();

});

const getArticles = () => {
    $.get(firstArticles, (data) => {
        for (let i = 0; i < data.length; i++) {
            articlesArr.push(data[i]);
        }
    });

    setTimeout(() => {
        $.get(secondArticles, (data) => {
            articlesArr.push(data);
        });
    }, 200)

    setTimeout(() => {
        const arrayHashmap = articlesArr.reduce((obj, item) => {
            obj[item.id] ? obj[item.id].comments.push(...item.comments) : (obj[item.id] = { ...item });
            return obj;
          }, {});
          
        mergedArray = Object.values(arrayHashmap); 

        for (let i = 0; i < mergedArray.length; i++) {
            let article = $('<div>', {
                class: 'article',
                articleId: mergedArray[i].id,
                click: () => {
                    goToArticle(mergedArray[i].id);
                }
            }).appendTo($('#articleContent'));

            let articleTitle = $('<p>', {
                class: 'articleTitle',
                text: mergedArray[i].title
            }).appendTo(article);

            if (mergedArray[i].comments.length !== 0) {
                let date = mergedArray[i].comments[mergedArray[i].comments.length - 1].updated_at;
                let finalDate = new Date(date);
                let articleDate = $('<p>', {
                    class: 'articleDate',
                    text: configureDate(finalDate)
                }).appendTo(article);
            }
        }
    }, 1000)
}

const goToArticle = (articleId) => {
    for (let i = 0; i < mergedArray.length; i++) {
        if (articleId == mergedArray[i].id) {
            $('#chosenArticleTitle').html(mergedArray[i].title);
            $('#chosenArticleContent').html(mergedArray[i].content);
            
            if (mergedArray[i].comments.length !== 0) {
                for (let j = 0; j < mergedArray[i].comments.length; j++) {
                    let option = $('<option>', {
                        value: mergedArray[i].comments[j].id,
                        text: mergedArray[i].comments[j].id
                    }).appendTo($('#commentSelect'))

                    let finalClass;

                    if (mergedArray[i].comments[j].id == 1) {
                        finalClass = 'comment topComment comment' + mergedArray[i].comments[j].id;
                    } else if (mergedArray[i].comments[j].id == mergedArray[i].comments[mergedArray[i].comments.length - 1].id) {
                        finalClass = 'comment bottomComment comment' + mergedArray[i].comments[j].id;
                    } else {
                        finalClass = 'comment comment' + mergedArray[i].comments[j].id;
                    }

                    let comment = $('<div>', {
                        class: finalClass,
                        commentId: mergedArray[i].comments[j].id
                    }).appendTo($('#commetsContent'));

                    let commentTitle = $('<p>', {
                        class: 'commentTitle',
                        text: mergedArray[i].comments[j].title
                    }).appendTo(comment);

                    let commentContent = $('<p>', {
                        class: 'commentContent',
                        text: mergedArray[i].comments[j].content
                    }).appendTo(comment);
                    
                    if (mergedArray[i].comments[j].response_to_comment_id !== null) {
                        let commentResponse = $('<p>', {
                            class: 'commentResponse',
                            text: 'בתגובה להודעה מספר ' + mergedArray[i].comments[j].response_to_comment_id
                        }).appendTo(comment);
                    }
                }
                $('.hidden, #commentsHeader').show();
            } else {
                $('.hidden, #commentsHeader').hide();
                $('#noComments').show();
            }
        } 
    }
    
    $('#articleContainer').hide();
    $('#chosenArticle, #backHomeBtn').show();
}

const goHome = () => {
    $('#articleContainer').show();
    $('#chosenArticle, #backHomeBtn, #noComments').hide();
    $('#commetsContent, #selectCommentWrapper').empty();
}

const goToComment = (type) => {
    let comment;
    switch (type) {
        case 1:
            comment = document.querySelector('.topComment');
            comment.scrollIntoView({ behavior: 'smooth' });
            break;
        case 2:
            comment = document.querySelector('.bottomComment');
            comment.scrollIntoView({ behavior: 'smooth' });
            break;
        case 3:
            $('main').css({'pointer-events': 'none', 'opacity': .3});
            $('#commentsPopup').show();
            break;
    
        default:
            return;
            break;
    }

    $(comment).css('border', '1px solid black');
    setTimeout(() => {
        $(comment).css('border', 'none');
    }, 1500)
}

const jumpToComment = () => {
    let selectedValue = $('#commentSelect').val();
    $.each($('.comment'), function (key, value) {
        if ($(value).attr('commentid') == selectedValue) {
            $('main').css({'pointer-events': 'all', 'opacity': 1});
            $('#commentsPopup').hide();
            let div = document.querySelector('.comment' + selectedValue);
            div.scrollIntoView({ behavior: 'smooth' });

            $(div).css('border', '1px solid black');
            setTimeout(() => {
                $(div).css('border', 'none');
            }, 1500)
        }
    });
}