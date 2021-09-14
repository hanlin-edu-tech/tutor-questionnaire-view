(() => {
  const localTemplates = async () => {
    const list = [];
    for (var i = 0; i < 1200; i++) {
      list.push({
        "author": "5c2c78a3ff5b3f000173bae5",
        "name": i,
        "enabled": true,
        "tags": ['test1', 'test2'],
        "createDate": 1571973407772,
        "id": "5db2691f1a80720007936b01"
      });
    }
    return new Promise((resolve, reject) => {
      window.setTimeout(()=> resolve(list), 300);
    });
  };

  const localTemplate = async () => {
    const template = {
      "_id" : {
        "timestamp" : 1568195526,
        "counter" : 16072893,
        "date" : 1568195526000,
        "time" : 1568195526000,
        "machineIdentifier" : 9683650,
        "processIdentifier" : 3795,
        "timeSecond" : 1568195526
      },
      "tags": ['test1', 'test2'],
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
      },{
        "qContent" : [
          {
            "answer" : [
              "新格式答案1",
              "新格式答案2"
            ],
            "options" : [
              "新格式",
              "新格式2"
            ],
            "required" : false,
            "topic" : "此題開始為新格式",
            "type" : "單選題"
          },
          {
            "answer" : [
              "新格式下拉選單答案1",
            ],
            "options" : [
              "新格式下拉",
              "新格式下拉2"
            ],
            "required" : false,
            "topic" : "與上同題",
            "type" : "下拉選單"
          }
        ],
        "qid" : "0"
      },
      {
        "qContent" : [
          {
            "answer" : [
              "新格式單選",
            ],
            "options" : [
              "test",
              "test"
            ],
            "required" : true,
            "topic" : "test",
            "type" : "單選題"
          }
        ],
        "qid" : "4"
      },
      {
        "qContent" : [
          {
            "options" : [
              "123",
              "4214"
            ],
            "required" : false,
            "topic" : "test2",
            "type" : "單選題"
          },
          {
            "required" : false,
            "topic" : "與上同題",
            "type" : "問答題"
          }
        ],
        "qid" : "5"
      }],
      "phase" : [
        {
          "lastQuestionId" : "4",
          "phase" : 0
        },
        {
          "lastQuestionId" : "5",
          "phase" : 1
        }
      ],
      "enabled" : true,
      "callBackUrl" : "/finish.html",
      "finishMsg" : "感謝你的回饋",
      "extraInfo" : "e導師課程回饋",
      "createDate" : 1568195526116,
      "id" : "5d78c3c693c2c20ed3f540bd"
    };
    return new Promise((resolve, reject) => {
      window.setTimeout(()=> resolve(template), 300);
    });
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

  const localQuestionnaires = async () => {
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
        "id": "5ffe55a6a0e12300067b2093"
      });
    }
    return new Promise((resolve, reject) => {
      window.setTimeout(()=> resolve(list), 300);
    });   
  };

  const localQuestionnaire = () => {
    const questionnaire = {
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
      },{
        "qContent" : [
          {
            "answer" : [
              "新格式答案1",
              "新格式答案2"
            ],
            "options" : [
              "新格式",
              "新格式2"
            ],
            "required" : false,
            "topic" : "此題開始為新格式",
            "type" : "單選題"
          },
          {
            "answer" : [
              "新格式下拉選單答案1",
            ],
            "options" : [
              "新格式下拉",
              "新格式下拉2"
            ],
            "required" : false,
            "topic" : "與上同題",
            "type" : "下拉選單"
          }
        ],
        "qid" : "0"
      },
      {
        "qContent" : [
          {
            "answer" : [
              "新格式單選",
            ],
            "options" : [
              "test",
              "test"
            ],
            "required" : true,
            "topic" : "test",
            "type" : "單選題"
          }
        ],
        "qid" : "1"
      },
      {
        "qContent" : [
          {
            "options" : [
              "123",
              "4214"
            ],
            "required" : false,
            "topic" : "test2",
            "type" : "單選題"
          },
          {
            "required" : false,
            "topic" : "與上同題",
            "type" : "問答題"
          }
        ],
        "qid" : "2"
      }],
      "user": "5f01a554eb82b9000679db9c",
      "email": "fionlin0223@gmail.com",
      "started": 1610503579105,
      "finished": 1610503590195,
      "extraInfo": "",
      "id": "5ffe55a6a0e12300067b2093"
    };
    return new Promise((resolve, reject) => {
      window.setTimeout(()=> resolve(questionnaire), 300);
    });
  };

  const localQuestionnairesByTemplateId = async () => {
    const list =  [];
    for (var i = 0; i < 475; i++) {
      list.push({ "_id" : { "timestamp" : 1624265091, "counter" : 7378291, "time" : 1624265091000, "date" : 1624265091000, "machineIdentifier" : 11314908, "processIdentifier" : 20405, "timeSecond" : 1624265091 }, "finished" : 1624265160532, "questions" : [ { "qContent" : [ { "answer" : [ `測試${i}` ], "required" : true, "topic" : "學生姓名", "type" : "問答題" } ], "qid" : "0" }, { "qContent" : [ { "answer" : [ "測試" ], "required" : true, "topic" : "聯絡手機", "type" : "問答題" } ], "qid" : "1" }, { "qContent" : [ { "answer" : [ "平日" ], "options" : [ "平日", "假日", "兩者皆可" ], "required" : true, "topic" : "方便聯絡時間", "type" : "下拉選單" }, { "answer" : [ "下午(13~18點)" ], "options" : [ "早上(9~12點)", "中午(12~13點)", "下午(13~18點)", "晚上(18~21點)", "以上皆可" ], "required" : true, "topic" : "與上同題", "type" : "下拉選單" } ], "qid" : "2" }, { "qContent" : [ { "answer" : [ "高中二年級" ], "options" : [ "國小四年級", "國小五年級", "國小六年級", "國中一年級", "國中二年級", "國中三年級", "高中一年級", "高中二年級" ], "required" : true, "topic" : "${year}年度年級", "type" : "下拉選單" } ], "qid" : "3" }, { "qContent" : [ { "answer" : [ "新北市" ], "options" : [ "/tutor-school-info/County?" ], "required" : true, "topic" : "學生就讀學校", "type" : "api 下拉選單" }, { "answer" : [ "中和區" ], "options" : [ "/tutor-school-info/District?" ], "required" : true, "topic" : "與上同題", "type" : "api 下拉選單" }, { "answer" : [ "私立竹林中學" ], "options" : [ "/tutor-school-info/School?" ], "required" : true, "topic" : "與上同題", "type" : "api 下拉選單" } ], "qid" : "4" }, { "qContent" : [ { "answer" : [ "英文" ], "options" : [ "${subject}" ], "required" : true, "topic" : "想試聽的科目", "type" : "api 下拉選單" } ], "qid" : "5" }, { "qContent" : [ { "answer" : [ "學院公告" ], "options" : [ "Facebook", "Instagram", "網路搜尋", "其他網頁", "學院公告", "官網首頁", "電子郵件", "簡訊", "翰林雲端學院Line", "朋友推薦", "其他" ], "required" : true, "topic" : "從何得知訊息", "type" : "下拉選單" } ], "qid" : "6" }, { "qContent" : [ { "answer" : [ "無" ], "required" : true, "topic" : "推薦人姓名", "type" : "問答題" } ], "qid" : "7" } ], "id" : "60d05183aca6dc4fb5709573" });
    }

    list.push({ "_id" : { "timestamp" : 1624265091, "counter" : 7378291, "time" : 1624265091000, "date" : 1624265091000, "machineIdentifier" : 11314908, "processIdentifier" : 20405, "timeSecond" : 1624265091 }, "finished" : 1624265160532, "questions" : [ { "qContent" : [ { "answer" : [ `測試${i}` ], "required" : true, "topic" : "學生姓名", "type" : "問答題" } ], "qid" : "0" }, { "qContent" : [ { "answer" : [ "測試" ], "required" : true, "topic" : "聯絡手機", "type" : "問答題" } ], "qid" : "1" }, { "qContent" : [ { "answer" : [ "平日" ], "options" : [ "平日", "假日", "兩者皆可" ], "required" : true, "topic" : "方便聯絡時間", "type" : "下拉選單" }, { "answer" : [ "下午(13~18點)" ], "options" : [ "早上(9~12點)", "中午(12~13點)", "下午(13~18點)", "晚上(18~21點)", "以上皆可" ], "required" : true, "topic" : "與上同題", "type" : "下拉選單" } ], "qid" : "2" }, { "qContent" : [ { "answer" : [ "國中二年級" ], "options" : [ "國小四年級", "國小五年級", "國小六年級", "國中一年級", "國中二年級", "國中三年級", "高中一年級", "高中二年級" ], "required" : true, "topic" : "${year}年度年級", "type" : "下拉選單" } ], "qid" : "3" }, { "qContent" : [ { "answer" : [ "新北市" ], "options" : [ "/tutor-school-info/County?" ], "required" : true, "topic" : "學生就讀學校", "type" : "api 下拉選單" }, { "answer" : [ "中和區" ], "options" : [ "/tutor-school-info/District?" ], "required" : true, "topic" : "與上同題", "type" : "api 下拉選單" }, { "answer" : [ "私立竹林中學" ], "options" : [ "/tutor-school-info/School?" ], "required" : true, "topic" : "與上同題", "type" : "api 下拉選單" } ], "qid" : "4" }, { "qContent" : [ { "answer" : [ "英文" ], "options" : [ "${subject}" ], "required" : true, "topic" : "想試聽的科目", "type" : "api 下拉選單" } ], "qid" : "5" }, { "qContent" : [ { "answer" : [ "學院公告" ], "options" : [ "Facebook", "Instagram", "網路搜尋", "其他網頁", "學院公告", "官網首頁", "電子郵件", "簡訊", "翰林雲端學院Line", "朋友推薦", "其他" ], "required" : true, "topic" : "從何得知訊息", "type" : "下拉選單" } ], "qid" : "6" }, { "qContent" : [ { "answer" : [ "無" ], "required" : true, "topic" : "推薦人姓名", "type" : "問答題" } ], "qid" : "7" } ], "id" : "60d05183aca6dc4fb5709573" });
    list.push({ "_id" : { "timestamp" : 1624265091, "counter" : 7378291, "time" : 1624265091000, "date" : 1624265091000, "machineIdentifier" : 11314908, "processIdentifier" : 20405, "timeSecond" : 1624265091 }, "finished" : 1624265160532, "questions" : [ { "qContent" : [ { "answer" : [ `測試${i}` ], "required" : true, "topic" : "學生姓名", "type" : "問答題" } ], "qid" : "0" }, { "qContent" : [ { "answer" : [ "測試" ], "required" : true, "topic" : "聯絡手機", "type" : "問答題" } ], "qid" : "1" }, { "qContent" : [ { "answer" : [ "平日" ], "options" : [ "平日", "假日", "兩者皆可" ], "required" : true, "topic" : "方便聯絡時間", "type" : "下拉選單" }, { "answer" : [ "下午(13~18點)" ], "options" : [ "早上(9~12點)", "中午(12~13點)", "下午(13~18點)", "晚上(18~21點)", "以上皆可" ], "required" : true, "topic" : "與上同題", "type" : "下拉選單" } ], "qid" : "2" }, { "qContent" : [ { "answer" : [ "國小二年級" ], "options" : [ "國小四年級", "國小五年級", "國小六年級", "國中一年級", "國中二年級", "國中三年級", "高中一年級", "高中二年級" ], "required" : true, "topic" : "${year}年度年級", "type" : "下拉選單" } ], "qid" : "3" }, { "qContent" : [ { "answer" : [ "新北市" ], "options" : [ "/tutor-school-info/County?" ], "required" : true, "topic" : "學生就讀學校", "type" : "api 下拉選單" }, { "answer" : [ "中和區" ], "options" : [ "/tutor-school-info/District?" ], "required" : true, "topic" : "與上同題", "type" : "api 下拉選單" }, { "answer" : [ "私立竹林中學" ], "options" : [ "/tutor-school-info/School?" ], "required" : true, "topic" : "與上同題", "type" : "api 下拉選單" } ], "qid" : "4" }, { "qContent" : [ { "answer" : [ "英文" ], "options" : [ "${subject}" ], "required" : true, "topic" : "想試聽的科目", "type" : "api 下拉選單" } ], "qid" : "5" }, { "qContent" : [ { "answer" : [ "學院公告" ], "options" : [ "Facebook", "Instagram", "網路搜尋", "其他網頁", "學院公告", "官網首頁", "電子郵件", "簡訊", "翰林雲端學院Line", "朋友推薦", "其他" ], "required" : true, "topic" : "從何得知訊息", "type" : "下拉選單" } ], "qid" : "6" }, { "qContent" : [ { "answer" : [ "無" ], "required" : true, "topic" : "推薦人姓名", "type" : "問答題" } ], "qid" : "7" } ], "id" : "60d05183aca6dc4fb5709573" });
    list.push({ "_id" : { "timestamp" : 1624265091, "counter" : 7378291, "time" : 1624265091000, "date" : 1624265091000, "machineIdentifier" : 11314908, "processIdentifier" : 20405, "timeSecond" : 1624265091 }, "finished" : 1624265160532, "questions" : [ { "qContent" : [ { "answer" : [ `測試${i}` ], "required" : true, "topic" : "學生姓名", "type" : "問答題" } ], "qid" : "0" }, { "qContent" : [ { "answer" : [ "測試" ], "required" : true, "topic" : "聯絡手機", "type" : "問答題" } ], "qid" : "1" }, { "qContent" : [ { "answer" : [ "平日" ], "options" : [ "平日", "假日", "兩者皆可" ], "required" : true, "topic" : "方便聯絡時間", "type" : "下拉選單" }, { "answer" : [ "下午(13~18點)" ], "options" : [ "早上(9~12點)", "中午(12~13點)", "下午(13~18點)", "晚上(18~21點)", "以上皆可" ], "required" : true, "topic" : "與上同題", "type" : "下拉選單" } ], "qid" : "2" }, { "qContent" : [ { "options" : [ "國小四年級", "國小五年級", "國小六年級", "國中一年級", "國中二年級", "國中三年級", "高中一年級", "高中二年級" ], "required" : true, "topic" : "${year}年度年級", "type" : "下拉選單" } ], "qid" : "3" }, { "qContent" : [ { "answer" : [ "新北市" ], "options" : [ "/tutor-school-info/County?" ], "required" : true, "topic" : "學生就讀學校", "type" : "api 下拉選單" }, { "answer" : [ "中和區" ], "options" : [ "/tutor-school-info/District?" ], "required" : true, "topic" : "與上同題", "type" : "api 下拉選單" }, { "answer" : [ "私立竹林中學" ], "options" : [ "/tutor-school-info/School?" ], "required" : true, "topic" : "與上同題", "type" : "api 下拉選單" } ], "qid" : "4" }, { "qContent" : [ { "answer" : [ "英文" ], "options" : [ "${subject}" ], "required" : true, "topic" : "想試聽的科目", "type" : "api 下拉選單" } ], "qid" : "5" }, { "qContent" : [ { "answer" : [ "學院公告" ], "options" : [ "Facebook", "Instagram", "網路搜尋", "其他網頁", "學院公告", "官網首頁", "電子郵件", "簡訊", "翰林雲端學院Line", "朋友推薦", "其他" ], "required" : true, "topic" : "從何得知訊息", "type" : "下拉選單" } ], "qid" : "6" }, { "qContent" : [ { "answer" : [ "無" ], "required" : true, "topic" : "推薦人姓名", "type" : "問答題" } ], "qid" : "7" } ], "id" : "60d05183aca6dc4fb5709573" });

    return new Promise((resolve, reject) => {
      window.setTimeout(()=> resolve(list), 300);
    });   
  };

  const wwwQuestionnaires = async () => {
    const res = await fetch(`https://${host}/questionnaire/questionnaires`)
    .catch(err => {
      console.error(err);
      alert('發生錯誤，請聯繫客服');
    });
    return await res.json();    
  };

  const wwwQuestionnaire = async (id) => {
    const res = await fetch(`https://${host}/questionnaire/questionnaires/${id}`)
    .catch(err => {
      console.error(err);
      alert('發生錯誤，請聯繫客服');
    });
    return await res.json();    
  };

  const wwwQuestionnairesByTemplateId = async (id, count, date) => {
    const res = await fetch(`https://${host}/questionnaire/questionnaires/templateId/${id}/${count}`, {
      method: 'post',
      body: JSON.stringify(date),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
  })
    .catch(err => {
      console.error(err);
      alert('發生錯誤，請聯繫客服');
    });
    return await res.json();    
  };

  const localSubmit = async (template) => {
    window.setTimeout(()=>{ return true; },300);
  };

  const submit = async (template) => {
    template.enabled = true;
    const res = await fetch(`https://${host}/questionnaire/templates/create/v2`,
					{			
					method:'post',
					headers: {
						'Content-Type':'application/json; charset=utf-8'
					},
					body: JSON.stringify(template)			
					}).catch(err => {
            console.error(err);
            return false;
          });
    if(res.status === 403){
      alert('請先登入');
      window.location.href="./index.html";
    } 
    if(res.ok){
      document.querySelector('.modal-success').classList.remove('hide');
      window.setTimeout(()=>{window.location.href='./list.html?type=template';},500);
    }
  };

  const login = async (id_token) => {
    const res = await fetch(`https://${host}/questionnaire/tokensignin?idtoken=${id_token}`,{
      method: 'POST'
    }).catch(err => {
      console.error(err);
      alert('登入失敗，請稍後再試');
    });
    if(res.ok){
      window.location.href="./list.html?type=template";
    }else{
      alert('登入失敗，請稍後再試');
    }
  };

  const logout = async () => {
    const res = await fetch(`https://${host}/questionnaire/logout`,{
      method: 'GET'
    }).catch(err => {
      console.error(err);
      alert('發生錯誤，請稍後再試');
    });
    if(res.ok){
      window.location.href="./index.html";
    }else{
      alert('發生錯誤，請稍後再試');
    }
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
    getQuestionnairesByTemplateId: ((id, count, date) => {
      return (window.location.protocol.toLowerCase() === 'file:' || window.location.hostname === 'localhost') ? localQuestionnairesByTemplateId() : wwwQuestionnairesByTemplateId(id, count, date);
    }),
    submitTemplate: ((template) => {
      return (window.location.protocol.toLowerCase() === 'file:' || window.location.hostname === 'localhost') ? localSubmit(template) : submit(template);
    }),
    login: ((id_token) => { return login(id_token); }),
    logout: (() => { logout(); })
  };
})();