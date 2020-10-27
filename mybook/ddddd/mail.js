var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "qq",
  auth: {
    user: "1390230276@qq.com", //这里填自己的 qq号
    pass: "lswnpzjxgzjkhjjg" //授权码,通过QQ邮箱获取
  }
});
var mailOptions = {
  from: "1234567@qq.com", // 发送者 asdfghj
  to: ["2844677852@qq.com"], // 接受者,可以同时发送多个,以逗号隔开
  subject: "nodemailer3.1.8邮件发送", // 标题
  text: "这是我发的一封邮件，如果你开心，我也开心_", // 文本
  html:
    '<h2>nodemailer基本使用:</h2><h3> <a href="http://www.jianshu.com/u/27f54f428a14"> http://www.jianshu.com/u/27f54f428a14</a></h3>',
  attachments: [
    {
      filename: "package.json",
      path: "./package.json"
    },
    {
      filename: "content",
      content: "发送内容"
    },
    {
      filename: "index.html",
      path: "./index.html"
    }
  ]
};
transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("发送成功");
  res.send("发送成功");
});
