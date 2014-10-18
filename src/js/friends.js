/*global $$*/

var friends = (function() {
    "use strict";

    var friends = {};

    friends.init = function () {
        // TODO renderFriends();
    };

    var renderFriends = function (friends) {
        var grouped = fjs.group(function(c) {
            return c.name.toUpperCase().charAt(0);
        }, friends);

        var html = "";

        for (var letter in grouped) {
            if (grouped.hasOwnProperty(letter)) {
                html += "<li class='list-group-title'>" + letter + "</li>";
                html += getFriendsLetterHtml(grouped[letter]).join("");
            }
        }

        $$("#friends").html("<ul>" + html + "</ul>");
    };

    var getFriendsLetterHtml = fjs.map(function(friend) {
        return "<li><a href='#' class='item-link'><div class='item-content'>" +
            "</div><div class='item-inner'><div class='item-title'>" +
            friend.name + "</div></div></div></a></li>";
    });

    return friends;
})();
