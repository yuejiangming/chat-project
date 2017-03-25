export default class ChatPageController{
    constructor($scope, $rootScope, $auth, $state, $sce) {
        angular.extend(this, {$scope, $rootScope, $auth, $state, $sce});

        var self = this;

        this.userName = $rootScope.nickname || localStorage.getItem('profile.nickname');

        this.socket = new WebSocket('ws://127.0.0.1:8282');

        this.socket.onopen = onopen;
        this.socket.onclose = onclose;
        this.socket.onmessage = onmessage;

        this.chatContent = [];
        this.selectedUser = 'all';

        var contentContainer = document.getElementsByClassName('content-container')[0];

        function onopen() {
            var json = JSON.stringify({
                type: 'connect',
                user_name: self.userName
            });

            self.socket.send(json);
        }

        function onmessage(evt) {
            var message = JSON.parse(evt.data);
            console.log(message);

            switch(message.type) {
                case 'message':
                    var obj = {
                        name: message.name,
                        date: message.time,
                        text: toHtmlContent(message.content)
                    }

                    self.chatContent.push(obj);
                    self.$scope.$apply();
                    contentContainer.scrollTop = contentContainer.scrollHeight - contentContainer.clientHeight;
                    break;

                case 'message-private':
                    var obj = {
                        name: message.name,
                        date: message.time,
                        text: toHtmlContent('悄悄说: ' + message.content)
                    }
                    self.chatContent.push(obj);
                    self.$scope.$apply();
                    contentContainer.scrollTop = contentContainer.scrollHeight - contentContainer.clientHeight;
                    break;

                case 'user-list':
                    self.userList = message.content;
                    dropSelf(self.userList);
                    break;
            }
            self.$scope.$apply();

            function dropSelf(userList) {
                var keys = Object.keys(userList);
                keys.forEach((key) => {
                    if(userList[key] === self.userName) {
                       delete userList[key]; 
                    }
                });
            }

            function toHtmlContent(content) {
                content = content.replace(/\n/g, '<br>');
                return content.replace(/\s/g, '&nbsp;');
            }
        }
    }

    submitWord() {
        var json;

        if (this.userWord == null || this.userWord == '') {
            return;
        }

        if (this.selectedUser === 'all') {
            json = JSON.stringify({
                type: "sent-to-all",
                content: this.userWord
            });
        } else {
            json = JSON.stringify({
                type: "sent-to-single",
                target: this.selectedUser,
                content: this.userWord
            });
        }

        this.socket.send(json);
        this.userWord = '';
    }

    enterPress(event) {
        if (event.which == '13' && !event.shiftKey) {
            event.preventDefault();
            this.submitWord();
        }
    }

    trustWithSCE(string) {
        return this.$sce.trustAsHtml(string);
    }
}

ChatPageController.$inject = ['$scope', '$rootScope', '$auth', '$state', '$sce'];