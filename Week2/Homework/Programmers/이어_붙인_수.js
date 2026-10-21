//이어 붙인 수 [https://school.programmers.co.kr/learn/courses/30/lessons/181928]
function solution(num_list) {
  var answer = 0;
  var evenArr,
    oddArr,
    evenStr = "",
    oddStr = "";

  //1. filter 로 짝수/홀수만 남기기
  evenArr = num_list.filter((n) => n % 2 == 0);
  oddArr = num_list.filter((n) => n % 2 != 0);

  //2. forEach로 각각 문자열을 이어붙이기
  evenArr.forEach((n) => (evenStr += n));
  oddArr.forEach((n) => (oddStr += n));

  //3. 이어 붙인 문자열을 숫자로 변환해서 더하기
  answer = Number(evenStr) + Number(oddStr);
  return answer;
}
