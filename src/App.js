import { Random, Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      let input = await Console.readLineAsync("경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분)\n");

      input = input.split(",");

      this.handleErrors(input);

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

}

export default App;
