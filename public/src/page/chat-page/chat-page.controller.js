export default class ChatPageController{
    constructor($scope) {
        angular.extend(this, {$scope});

        var self = this;

        if(!getUserName()) {
            return;
        }

        this.socket = new WebSocket('ws://127.0.0.1:8282');

        this.socket.onopen = onopen;
        this.socket.onclose = onclose;
        this.socket.onerror = onerror;
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
                        text: message.content
                    }
                    self.chatContent.push(obj);

                    contentContainer.scrollTop = contentContainer.scrollHeight - contentContainer.clientHeight;
                    break;

                case 'message-private':
                    var obj = {
                        name: message.name,
                        date: message.time,
                        text: '悄悄说: ' + message.content
                    }
                    self.chatContent.push(obj);

                    contentContainer.scrollTop = contentContainer.scrollHeight - contentContainer.clientHeight;
                    break;

                case 'user-list':
                    self.userList = message.content;
                    break;
            }
            self.$scope.$apply();
        }

        function getUserName() {
            var name = prompt('请输入您的名字');
            if (name != null && name != '') {
                self.userName = name;
                return true;
            } else {
                return false;
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
}

ChatPageController.$inject = ['$scope'];