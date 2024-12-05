const serverless = require('serverless-http');
const express = require('express');
const registerRoutes = require('./api/register'); // register API 가져오기
const bongjiniRoutes = require('./api/bongjini'); // bongjini API 가져오기

const app = express();
app.use(express.json()); // JSON 요청을 처리

// API 경로 설정
app.use('/register', registerRoutes); // /register API 연결
app.use('/bongjini', bongjiniRoutes); // /bongjini API 연결

// Lambda 핸들러로 앱 변환
module.exports.handler = serverless(app);

