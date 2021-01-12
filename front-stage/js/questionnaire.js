(() => {
  const localQuestionnaire = () => {
    return {
      _id: {
        $oid: "5ff3c5fd7246530007ebe4da"
      },
      template: "5e5dd54f9137c300076372ae",
      name: "老師教學回饋",
      description:
        "聽完老師的互動指導課程後，說說你的感想吧！ 老師會透過你的回饋調整更適合你的課程內容與指導方式唷！",
      questions: [
        {
          answer: ["還不錯"],
          options: ["非常棒", "還不錯", "還好", "不喜歡"],
          required: true,
          topic: "上完這堂互動指導課程感覺如何？",
          type: "單選題"
        },
        {
          answer: ["平易近人"],
          options: ["生動有趣", "平易近人", "略嫌單調", "枯燥乏味"],
          required: true,
          topic: "老師的指導風格讓你覺得？",
          type: "單選題"
        },
        {
          answer: ["大多能夠吸收理解"],
          options: [
            "講解清晰、容易理解",
            "大多能夠吸收理解",
            "僅少部分聽得懂",
            "完全無法吸收"
          ],
          required: true,
          topic: "對於老師的課程指導與問題講解，你覺得？",
          type: "單選題"
        },
        {
          answer: ["有不少提升", "非常有幫助"],
          options: [
            "非常有幫助",
            "有不少提升",
            "稍微改善了學習狀況",
            "沒有太多效果"
          ],
          required: true,
          topic: "整體而言對你課業學習上是否有幫助呢？",
          type: "多選題"
        },
        {
          answer: ["123"],
          required: true,
          topic: "除了上述的問題外，還有什麼話想跟老師說呢？",
          type: "問答題"
        }
      ],
      user: "5b72414f11bc44000806503d",
      email: "wumi@ehanlin.com.tw",
      started: {
        $date: 1609811446289
      },
      finished: {
        $date: 1609811453649
      },
      extraInfo: ""
    };
  };

  const localTemplate = () => {
    return {
      _id: { $oid: "5dc28d2591416c00083d0250" },
      author: "5b72414f11bc44000806503d",
      name: "課後說一說",
      description:
        "課堂結束別急著下課喔！跟老師說說你這堂課的學習狀況，讓老師可以根據你的需求安排更加適合你的課程唷！",
      questions: [
        {
          options: ["剛剛好", "太簡單", "太困難"],
          required: true,
          topic: "這堂課內容難度如何？",
          type: "單選題"
        },
        {
          options: ["很棒", "感覺普通", "不太喜歡"],
          required: true,
          topic: "上完課的感覺如何？",
          type: "多選題"
        },
        {
          required: true,
          topic:
            "簡短的告訴老師，今天課堂上有遇到什麼問題呢？未來希望課堂如何調整呢？",
          type: "問答題"
        }
      ],
      enabled: true,
      callBackUrl: "",
      finishMsg: "感謝您的回饋！",
      extraInfo: "",
      createDate: { $date: 1573031205335 }
    };
  };

  async function wwwQuestionnaire(questionnaireId) {
    const res = await fetch(
      `https://${host}/questionnaire/questionnaires/${questionnaireId}`
    ).catch(err => {
      console.error(err);
      alert("發生錯誤，請稍後再試");
    });
    if (res.ok) {
      return await res.json();
    } else {
      alert("發生錯誤，請稍後再試");
    }
  }

  async function wwwTemplate(templateId) {
    const res = await fetch(
      `https://${host}/questionnaire/templates/${templateId}`
    ).catch(err => {
      console.error(err);
      alert("發生錯誤，請稍後再試");
    });
    if (res.ok) {
      return await res.json();
    } else {
      alert("發生錯誤，請稍後再試");
    }
  }

  function localSubmit(){
    return true;
  }

  async function submitQuestionnaire(templateId, questionnaire){
    const res = await fetch(`https://${host}/questionnaire/questionnaire/create?templateId=${templateId}`,{
      method: 'POST',
      body: JSON.stringify(questionnaire),
      headers: {
        "content-type": "application/json"
      },
    }).catch(err => {
      console.error(err);
      alert('發生錯誤，請聯繫客服人員');
    });
    return res.ok;
  }

  if (window.eHanlin === undefined || window.eHanlin === null) {
    window.eHanlin = {};
  }

  if (window.eHanlin.dataprovider === undefined || window.eHanlin.dataprovider === null) {
    window.eHanlin.dataprovider = {};
  }

  const host = window.location.hostname;
  window.eHanlin.dataprovider.questionnaire = {
    getTemplate: ((id) => {
      return host === 'localhost' ? localTemplate() : wwwTemplate(id);
    }),
    getQuestionnaire: ((id) => {
      return host === 'localhost' ? localQuestionnaire() : wwwQuestionnaire(id);
    }),
    submit: ((templateId, submitData) => { 
      return host === 'localhost' ? localSubmit() : submitQuestionnaire(templateId, submitData); 
    })
  };
})();