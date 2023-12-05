import { db } from "../db.js";
import { logger } from "../utils/logger.js";

class UserService {
  async getUser(email: string, number: string | undefined) {
    /*
     * Пробовал реализовать отмену запроса через clearTimeout
     * обернув в функцию. Но clearTimeout отрабатывает только после того
     * как предыдущий запрос вернет ответ
     */

    let timeout: NodeJS.Timeout;

    const wrapper = async () => {
      clearTimeout(timeout);

      return await new Promise(resolve => {
        logger.info("Finding user in db...");

        timeout = setTimeout(() => {
          const user = db.filter(i =>
            email && !!number
              ? // Если передается email и телефон, то ищем соответствие по двум полям
                i.email === email && i.number === number
              : // В ином случае ищем только по email, т.к. он обязателен
                i.email === email,
          );

          resolve(user);
        }, 5000);
      });
    };
    const result = wrapper();

    return await result;
  }
}

export default new UserService();
