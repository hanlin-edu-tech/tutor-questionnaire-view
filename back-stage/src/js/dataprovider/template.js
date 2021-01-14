(() => {
  const localTemplates = () => {
    const list = [];

    for (var i = 0; i < 1200; i++) {
      list.push({
        "author": "5c2c78a3ff5b3f000173bae5",
        "name": i,
        "enabled": true,
        "createDate": 1571973407772,
        "id": "5db2691f1a80720007936b01"
      });
    }

    return list;

  };

  const localTemplate = () => {
    return {
      "_id" : {
        "timestamp" : 1568195526,
        "counter" : 16072893,
        "date" : 1568195526000,
        "time" : 1568195526000,
        "machineIdentifier" : 9683650,
        "processIdentifier" : 3795,
        "timeSecond" : 1568195526
      },
      "author" : "Test User",
      "name" : "課程",
      "description" : "上課回饋",
      "questions" : [ {
        "options" : [ "難", "中偏難", "中", "中偏易", "易" ],
        "required" : false,
        "topic" : "本次課程難度",
        "type" : "單選題"
      }, {
        "options" : [ "文言文", "散文賞析", "作文", "字型辨義", "現代詩賞析" ],
        "required" : false,
        "topic" : "課程的什麼部分特別感到困難？",
        "type" : "多選題"
      }, {
        "required" : false,
        "topic" : "有什麼話想告訴老師嗎？",
        "type" : "問答題"
      } ],
      "enabled" : true,
      "callBackUrl" : "/finish.html",
      "finishMsg" : "感謝你的回饋",
      "extraInfo" : "e導師課程回饋",
      "createDate" : 1568195526116,
      "id" : "5d78c3c693c2c20ed3f540bd"
    };
  };

  const wwwTemplates = async () => {
    const res = await fetch(`https://${host}/questionnaire/templates`)
    .catch(err => {
      console.error(err);
      alert('發生錯誤，請聯繫客服');
    });
    return await res.json();    
  };

  const wwwTemplate = async (id) => {
    const res = await fetch(`https://${host}/questionnaire/templates/${id}`)
    .catch(err => {
      console.error(err);
      alert('發生錯誤，請聯繫客服');
    });
    return await res.json();    
  };

  const localQuestionnaires = () => {
    const list = [];
    for (var i = 0; i < 1200; i++) {
      list.push({
        "_id": {
          "timestamp": 1610464993,
          "machineIdentifier": 10543397,
          "processIdentifier": 6,
          "counter": 8069267,
          "time": 1610503590000,
          "date": 1610503590000,
          "timeSecond": 1610503590
        },      
        "template": "5dc28d2591416c00083d0250",
        "name": i,
        "description": "課堂結束別急著下課喔！跟老師說說你這堂課的學習狀況，讓老師可以根據你的需求安排更加適合你的課程唷！",
        "questions": [{
          "answer": ["剛剛好"],
          "options": ["剛剛好", "太簡單", "太困難"],
          "required": true,
          "topic": "這堂課內容難度如何？",
          "type": "單選題"
        }, {
          "answer": ["感覺普通"],
          "options": ["很棒", "感覺普通", "不太喜歡"],
          "required": true,
          "topic": "上完課的感覺如何？",
          "type": "單選題"
        }, {
          "answer": ["ok"],
          "required": true,
          "topic": "簡短的告訴老師，今天課堂上有遇到什麼問題呢？未來希望課堂如何調整呢？",
          "type": "問答題"
        }],
        "user": "5f01a554eb82b9000679db9c",
        "email": "fionlin0223@gmail.com",
        "started": 1610503579105,
        "finished": 1610503590195,
        "extraInfo": "",
        "id": "5ffe55a6a0e12500067b2093"
      });
    }

    return list;
  };

  const localQuestionnaire = () => {
    return {
      "_id": {
        "timestamp": 1610464993,
        "machineIdentifier": 10543397,
        "processIdentifier": 6,
        "counter": 8069267,
        "time": 1610503590000,
        "date": 1610503590000,
        "timeSecond": 1610503590
      },
      "templateId": "5dc28d2591416c00083d0250",
      "template":{
        "name": "test",
        "description": "課堂結束別急著下課喔！跟老師說說你這堂課的學習狀況，讓老師可以根據你的需求安排更加適合你的課程唷！",
      },
      "questions": [{
        "answer": ["剛剛好"],
        "options": ["剛剛好", "太簡單", "太困難"],
        "required": true,
        "topic": "這堂課內容難度如何？",
        "type": "單選題"
      }, {
        "answer": ["感覺普通"],
        "options": ["很棒", "感覺普通", "不太喜歡"],
        "required": true,
        "topic": "上完課的感覺如何？",
        "type": "單選題"
      }, {
        "answer": ["ok"],
        "required": true,
        "topic": "簡短的告訴老師，今天課堂上有遇到什麼問題呢？未來希望課堂如何調整呢？",
        "type": "問答題"
      }],
      "user": "5f01a554eb82b9000679db9c",
      "email": "fionlin0223@gmail.com",
      "started": 1610503579105,
      "finished": 1610503590195,
      "extraInfo": "",
      "id": "5ffe55a6a0e12500067b2093"
    };
  };

  const wwwQuestionnaires = async () => {
    const res = await fetch(`https://${host}/questionnaire/questionnaires`)
    .catch(err => {
      console.error(err);
      alert('發生錯誤，請聯繫客服');
    });
    return await res.json();    
  };

  const localSubmit = () => {

  };

  const submit = async (template) => {
    template.enabled = true;
    const res = await fetch(`https://${host}/questionnaire/templates/create`,
					{			
					method:'post',
					headers: {
						'Content-Type':'application/json; charset=utf-8'
					},
					body: JSON.stringify(template)			
					}).catch(err => {
            console.error(err);
          });
    if(res.ok){
      window.setTimeout(()=>{window.location.href="./templateList.html";},500);
    }
    if(res.type === 'cors' && res.status === 403){
      alert('請先登入');
      window.location.href="./index.html";
  }
  };

  const wwwQuestionnaire = async (id) => {
    const res = await fetch(`https://${host}/questionnaire/questionnaires/${id}`)
    .catch(err => {
      console.error(err);
      alert('發生錯誤，請聯繫客服');
    });
    return await res.json();    
  };

  if (window.eHanlin === undefined || window.eHanlin === null) {
    window.eHanlin = {};
  }

  if (window.eHanlin.dataprovider === undefined || window.eHanlin.dataprovider === null) {
    window.eHanlin.dataprovider = {};
  }

  const host = window.location.hostname;
  window.eHanlin.dataprovider.questionnaire = {
    getTemplates: (() => {
      return (window.location.protocol.toLowerCase() === 'file:' || window.location.hostname === 'localhost') ? localTemplates() : wwwTemplates();
    }),
    getTemplate: ((id) => {
      return (window.location.protocol.toLowerCase() === 'file:' || window.location.hostname === 'localhost') ? localTemplate() : wwwTemplate(id);
    }),
    getQuestionnaires: (() => {
      return (window.location.protocol.toLowerCase() === 'file:' || window.location.hostname === 'localhost') ? localQuestionnaires() : wwwQuestionnaires();
    }),
    getQuestionnaire: ((id) => {
      return (window.location.protocol.toLowerCase() === 'file:' || window.location.hostname === 'localhost') ? localQuestionnaire() : wwwQuestionnaire(id);
    }),
    submitTemplate: ((template) => {
      return (window.location.protocol.toLowerCase() === 'file:' || window.location.hostname === 'localhost') ? localSubmit() : submit(template);
    })
  };
})();