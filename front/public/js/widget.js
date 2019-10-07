(function(){


    var user = [[${session.user}]];
    var tokens = [[${tokens}]];
    
    
    console.log(user, tokens);
    
    
    var courseKey = "course";
    var courseId = null;
    
    
    var closeWaitingTime = 3000;
    var nextWaitingTime = 0;
    var wrongLocationAlertTime = 5000;
    var enterNumLimit = 3;
    
    
    var iconClassMap = {
        "NU_EHANLIN-QUIZ" : "flaticon-widget-masterlist_classquiz",
        "NU_EHANLIN-UNIT" : "flaticon-widget-masterlist_experiment",
        "NU_EHANLIN-FIXED" : "flaticon-widget-masterlist_experiment",
        "NU_EHANLIN-VIDEO" : "flaticon-widget-masterlist_video",
        "NU_EHANLIN-UNIT_EXAM" : "flaticon-widget-masterlist_experiment",
        "NU_EHANLIN-CUSTOM_EXAM" : "flaticon-widget-masterlist_experiment",
        "COACH_QUIZ" : "flaticon-widget-masterlist_experiment",
        "COACH-IFRAME" : "flaticon-widget-masterlist_classquiz"
    };
    
    
    var buildWrongLocationTest = function(urlRegex, isWrong) {
        var testUrl = function() {
            var url = window.location.pathname+window.location.search+window.location.hash;
            return urlRegex.test(url);
        };
    
    
        var checkIsWrong = function(userCourseItem) {
            if(testUrl()){
                return isWrong(userCourseItem);
            }
            return false;
        };
    
    
        return {
            testUrl : testUrl,
            isWrong : checkIsWrong
        };
    }
    
    
    var wrongLocationRegexs = [
        buildWrongLocationTest(RegExp("/nu_ehanlin/course\.html"), function(userCourseItem){
            var textbook = window.location.hash.replace("#","");
            if(textbook == ""){
                var searchRegex = new RegExp(".*\&hash\=(.*)");
                if(searchRegex.test(window.location.search)){
                    textbook = searchRegex.exec(window.location.search)[1];
                }
            }
            return userCourseItem.info.textbook != textbook
        })
    ];
    
    
    if(courseId = sessionStorage.getItem(courseKey)){
        firebaseAuth();
    }
    
    
    function buildCourseItem(itemData){
    
    
        var dom = document.createElement('a');
        dom.href = '/coach-web/enterCourse.html?id='+courseId;
        dom.className = "course";
        dom.innerHTML = '<div class="icon"><i></i></div><div class="title"></div><div class="seen"><div class="flaticon-widget-done"></div><svg class="svg" id="tick" version="1.1" viewBox="6 5 26 26"><polyline class="path" points="11.6,20 15.9,24.2 26.4,13.8"></polyline></svg></div>'
    
    
        var iconDom = dom.getElementsByTagName('i')[0];
        var titleDom = dom.getElementsByClassName('title')[0];
        var seenDom = dom.getElementsByClassName('seen')[0];
    
    
        function update(data){
            iconDom.className = iconClassMap[data.type];
            titleDom.childNodes.forEach(function(node){titleDom.removeChild(node);});
            titleDom.appendChild(document.createTextNode(data.name));
    
    
            if(data.status){
                if(!data.status.finished){
                    if(!data.status.started){
                        dom.className = "course disabled";
                        dom.style.cssText = 'pointer-events: none;';
                    }else{
                        dom.className = "course active";
                        dom.style.cssText = 'pointer-events: auto;';
                        if(data.errorInfo.enterNum > enterNumLimit){
                            if(confirm("課程內容發生異常?\n\n系統偵測到你多次重新開始這個課程內容，\n是否要跳過這個課程內容?")){
                                goto('/coach-web/skipCourseItem.html?id='+data._id)();
                            }
                        }
                    }
                    seenDom.style.cssText = 'display:none;';
                }else{
                    dom.className = "course";
                    dom.style.cssText = 'pointer-events: none;';
                    seenDom.style.cssText = '';
                }
            }
        }
    
    
        return {
            dom: dom,
            update: update,
            id: itemData._id
        };
    }
    
    
    var updateList = (function(){
        var itemMap = {};
        var itemList = [];
    
    
        return function(dom, data){
            for(var i=0 ; i<data.length ; i++){
                var itemData = data[i];
                if(!itemMap[itemData._id]){
                    itemMap[itemData._id] = buildCourseItem(itemData);
                }
    
    
                var item = itemMap[itemData._id];
                item.update(itemData);
    
    
                var oldItem = itemList[i];
                if(oldItem != item){
                    if(oldItem){
                        if(oldItem.dom.parentNode){
                            dom.removeChild(oldItem.dom);
                        }
                        dom.replaceChild(item.dom, oldItem.dom);
                        itemList.splice(i, 1, item);
                        delete itemMap[oldItem.id];
                    }else{
                        dom.appendChild(item.dom);
                        itemList.push(item)
                    }
                }
            }
            for(var i=itemList.length-1 ; i>=data.length ; i--){
                var oldItem = itemList[i];
                itemList.splice(i, 1);
                if(itemList.indexOf(oldItem) < 0){
                    dom.removeChild(oldItem.dom);
                    delete itemMap[oldItem.id];
                }
            }
        };
    })();
    
    
    function userCourseItemStatus(items) {
        var status = {
            allFinished : true,
            firstNoStarted : null,
            firstNoFinished : null}
        for(var i=0 ; i<items.length ; i++){
            var item = items[i];
            if(!item.status){
                status.allFinished = false;
                if(!status.firstNoStarted){
                    status.firstNoStarted = item;
                }
                if(!status.firstNoFinished){
                    status.firstNoFinished = item;
                }
            }else{
                if(!item.status.finished){
                    status.allFinished = false;
                    if(!status.firstNoFinished){
                        status.firstNoFinished = item;
                    }
                }
                if(!item.status.started){
                    if(!status.firstNoStarted){
                        status.firstNoStarted = item;
                    }
                }
            }
        }
        return status;
    }
    
    
    function goto(url) {
        return function(){
            window.location.replace(url)
        }
    }
    
    
    var updateData = (function(){
        var dom, listDom, nextBtnDom, closeBtnDom, ecoachIconDom;
        var isFirst = true;
    
    
        var openWidgetClass = ""
        var openWidgetIconClass = ""
        var wrongClass = "";
        var iconWrongClass = "";
        var currentUserCourseItem = null;
    
    
        function updateWidgetClass(){
            dom.className = ["ecoach", openWidgetClass, wrongClass].join(' ');
            ecoachIconDom.className = ["ecoach-icon", openWidgetIconClass, iconWrongClass].join(' ');
        }
    
    
        function closeWidget(){
            openWidgetClass = "hide-coach";
            openWidgetIconClass = "show-icon";
            updateWidgetClass();
        }
    
    
        function openWidget(){
            openWidgetClass = "";
            openWidgetIconClass = "";
            updateWidgetClass();
        }
    
    
        function modalWrongMessage(){
            var modal = document.createElement('div');
            modal.className = "modalWrongMessage"
            modal.style.cssText = 'position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;background-color: rgba(0, 0, 0, 0.8);z-index: 2147483645;display: flex;align-items: center;justify-content: center;';
            modal.innerHTML = '<div style="color: white;font-size: 32px;">系統自動引導學習途徑中<br/>請稍後!</div>';
            //modal.innerHTML = '<svg class="modalWrongMessage-text-line" height="100" width="500" stroke="#FF8A34" stroke-width="1"><text style="font-family: 微軟正黑體,Helvetica,times,serif; font-weight: bold; font-style: normal" x="0" y="90" fill="#fff" font-size="30">系統自動引導學習途徑中，請稍候！</text></svg>';
            document.body.appendChild(modal);
        }
    
    
        function checkWrong(){
            wrongClass = "";
            iconWrongClass = "";
            if(currentUserCourseItem != null){
                for(var i=0 ; i<wrongLocationRegexs.length ; i++){
                    var wrongLocationRegex = wrongLocationRegexs[i];
                    if(wrongLocationRegex.testUrl()){
                        if(wrongLocationRegex.isWrong(currentUserCourseItem)){
                            wrongClass = "widget-error";
                            iconWrongClass = "eicon-error";
                            modalWrongMessage();
                            setTimeout(function(){
                                if(wrongClass != ""){
                                    window.location.replace('/coach-web/enterCourse.html?id='+courseId);
                                }
                            }, wrongLocationAlertTime);
                            break;
                        }
                    }
                }
            }
            updateWidgetClass();
        }
    
    
        return function(snapshot){
            var data = snapshot.data();
    
    
            if(!dom){
                dom = document.createElement('div');
                dom.className = "ecoach";
                dom.innerHTML = '<div class="row-header"><div class="subject"></div><div class="unit"></div><div class="close-ecoach flaticon-widget-close"></div></div><div class="row-content"><div class="list"></div><div class="row-next"><a class="next-btn"></a></div></div>';
    
    
                listDom = dom.getElementsByClassName("list")[0];
                nextBtnDom = dom.getElementsByClassName("next-btn")[0];
                closeBtnDom = dom.getElementsByClassName("close-ecoach")[0];
    
    
                dom.getElementsByClassName("subject")[0].appendChild(document.createTextNode(data.userPlan.name));
                dom.getElementsByClassName("unit")[0].appendChild(document.createTextNode(data.userCourse.name));
    
    
                document.body.appendChild(dom);
    
    
                ecoachIconDom = document.createElement('div');
                ecoachIconDom.className = "ecoach-icon";
                ecoachIconDom.innerHTML = '<img src="/coach-web/img/eicon.png">';
    
    
                document.body.appendChild(ecoachIconDom);
    
    
                closeBtnDom.addEventListener('click', closeWidget);
                ecoachIconDom.addEventListener('click', openWidget);
    
    
                window.addEventListener("hashchange", checkWrong);
            }
    
    
            openWidget();
            updateList(listDom, data.userCourseItem);
    
    
            var status = userCourseItemStatus(data.userCourseItem);
            if(status.allFinished){
                nextBtnDom.childNodes.forEach(function(node){nextBtnDom.removeChild(node);});
                nextBtnDom.appendChild(document.createTextNode("完成"));
                nextBtnDom.setAttribute('href', '/app/coach/index.html');
                sessionStorage.removeItem("course");
                setTimeout(goto('/app/coach/index.html'), nextWaitingTime);
            }else if(status.firstNoStarted === status.firstNoFinished){
                nextBtnDom.childNodes.forEach(function(node){nextBtnDom.removeChild(node);});
                nextBtnDom.appendChild(document.createTextNode("下一步"));
                nextBtnDom.setAttribute('href', '/coach-web/enterCourse.html?id='+courseId);
                setTimeout(goto('/coach-web/enterCourse.html?id='+courseId), nextWaitingTime);
            }else{
                nextBtnDom.childNodes.forEach(function(node){nextBtnDom.removeChild(node);});
                nextBtnDom.appendChild(document.createTextNode("進行中"));
                nextBtnDom.setAttribute('href', '/coach-web/enterCourse.html?id='+courseId);
                //setTimeout(closeWidget, closeWaitingTime);
                currentUserCourseItem = status.firstNoFinished;
                checkWrong();
            }
    
    
            isFirst = false;
    
    
            return dom;
        }
    })();
    
    
    function init(){
        firebase.firestore().collection("UserCourse").doc(courseId).onSnapshot(updateData);
    }
    
    
    function firebaseAuthError(error){
        console.log(error);
        alert('驗證錯誤');
    }
    
    
    function firebaseAuth(){
        var firebaseConfig = [(${webFirebaseConfig})];
    
    
        firebase.initializeApp(firebaseConfig);
    
    
        firebase.auth().signInWithCustomToken(tokens)
            .catch(firebaseAuthError)
            .then(init);
    }
    
    
    
    
    })();