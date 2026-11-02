//길이에 따른 연산 [https://school.programmers.co.kr/learn/courses/30/lessons/181879]
function solution(num_list) {
  var answer = 0;

  //if로 조건을 나누고, forEach를 사용하여 연산한다
  if (num_list.length >= 11) {
    num_list.forEach((n) => (answer += n));
  } else {
    answer = 1; //처음에 answer = 1을 선언하지 않았다가 0에 값을 곱하는 형태가 되어서 연산이 잘 수행되지 않았다!
    num_list.forEach((n) => (answer *= n));
  }
  return answer;
}
