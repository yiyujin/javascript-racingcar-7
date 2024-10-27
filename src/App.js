import { Random, Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      let input = await Console.readLineAsync("경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분)\n");
      const input2 = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");

      input = input.split(",");

      this.handleErrors(input);
      const data = this.printHistory(input, input2);
      this.printWinner(data);

    } catch (error) {
      if (!error.message.startsWith("[ERROR]")) {
        error.message = `[ERROR] ${error.message}`;
      }
      throw error;
    }
  }
  
  handleErrors(input){
    const pattern = /^[a-zA-Z]+(,[a-zA-Z]+)*$/;

    if(!input){
      throw new Error("[ERROR] 입력값 에러 : 아무 입력을 하지 않았습니다.");
    }

    if(!pattern.test(input)){
      throw new Error("[ERROR] 구분자 에러 : 구분자는 쉼표(,)여야 합니다.");
    }

    for(let i = 0; i < input.length; i++){
      if(input[i].length > 5){
        throw new Error("[ERROR] 글자수 에러 : 이름은 5자 이하여야 합니다.");
      }
    }
  }  

  printHistory(input, input2){
    let data = [];

    for(let i = 0; i < input.length; i++){
      data.push({
        name : input[i],
        scores : "",
      })
    }

      Console.print("\n실행 결과");

      for(let i = 0; i < input2; i++){

        for(let j = 0; j < data.length; j++){
          let randomNumber = Random.pickNumberInRange(0,9);

          if(randomNumber >= 4){
            data[j].scores += "-";
          } else {
            data[j].scores += "";
          }

          Console.print(`${data[j].name} : ${data[j].scores}`)
        }

        Console.print('\n');
      }

      return data;
  }

  printWinner(data){
    let finalScores = [];

    for(let i = 0; i < data.length; i++){
      finalScores.push(data[i].scores.length);
    }

    let maxScore = Math.max(...finalScores);

    let finalists = [];

    for(let i = 0; i < data.length; i++){
      if(finalScores[i] == maxScore){
        finalists.push(data[i].name);
      }
    }

    Console.print(`최종 우승자 : ${finalists.join(", ")}`);
  }

}

export default App;
