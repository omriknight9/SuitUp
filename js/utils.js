
const changeMonthName = (month) => {
    switch (month) {
        case 0: {
            return 'ינואר';
        }
        case 1: {
            return 'פברואר';
        }
        case 2: {
            return 'מרץ';
        }
        case 3: {
            return 'אפריל';
        }
        case 4: {
            return 'מאי';
        }
        case 5: {
            return 'יוני';
        }
        case 6: {
            return 'יולי';
        }
        case 7: {
            return 'אוגוסט';
        }
        case 8: {
            return 'ספטמבר';
        }
        case 9: {
            return 'אוקטובר';
        }
        case 10: {
            return 'נובמבר';
        }
        case 11: {
            return 'דצמבר';
        }
    }
}

const configureDate = (data) => {
    let date = new Date(data);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return changeMonthName(month - 1) + ' ' + day + ' ' + year;
}

const closePop = () => {
    $('main').css({'pointer-events': 'all', 'opacity': 1});
    $('#commentsPopup').hide();
}