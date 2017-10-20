$(document).ready(function() {
    var questions = [
        'Your mind is always buzzing with unexplored ideas and plans.',
        'Generally speaking, you rely more on your experience than your imagination.',
        'You find it easy to stay relaxed and focused even when there is some pressure.',
        'You rarely do something just out of sheer curiosity.',
        'People can rarely upset you.',
        'It is often difficult for you to relate to other people’s feelings.',
        'In a discussion, truth should be more important than people’s sensitivities.',
        'You rarely get carried away by fantasies and ideas.',
        'You think that everyone’s views should be respected regardless of whether they are supported by facts or not.',
        'You feel more energetic after spending time with a group of people.'
    ];

    var choices = [
        '1 (Strongly Disagree)',
        '2',
        '3',
        '4',
        '5 (Strongly Agree)'
    ];

    var questionDiv = $('#questions');
    i = 0;

    questions.forEach(function (question) {
        i++;
     
        var item = $('<div class="question">');
        var headline = $('<h4>').text('Question ' + i);
        var questionText = $('<p>').text(question);
        var dropDown = $('<div class="form-group">');
        var select = $('<select class="form-control selector">');
        choices.forEach(function(choice) {
            var option = $('<option>').text(choice);
            select.append(option);
        });
        select.attr('id', 'select' + i);
        dropDown.append(select);
        item.append(headline, questionText, dropDown);
        var br = $('<br>');
        questionDiv.append(item, br);
    });


    $('#submit').on('click', function(event) {

        event.preventDefault();

        var userName = $('#userName').val();
        var imageLink = $('#imageLink').val();

        if (userName.length > 0 && imageLink.length >0) {
            var answers = [];

            Object.keys($('.selector')).forEach(function(key) {
                if (answers.length < questions.length) {
                    answers.push($('.selector')[key].value.charAt(0));
                }
            });

            var surveyData = {
                name: userName,
                photo: imageLink,
                answers: answers
            };

            $.post('/api/friends', surveyData, function(data) {

                if (data) {
                    $('#modalContent').empty();
                    $('#userName').val('');
                    $('#imageLink').val('');

                    data.forEach(function(profile) {
                        var profileDiv = $('<div class="profile">');
                        var name = profile.name;
                        var photoURL = profile.photo;
                        var nameHeader = $('<h3>').text(name);
                        var photo = $('<img>').attr('src', photoURL);
                        profileDiv.append(nameHeader, photo);

                        $('#modalContent').append(profileDiv);
                    });

                    if (data.length > 1) {
                        $('.modal-title').text('Your best matches!');
                    } else {
                        $('.modal-title').text('Your best match!');
                    }

                    $('#resultModal').modal();
                }
            });
        } else {
            $('#errorModal').modal();
        }
    });
});
