//5명씩 [https://school.programmers.co.kr/learn/courses/30/lessons/181886?language=javascript]
function solution(names) {
  var answer = [];

  //반복문으로 5번째만 남기기
  names.forEach((name, idx) => {
    if (idx % 5 === 0) {
      answer.push(name); // 조건에 맞는 이름을 결과에 추가
    }
  });

  return answer;
}
