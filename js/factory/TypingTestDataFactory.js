angular.module("typing").factory("TypingTestDataFactory",function(testData){

var factory = {};

factory.getTypingTestData = function(){

var intToTestCnt =4,
randNum;
 randNum = Math.floor((Math.random() * 10)) % intToTestCnt;
              strToTestType = testData[randNum];
 return strToTestType;
}
return factory;
});